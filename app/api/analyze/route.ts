import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { tryConsume, writeQuota } from "@/lib/quota";

export const runtime = "nodejs";
export const maxDuration = 60;

type Mode = "auto" | "menu" | "sign" | "product";
type ChatTurn = { role: "user" | "assistant"; content: string };
type UILang = "ko" | "en" | "ja" | "zh";

const MODEL = "gpt-4o"; // 앱 전체 고정

const REPLY_LANG: Record<UILang, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文（简体）",
};

const SYSTEM_PROMPT = `You are a real-time interpreter and travel-explainer for an international traveler.
The user's photo is most likely one of: a sign, restaurant menu, product package, traffic/info notice — captured abroad.
The text in the photo could be in any foreign language (Japanese, Chinese, English, Thai, Vietnamese, Spanish, French, etc.).

You MUST reply in **{REPLY_LANG}** (the user's UI language). Do not assume the user is Korean. Do not insert Korean phonetic guides unless the user's UI language is Korean.

[ FIRST REPLY (when receiving a photo) ]
1) Open with a one-line classification (e.g. "🍜 Ramen shop menu (Japan)", "🇹🇭 Thai restaurant sign").
   Identify the country and source language briefly.
2) Quote the original foreign text, give a pronunciation aid appropriate for the user's UI language ({REPLY_LANG}), then translate.
3) Practical info travelers need:

   ⭐ MENU (critical rule):
   - **List EVERY menu item visible in the photo as a markdown table. Never summarize, never omit.**
   - Format:
     | Original | {REPLY_LANG} meaning | Price |
     |---|---|---|
   - If price not visible: "-". If text is blurry: "unreadable" (in {REPLY_LANG}).
   - Split sections (mains / sides / drinks) into sub-headings with their own tables.
   - After tables, add brief notes: spice level, allergens, 1-2 recommendations.

   - SIGN: what kind of place/facility, business hours, closed days
   - PRODUCT: what it is, taste/ingredients/allergens, cooking or usage instructions
   - NOTICE: what is forbidden/instructed, common mistakes for tourists

4) Be honest about unreadable text — say so explicitly.
5) Non-menu replies: 6-12 lines. Menu replies: no length limit.
6) Last line: a short useful local-language phrase the user can speak, prefixed with 💬. Show pronunciation if helpful. Then translate to {REPLY_LANG}. (Example for KO user: 💬 これをください (kore wo kudasai) — 이거 주세요)

[ FOLLOW-UP messages ]
- Stay short (2-6 lines), specific.
- If something can't be seen in the photo, say so plainly and supplement with general knowledge.
- Add a 💬 phrase if the user is going to act on the info.

Quality bar: if the photo is too blurry to read at all, reply ONLY with the literal token "BLURRY_RETAKE" (no punctuation, no other text). The client will offer a free retake.`;

const MODE_HINT: Record<Mode, string> = {
  auto: "Detect type and source language first. If it's a menu, follow the MENU rule strictly: every item, full table, no omissions.",
  menu: "This is a MENU. Follow the MENU rule strictly: every item visible, complete markdown table, no summarizing.",
  sign: "This is a sign or notice. Focus on what kind of place/facility, hours, and any cautions.",
  product: "This is a product package/label. Focus on taste, ingredients, allergens, and how to use/prepare.",
};

export async function POST(req: NextRequest) {
  try {
    const {
      image,
      mode = "auto",
      messages = [],
      uiLang = "ko",
    } = (await req.json()) as {
      image?: string;
      mode?: Mode;
      messages?: ChatTurn[];
      uiLang?: UILang;
    };

    const replyLang = REPLY_LANG[uiLang] ?? REPLY_LANG.ko;
    const systemPrompt = SYSTEM_PROMPT.replace("{REPLY_LANG}", replyLang);

    if (!image || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "이미지가 비어 있습니다." },
        { status: 400 }
      );
    }

    // 쿼터 체크
    const quota = tryConsume(req);
    if (!quota.ok) {
      const res = NextResponse.json(
        {
          error: `오늘의 무료 횟수(${quota.info.limit}회)를 다 썼어요. 하루 무제한($1)으로 바로 풀 수 있어요.`,
          quota: quota.info,
          needUpgrade: true,
        },
        { status: 429 }
      );
      writeQuota(res, quota.next); // 현재 상태 그대로(count 유지) 재서명
      return res;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "서버에 OPENAI_API_KEY 가 설정돼 있지 않아요." },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });
    const openAIMessages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${MODE_HINT[mode]}\n사진 속 외국어를 한국어로 설명해줘.`,
          },
          { type: "image_url", image_url: { url: image, detail: "high" } },
        ],
      },
      ...messages.map<ChatCompletionMessageParam>((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      max_tokens: 4000,
      messages: openAIMessages,
    });

    const text =
      response.choices[0]?.message?.content?.trim() ?? "";

    // 블러 감지: AI가 "BLURRY_RETAKE" 토큰만 보냈으면 quota 차감 안 하고 재시도 안내
    if (text === "BLURRY_RETAKE" || text.startsWith("BLURRY_RETAKE")) {
      const refundedRes = NextResponse.json(
        { error: "BLURRY_RETAKE", quota: quota.info, refunded: true },
        { status: 422 }
      );
      // count 증가 없이 현재 상태 그대로 재서명 (사실상 환불)
      writeQuota(refundedRes, quota.current);
      return refundedRes;
    }

    const finalText = text || "Couldn't generate a reply.";
    const res = NextResponse.json({ text: finalText, quota: quota.info });
    writeQuota(res, quota.next);
    return res;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `AI 호출 실패: ${msg}` },
      { status: 500 }
    );
  }
}

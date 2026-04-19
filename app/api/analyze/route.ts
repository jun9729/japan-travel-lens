import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { tryConsume, writeQuota } from "@/lib/quota";

export const runtime = "nodejs";
export const maxDuration = 60;

type Mode = "auto" | "menu" | "sign" | "product";
type ChatTurn = { role: "user" | "assistant"; content: string };

const MODEL = "gpt-4o"; // 앱 전체 고정

const SYSTEM_PROMPT = `너는 해외 여행 중인 한국인 관광객의 실시간 통역·해설사야.
사용자가 보내는 사진은 외국 현지에서 찍힌 간판, 메뉴판, 상품 패키지, 표지판, 안내문 중 하나일 가능성이 크다.
언어는 일본어·중국어·영어·태국어·베트남어·스페인어·프랑스어 등 어떤 외국어도 올 수 있다.

반드시 한국어로 답하고, 아래 원칙을 지켜라:

[ 첫 답변 원칙 (사진을 처음 받았을 때) ]
1) 먼저 한 줄로 분류한다. (예: "🍜 일본 라멘집 메뉴판", "🇹🇭 태국 식당 간판")
   - 어떤 나라/언어인지도 이때 짧게 밝혀라.
2) 보이는 원문(외국어 그대로)을 인용하고 발음(로마자 또는 한글 음차)과 뜻을 풀이한다.
3) 여행자가 바로 알아야 할 실용 정보:

  ⭐ 메뉴판인 경우(중요):
  - **사진에 보이는 모든 메뉴 항목을 빠짐없이 마크다운 표로 나열해야 한다.** 절대 요약·생략 금지.
  - 형식:
    | 원문 | 한국어 뜻 | 가격 |
    |---|---|---|
  - 가격이 안 보이면 "-", 글자가 흐려서 못 읽으면 "읽기 어려움".
  - 섹션(라멘/사이드/음료 등)이 있으면 각 섹션별로 소제목과 표를 분리.
  - 표 다음에 맵기/알레르기 주의사항, 추천 주문 1~2개.

  - 간판이면: 어떤 가게/시설인지, 영업시간·정기휴일
  - 상품이면: 무엇인지, 맛/원재료/알레르기, 조리·사용법
  - 표지판/안내이면: 무엇을 금지/안내하는지, 여행자가 실수하기 쉬운 포인트

4) 읽기 어려운 글자는 솔직히 "읽기 어려움"이라고 밝혀라.
5) 메뉴판이 아닌 경우 6~12줄, 메뉴판은 길이 제한 없음.
6) 마지막 줄에 그 현지 언어로 점원/현지인에게 쓸 수 있는 짧은 문장을 "💬" 이모지와 함께 제안한다. (예: 💬 これをください (kore wo kudasai) — 이거 주세요)

[ Follow-up 질문 원칙 ]
- 같은 사진에 대한 추가 질문은 2~6줄로 짧고 구체적으로.
- 사진에서 확인 불가능한 건 "사진에서는 보이지 않음" 이라고 솔직히 말하고 일반 상식으로 보충.
- 필요 시 현지어 한 문장을 💬 로 덧붙인다.`;

const MODE_HINT: Record<Mode, string> = {
  auto: "사진 종류와 언어를 먼저 판별해서 그에 맞게 설명해라. 메뉴판으로 판별되면 시스템 프롬프트의 메뉴판 규칙을 반드시 따라 모든 항목을 표로 전부 나열할 것.",
  menu: "이 사진은 메뉴판이다. 시스템 프롬프트의 메뉴판 규칙을 반드시 지켜라 — 보이는 메뉴 항목을 하나도 빼지 말고 마크다운 표로 전부 나열할 것. 요약 금지, 생략 금지.",
  sign: "이 사진은 간판/표지판이다. 어떤 장소/시설인지와 영업시간·유의사항에 집중해라.",
  product:
    "이 사진은 상품 패키지/라벨이다. 맛·원재료·알레르기·조리법에 집중해라.",
};

export async function POST(req: NextRequest) {
  try {
    const {
      image,
      mode = "auto",
      messages = [],
    } = (await req.json()) as {
      image?: string;
      mode?: Mode;
      messages?: ChatTurn[];
    };

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
      { role: "system", content: SYSTEM_PROMPT },
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
      response.choices[0]?.message?.content?.trim() ?? "답변을 만들지 못했어요.";

    const res = NextResponse.json({ text, quota: quota.info });
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

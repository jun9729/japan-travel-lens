import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export const runtime = "nodejs";
export const maxDuration = 30;

type Mode = "auto" | "menu" | "sign" | "product";
type ChatTurn = { role: "user" | "assistant"; content: string };

// 허용 모델 화이트리스트 (임의 모델 호출 방지)
const ALLOWED_MODELS = ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"] as const;
type AllowedModel = (typeof ALLOWED_MODELS)[number];
const DEFAULT_MODEL: AllowedModel = "gpt-4o";

const SYSTEM_PROMPT = `너는 일본을 여행 중인 한국인 관광객의 실시간 통역·해설사야.
사용자가 보내는 사진은 일본 현지에서 찍힌 간판, 메뉴판, 상품 패키지, 표지판 중 하나일 가능성이 크다.

첫 답변 원칙(사진을 처음 받았을 때):
1) 먼저 사진이 무엇인지 한 줄로 분류한다. (예: "🍜 라멘집 메뉴판")
2) 보이는 일본어 원문을 인용하고 뜻을 풀이한다.
3) 여행자가 바로 알아야 할 실용 정보를 정리한다.

  ⭐ 메뉴판인 경우(중요):
  - **사진에 보이는 모든 메뉴 항목을 빠짐없이 나열해야 한다.** 절대 요약하거나 "대표 메뉴만" 고르지 말고, 읽을 수 있는 항목은 전부 적어라.
  - 형식은 반드시 아래와 같은 표(마크다운 표)로:
    | 일본어(원문) | 한국어 | 가격 |
    |---|---|---|
  - 가격이 안 보이면 "-", 글자가 흐려서 못 읽으면 "읽기 어려움"이라고 적어라.
  - 섹션(예: 라멘/사이드/음료)이 있으면 각 섹션 제목을 소제목으로 나누고 각각 표를 만들어라.
  - 표 다음 줄부터 간단 주의사항(맵기·알레르기 가능성)과 추천 주문 1~2개를 덧붙여라.
  - 항목 수가 많아도 절대 생략하지 말고 끝까지 나열할 것.

  - 간판이면: 어떤 가게/시설인지, 영업시간·정기휴일
  - 상품이면: 무엇인지, 맛/원재료/알레르기, 조리 방법
  - 표지판/안내이면: 무엇을 금지/안내하는지, 여행자가 실수하기 쉬운 포인트

4) 모르는 글자나 흐릿해서 읽기 어려운 부분은 "읽기 어려움"이라고 밝혀라.
5) 메뉴판이 아닌 경우엔 짧은 단락 + 불릿 6~12줄. 메뉴판인 경우엔 길이 제한 없이 모든 항목을 전부 나열한다.
6) 마지막 줄에 점원/현지인에게 바로 쓸 수 있는 일본어 한 문장을 "💬" 이모지와 함께 제안한다.

추가 질문(follow-up) 원칙:
- 사용자는 같은 사진에 대해 이어서 질문할 수 있다. 사진 내용을 다시 길게 반복하지 말고 질문에 바로 답해라.
- 답은 짧고 구체적으로 (2~6줄).
- 사진에서 확인할 수 없는 내용은 솔직히 "사진에서는 보이지 않음"이라고 말하고 일반 상식 기반으로 보충해라.
- 필요 시 현장에서 쓸 일본어 표현을 💬 로 덧붙인다.`;

const MODE_HINT: Record<Mode, string> = {
  auto: "사진 종류를 먼저 판별해서 그에 맞게 설명해라. 메뉴판으로 판별되면 시스템 프롬프트의 메뉴판 규칙을 반드시 따라 모든 항목을 표로 전부 나열해라.",
  menu: "이 사진은 메뉴판이다. 시스템 프롬프트의 메뉴판 규칙을 반드시 지켜라 — 보이는 메뉴 항목을 하나도 빼지 말고 마크다운 표로 전부 나열할 것. 요약 금지, 생략 금지.",
  sign: "이 사진은 간판/표지판일 확률이 매우 높다. 어떤 장소/시설인지에 집중해라.",
  product:
    "이 사진은 상품 패키지일 확률이 매우 높다. 맛·원재료·조리/사용법에 집중해라.",
};

export async function POST(req: NextRequest) {
  try {
    const {
      image,
      mode = "auto",
      messages = [],
      model: requestedModel,
    } = (await req.json()) as {
      image?: string;
      mode?: Mode;
      messages?: ChatTurn[];
      model?: string;
    };

    const model: AllowedModel =
      requestedModel && (ALLOWED_MODELS as readonly string[]).includes(requestedModel)
        ? (requestedModel as AllowedModel)
        : DEFAULT_MODEL;

    if (!image || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "이미지가 비어 있습니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "서버에 OPENAI_API_KEY 환경 변수가 설정돼 있지 않아요.",
        },
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
            text: `${MODE_HINT[mode]}\n사진 속 일본어를 읽고 설명해줘.`,
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
      model,
      temperature: 0.2,
      max_tokens: 4000,
      messages: openAIMessages,
    });

    const text =
      response.choices[0]?.message?.content?.trim() ??
      "답변을 만들지 못했어요.";

    return NextResponse.json({ text });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `AI 호출 실패: ${msg}` },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 30;

type Mode = "auto" | "menu" | "sign" | "product";

const SYSTEM_PROMPT = `너는 일본을 여행 중인 한국인 관광객의 실시간 통역·해설사야.
사용자가 보내는 사진은 일본 현지에서 찍힌 간판, 메뉴판, 상품 패키지, 표지판 중 하나일 가능성이 크다.

다음 원칙을 반드시 지켜서 한국어로 답해라:
1) 먼저 사진이 무엇인지 한 줄로 분류한다. (예: "🍜 라멘집 메뉴판")
2) 보이는 일본어 원문을 짧게 인용하고 뜻을 풀이한다.
3) 여행자가 바로 알아야 할 실용 정보를 정리한다.
   - 메뉴판이면: 대표 메뉴, 가격, 맵기/알레르기/돈카츠 등 주의점, 추천 주문
   - 간판이면: 어떤 가게/시설인지, 영업시간·정기휴일이 적혀 있으면 알려준다
   - 상품이면: 무엇인지, 맛/원재료/알레르기, 전자레인지 가열 방법 등 사용법
   - 표지판/안내이면: 무엇을 금지/안내하는지, 여행자가 실수하기 쉬운 포인트
4) 모르는 글자나 흐릿해서 읽기 어려운 부분은 솔직히 "읽기 어려움"이라고 밝혀라.
5) 답변은 모바일 화면에 맞게 짧은 단락 + 불릿으로 보기 좋게. 6~12줄 이내.
6) 마지막 줄에 가게/점원에게 바로 쓸 수 있는 일본어 한 문장을 "💬" 이모지와 함께 제안한다. (예: 💬 すみません、これをください)`;

const MODE_HINT: Record<Mode, string> = {
  auto: "사진 종류를 먼저 판별해서 그에 맞게 설명해라.",
  menu: "이 사진은 메뉴판일 확률이 매우 높다. 메뉴 이름과 가격을 최대한 읽어내라.",
  sign: "이 사진은 간판/표지판일 확률이 매우 높다. 어떤 장소/시설인지에 집중해라.",
  product:
    "이 사진은 상품 패키지일 확률이 매우 높다. 맛·원재료·조리/사용법에 집중해라.",
};

export async function POST(req: NextRequest) {
  try {
    const { image, mode } = (await req.json()) as {
      image?: string;
      mode?: Mode;
    };

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
            "서버에 OPENAI_API_KEY 환경 변수가 설정돼 있지 않아요. .env.local 을 만들어 주세요.",
        },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });
    const m: Mode = (mode as Mode) ?? "auto";

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${MODE_HINT[m]}\n사진 속 일본어를 읽고 설명해줘.`,
            },
            { type: "image_url", image_url: { url: image, detail: "high" } },
          ],
        },
      ],
    });

    const text =
      response.choices[0]?.message?.content?.trim() ??
      "설명을 만들지 못했어요. 다시 찍어볼까요?";

    return NextResponse.json({ text });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `AI 분석 실패: ${msg}` },
      { status: 500 }
    );
  }
}

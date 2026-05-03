import Link from "next/link";

export const metadata = {
  title: "일본 메뉴판 30초 만에 읽는 법 (한자 전혀 모를 때)",
  description:
    "도쿄·오사카 라멘집·이자카야 메뉴 한자 5개만 알면 절반은 됩니다. 일본 여행 전에 알아둘 30개 한자 + AI 카메라 활용법.",
  alternates: {
    canonical: "https://japan-travel-lens.vercel.app/blog/ilbon-menupan-irl-bbeop",
  },
  openGraph: {
    title: "일본 메뉴판 30초 만에 읽는 법 — Travel Lens",
    description: "한자 5개만 알면 절반. 나머지는 AI 카메라가.",
    type: "article",
    publishedTime: "2026-05-02T00:00:00Z",
    locale: "ko_KR",
  },
};

export default function Post() {
  return (
    <>
      <h1>일본 메뉴판 30초 만에 읽는 법 (한자 전혀 모를 때)</h1>
      <p className="updated">2026-05-02 게재 · 약 6분 읽기</p>

      <p>
        도쿄 신주쿠 이자카야. 자리에 앉았더니 메뉴는 거의 다 한자.
        같이 간 친구는 돼지 알레르기, 본인은 회는 못 먹음.
        직원은 영어 잘 안 통함. 어쩔 거예요?
      </p>
      <p>
        이 글에서 알려드리는 30개 한자만 알면 일본 식당 메뉴의
        70% 는 어렴풋이 알아볼 수 있습니다. 나머지는 카메라로 찍으면 됩니다.
      </p>

      <h2>먼저 — 진짜 빠른 방법은 카메라</h2>
      <p>
        솔직히 말씀드리면 한자 외우기보다 그냥 폰 카메라로 메뉴를 찍는 게 빠릅니다.
        저희가 만든 <Link href="/">여행 렌즈</Link> 같은 도구가 메뉴 전체를 표로 풀어줍니다.
        그래도 5개 정도는 알아두면 직원에게 주문할 때 편해요.
      </p>

      <h2>꼭 알아둘 라멘집 한자 10개</h2>
      <ul>
        <li><strong>豚 (부타)</strong> — 돼지. 거의 모든 라멘 국물에 들어감</li>
        <li><strong>鶏 (토리)</strong> — 닭</li>
        <li><strong>味噌 (미소)</strong> — 된장 베이스</li>
        <li><strong>醤油 (쇼유)</strong> — 간장 베이스</li>
        <li><strong>塩 (시오)</strong> — 소금 베이스. 가장 깔끔함</li>
        <li><strong>豚骨 (톤코츠)</strong> — 돼지뼈 우린 진한 국물 (후쿠오카 스타일)</li>
        <li><strong>辛 (카라)</strong> — 매움</li>
        <li><strong>大盛 (오모리)</strong> — 곱빼기</li>
        <li><strong>替玉 (카에다마)</strong> — 면 추가 (하카타 라멘에서 자주 봄)</li>
        <li><strong>叉焼 (차슈)</strong> — 돼지고기 슬라이스</li>
      </ul>

      <h2>이자카야 한자 10개</h2>
      <ul>
        <li><strong>刺身 (사시미)</strong> — 회</li>
        <li><strong>焼 (야키)</strong> — 구이 (야키토리, 야키니쿠)</li>
        <li><strong>揚 (아게)</strong> — 튀김</li>
        <li><strong>蒸 (무시)</strong> — 찜</li>
        <li><strong>串 (쿠시)</strong> — 꼬치 (쿠시카츠 등)</li>
        <li><strong>鶏皮 (토리카와)</strong> — 닭껍질</li>
        <li><strong>砂肝 (스나기모)</strong> — 닭 모래주머니 (식감 좋음)</li>
        <li><strong>レバー (레바)</strong> — 간 (보통 닭이나 소)</li>
        <li><strong>枝豆 (에다마메)</strong> — 풋콩 (기본 안주)</li>
        <li><strong>お通し (오토오시)</strong> — 자리세 명목 기본 안주 (200-500엔, 주문 안 했어도 청구됨)</li>
      </ul>

      <h2>스시 한자 10개</h2>
      <ul>
        <li><strong>鮪 (마구로)</strong> — 참치</li>
        <li><strong>鮭 (사케)</strong> — 연어 (술 사케 아님!)</li>
        <li><strong>海老 (에비)</strong> — 새우</li>
        <li><strong>蟹 (카니)</strong> — 게</li>
        <li><strong>烏賊 (이카)</strong> — 오징어</li>
        <li><strong>蛸 (타코)</strong> — 문어 (멕시코 음식 아님!)</li>
        <li><strong>玉子 (타마고)</strong> — 계란초밥</li>
        <li><strong>巻 (마키)</strong> — 김말이</li>
        <li><strong>軍艦 (군칸)</strong> — 김 두른 군함말이 (성게알·이쿠라 자주 올라감)</li>
        <li><strong>握り (니기리)</strong> — 손으로 쥔 일반 초밥 모양</li>
      </ul>

      <h2>알레르기·비건 필수 한자 (꼭 외워두세요)</h2>
      <ul>
        <li><strong>卵 / 玉子</strong> — 계란</li>
        <li><strong>牛乳 / 乳</strong> — 우유 / 유제품</li>
        <li><strong>小麦</strong> — 밀 (글루텐)</li>
        <li><strong>蕎麦</strong> — 메밀 (일본은 밀과 별개 알레르기로 분류)</li>
        <li><strong>落花生</strong> — 땅콩</li>
        <li><strong>えび / 海老</strong> — 새우</li>
        <li><strong>かに / 蟹</strong> — 게</li>
      </ul>
      <p>
        심한 알레르기가 있다면 메뉴 사진 찍어서 AI 분석 + 직원에게 보여줄 일본어 한 줄을
        준비하세요: <code>「○○アレルギーがあります」</code> (&quot;___ 알레르기 있어요&quot;).
      </p>

      <h2>현장에서 바로 쓰는 일본어 한 줄</h2>
      <ul>
        <li><em>코레와 난데스카?</em> (これは何ですか?) — &quot;이거 뭐예요?&quot;</li>
        <li><em>오스스메와?</em> (おすすめは?) — &quot;추천은요?&quot;</li>
        <li><em>부타니쿠 나시데</em> (豚肉なしで) — &quot;돼지 빼고요&quot;</li>
        <li><em>오카이케이 오네가이시마스</em> (お会計お願いします) — &quot;계산해주세요&quot;</li>
      </ul>

      <h2>해본 적 있는 함정 3가지</h2>
      <ol>
        <li>
          <strong>お通し (오토오시)</strong> — 안 시켰는데 자동으로 나오는 작은 요리.
          요금 청구됨. 거부할 수 있는 곳도 있지만 대부분 거의 의무.
        </li>
        <li>
          <strong>鮭 = 연어 ≠ 술 (사케)</strong> — 발음만 같음. 한자 다름.
          술은 보통 일본주(日本酒) 라고 적음.
        </li>
        <li>
          <strong>味噌 라멘 = 무조건 안 매운 것 아님</strong> — 매운 미소도 많음.
          辛 글자 같이 있는지 보세요.
        </li>
      </ol>

      <h2>마지막으로 — 진짜 못 알아보겠으면</h2>
      <p>
        부담 갖지 마시고 <Link href="/">여행 렌즈</Link> 같은 카메라 번역 앱을 쓰세요.
        메뉴 한 장 찍으면 모든 항목을 한국어 표로 풀어줍니다.
        하루 10번까지 무료, 더 필요하면 ₩1,500 으로 24시간 무제한.
        가입 없고 카드 저장도 안 합니다.
      </p>

      <hr />
      <p style={{ fontSize: 13, color: "#6a6a72" }}>
        관련 글:{" "}
        <Link href="/blog/japanese-menu-reading-guide-2026">English version</Link>
        {" · "}
        <Link href="/blog/menu-translation-apps-compared-2026">번역 앱 비교</Link>
      </p>
    </>
  );
}

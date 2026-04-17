# 🇯🇵 일본 여행 렌즈

모바일 웹에서 카메라로 일본어(간판·메뉴판·상품)를 찍으면
GPT-4o Vision 이 한국어로 무엇인지 설명해 줍니다.

## 실행

```bash
# 1) 의존성 설치
npm install

# 2) OpenAI 키 설정
copy .env.local.example .env.local
#  → .env.local 열어서 OPENAI_API_KEY 값을 본인 키로 교체

# 3) 개발 서버
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

## 핸드폰에서 테스트하는 법

모바일 카메라는 HTTPS 또는 `localhost` 에서만 열립니다.
같은 Wi-Fi 의 핸드폰에서 테스트하려면:

1. 터미널에서 PC 의 IP 를 확인 (`ipconfig`)
2. 핸드폰 브라우저에서 `http://<PC-IP>:3000` 접속
3. 대부분의 브라우저는 HTTP 에서 카메라를 막으므로,
   `ngrok http 3000` 같은 툴로 HTTPS 터널을 만들어 주세요.

## 구조

- `app/page.tsx` – 카메라 + 셔터 + 결과 UI (클라이언트)
- `app/api/analyze/route.ts` – 이미지 → GPT-4o-mini vision 호출
- `app/globals.css` – 모바일 풀블리드 다크 UI

## 모델

기본: `gpt-4o-mini` (저렴·빠름). 정확도를 더 높이려면
`app/api/analyze/route.ts` 의 `model` 을 `gpt-4o` 로 바꾸세요.

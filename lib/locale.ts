export type Locale = "ko" | "en" | "ja" | "zh";

export function detectLocale(langHeader?: string): Locale {
  const raw = (langHeader ?? "ko").toLowerCase();
  if (raw.startsWith("ko")) return "ko";
  if (raw.startsWith("ja")) return "ja";
  if (raw.startsWith("zh")) return "zh";
  return "en";
}

type T = {
  appName: string;
  tagline: string;
  modeAuto: string;
  modeMenu: string;
  modeSign: string;
  modeProduct: string;
  classify: string;
  hint: string;
  hintSub: string;
  capture: string;
  recapture: string;
  chatPlaceholder: string;
  send: string;
  copy: string;
  share: string;
  copied: string;
  historyTitle: string;
  settingsTitle: string;
  quotaLabel: (used: number, limit: number) => string;
  unlimited: string;
  remaining: (n: number) => string;
  exhausted: string;
  upgradeTitle: string;
  upgradeBtn: (price: string) => string;
  upgradeNote: string;
  upgradePlanName: string;
  payWithCard: string;
  payWithPayPal: string;
  payWithKakao: string;
  comingSoon: string;
  kakaoNote: string;
  paidSuccess: string;
  paidCancelled: string;
  paidError: string;
  paidActive: (until: string) => string;
  cameraError: string;
  retry: string;
  loading: string;
  close: string;
  installBanner: string;
  installBtn: string;
  langLabel: string;
  processing: string;
  cancel: string;
};

const ko: T = {
  appName: "여행 렌즈",
  tagline: "외국어를 찍으면 AI가 설명해줘요",
  modeAuto: "자동 판별",
  modeMenu: "메뉴판",
  modeSign: "간판·표지판",
  modeProduct: "상품·패키지",
  classify: "분류",
  hint: "셔터를 눌러 외국어 간판·메뉴판·상품을 찍어보세요.\nAI가 한국어로 설명하고 이어서 질문도 할 수 있어요.",
  hintSub: "일본어·중국어·영어·태국어·베트남어·스페인어 등 지원",
  capture: "촬영",
  recapture: "다시 찍기",
  chatPlaceholder: "이어서 물어보기 (예: 맵기 어때?)",
  send: "보내기",
  copy: "복사",
  share: "공유",
  copied: "✅ 복사됐어요",
  historyTitle: "최근 촬영",
  settingsTitle: "설정",
  quotaLabel: (u, l) => `오늘 ${u}/${l}회`,
  unlimited: "♾ 무제한",
  remaining: (n) => `오늘 ${n}회 남았어요`,
  exhausted: "오늘 무료 횟수를 모두 썼어요",
  upgradeTitle: "하루 무제한 이용권",
  upgradeBtn: (p) => `무제한 ${p} 결제`,
  upgradeNote: "결제 시각부터 24시간 동안 횟수 제한 없이 이용할 수 있어요.",
  upgradePlanName: "24시간 무제한",
  payWithCard: "카드 · Apple Pay · Google Pay",
  payWithPayPal: "PayPal로 결제",
  payWithKakao: "카카오페이",
  comingSoon: "준비 중",
  kakaoNote: "카카오페이는 사업자 등록 후 지원 예정이에요.",
  paidSuccess: "✅ 결제 완료! 오늘 24시간 무제한 이용 가능해요.",
  paidCancelled: "결제를 취소했어요.",
  paidError: "결제 확인에 실패했어요. 문제가 계속되면 알려주세요.",
  paidActive: (u) => `♾ 무제한 이용 중 · ${u}까지`,
  cameraError: "카메라 접근 실패",
  retry: "다시 시도",
  loading: "AI가 사진을 읽는 중",
  close: "닫기",
  installBanner: "홈 화면에 추가하면 앱처럼 쓸 수 있어요",
  installBtn: "추가",
  langLabel: "언어",
  processing: "결제창 여는 중...",
  cancel: "취소",
};

const en: T = {
  appName: "Travel Lens",
  tagline: "Point at foreign text — AI explains it",
  modeAuto: "Auto",
  modeMenu: "Menu",
  modeSign: "Sign / Board",
  modeProduct: "Product",
  classify: "Type",
  hint: "Tap the shutter to photograph a sign, menu, or product in any language.\nAI will explain it and you can ask follow-up questions.",
  hintSub: "Japanese · Chinese · English · Thai · Vietnamese · Spanish and more",
  capture: "Capture",
  recapture: "Retake",
  chatPlaceholder: "Ask a follow-up (e.g. Is it spicy?)",
  send: "Send",
  copy: "Copy",
  share: "Share",
  copied: "✅ Copied",
  historyTitle: "Recent Scans",
  settingsTitle: "Settings",
  quotaLabel: (u, l) => `${u}/${l} today`,
  unlimited: "♾ Unlimited",
  remaining: (n) => `${n} free scans left today`,
  exhausted: "You've used all free scans today",
  upgradeTitle: "Unlimited Day Pass",
  upgradeBtn: (p) => `Get Unlimited — ${p}/day`,
  upgradeNote: "Unlimited scans for 24 hours from purchase.",
  upgradePlanName: "24h Unlimited",
  payWithCard: "Card · Apple Pay · Google Pay",
  payWithPayPal: "Pay with PayPal",
  payWithKakao: "KakaoPay",
  comingSoon: "Coming soon",
  kakaoNote: "KakaoPay requires Korean business registration.",
  paidSuccess: "✅ Payment confirmed! Unlimited for 24 hours.",
  paidCancelled: "Payment cancelled.",
  paidError: "Couldn't verify payment. Please contact support.",
  paidActive: (u) => `♾ Unlimited · active until ${u}`,
  cameraError: "Camera access failed",
  retry: "Retry",
  loading: "AI is reading the photo…",
  close: "Close",
  installBanner: "Add to Home Screen for app experience",
  installBtn: "Install",
  langLabel: "Language",
  processing: "Opening payment...",
  cancel: "Cancel",
};

const ja: T = {
  appName: "トラベルレンズ",
  tagline: "外国語を撮影するとAIが説明します",
  modeAuto: "自動判別",
  modeMenu: "メニュー",
  modeSign: "看板・標識",
  modeProduct: "商品",
  classify: "分類",
  hint: "シャッターを押して看板・メニュー・商品を撮影してください。\nAIが解説し、追加質問もできます。",
  hintSub: "日本語・中国語・英語・タイ語・ベトナム語・スペイン語など対応",
  capture: "撮影",
  recapture: "撮り直し",
  chatPlaceholder: "追加で聞く（例：辛さは？）",
  send: "送信",
  copy: "コピー",
  share: "シェア",
  copied: "✅ コピーしました",
  historyTitle: "最近のスキャン",
  settingsTitle: "設定",
  quotaLabel: (u, l) => `本日 ${u}/${l}回`,
  unlimited: "♾ 無制限",
  remaining: (n) => `本日あと${n}回`,
  exhausted: "本日の無料回数を使い切りました",
  upgradeTitle: "1日無制限パス",
  upgradeBtn: (p) => `無制限 ${p}/日`,
  upgradeNote: "購入から24時間、回数無制限でご利用いただけます。",
  upgradePlanName: "24時間無制限",
  payWithCard: "カード・Apple Pay・Google Pay",
  payWithPayPal: "PayPalで支払う",
  payWithKakao: "KakaoPay",
  comingSoon: "近日公開",
  kakaoNote: "KakaoPayは韓国事業者登録が必要です。",
  paidSuccess: "✅ 決済完了！24時間無制限でご利用いただけます。",
  paidCancelled: "決済をキャンセルしました。",
  paidError: "決済の確認に失敗しました。",
  paidActive: (u) => `♾ 無制限 · ${u}まで有効`,
  cameraError: "カメラへのアクセスに失敗しました",
  retry: "再試行",
  loading: "AIが写真を解析中…",
  close: "閉じる",
  installBanner: "ホーム画面に追加するとアプリのように使えます",
  installBtn: "追加",
  langLabel: "言語",
  processing: "決済画面を開いています...",
  cancel: "キャンセル",
};

const zh: T = {
  appName: "旅行镜头",
  tagline: "拍摄外语文字，AI为您解释",
  modeAuto: "自动识别",
  modeMenu: "菜单",
  modeSign: "招牌·指示牌",
  modeProduct: "商品·包装",
  classify: "类型",
  hint: "按下快门拍摄招牌、菜单或商品。\nAI将为您解释，还可以继续提问。",
  hintSub: "支持日语·中文·英语·泰语·越南语·西班牙语等",
  capture: "拍摄",
  recapture: "重拍",
  chatPlaceholder: "继续提问（例：辣不辣？）",
  send: "发送",
  copy: "复制",
  share: "分享",
  copied: "✅ 已复制",
  historyTitle: "最近扫描",
  settingsTitle: "设置",
  quotaLabel: (u, l) => `今日 ${u}/${l}次`,
  unlimited: "♾ 无限制",
  remaining: (n) => `今日剩余 ${n} 次`,
  exhausted: "今日免费次数已用完",
  upgradeTitle: "24小时无限制通行证",
  upgradeBtn: (p) => `无限使用 ${p}/天`,
  upgradeNote: "购买后24小时内无限次使用。",
  upgradePlanName: "24小时无限制",
  payWithCard: "银行卡·Apple Pay·Google Pay",
  payWithPayPal: "PayPal付款",
  payWithKakao: "KakaoPay",
  comingSoon: "即将推出",
  kakaoNote: "KakaoPay需要韩国营业执照。",
  paidSuccess: "✅ 支付成功！24小时内无限使用。",
  paidCancelled: "已取消支付。",
  paidError: "支付验证失败，请联系客服。",
  paidActive: (u) => `♾ 无限制 · 有效至 ${u}`,
  cameraError: "无法访问摄像头",
  retry: "重试",
  loading: "AI正在分析照片…",
  close: "关闭",
  installBanner: "添加到主屏幕，像App一样使用",
  installBtn: "添加",
  langLabel: "语言",
  processing: "正在打开支付...",
  cancel: "取消",
};

export const TRANSLATIONS: Record<Locale, T> = { ko, en, ja, zh };
export type Translations = T;

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

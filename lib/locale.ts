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
  // 온보딩
  onboardTitle: string;
  onboardStep1Title: string;
  onboardStep1Body: string;
  onboardStep2Title: string;
  onboardStep2Body: string;
  onboardStep3Title: string;
  onboardStep3Body: string;
  onboardStart: string;
  onboardSkip: string;
  // iOS 설치 가이드
  iosInstallTitle: string;
  iosInstallBody: string;
  // 로딩 단계
  loadingUpload: string;
  loadingRead: string;
  loadingWrite: string;
  loadingAlmost: string;
  // 분류 설명
  modeAutoDesc: string;
  modeMenuDesc: string;
  modeSignDesc: string;
  modeProductDesc: string;
  // 히스토리 삭제 / 오프라인
  historyDelete: string;
  historyClearAll: string;
  offline: string;
  grantCamera: string;
  // 가치 제안 (업그레이드)
  valueAnchor1: string;
  valueAnchor2: string;
  valueAnchor3: string;
  oneTime: string;
  noAutoRenew: string;
  noCardSaved: string;
  // 결제 복구 / 환불
  refundIntro: string;
  refundContact: string;
  paymentRecovery: string;
  paymentTimeout: string;
  paypalUnavailable: string;
  // 신뢰 / 법적
  privacyLink: string;
  termsLink: string;
  refundLink: string;
  poweredBy: string;
  // 카메라 / 환경
  cameraGrantHelp: string;
  inAppBrowserWarn: string;
  openInBrowser: string;
  cameraSettingsHelp: string;
  // AI 취소 / 재시도
  cancelRequest: string;
  retryFree: string;
  badScanRetry: string;
  // 확인 다이얼로그
  confirmDeleteOne: string;
  confirmClearAll: string;
  confirmYes: string;
  confirmNo: string;
  // 페이드 만료 경고
  paidExpiringSoon: string;
  // 모드 변경 알림
  modeChangedRetake: string;
};

const ko: T = {
  appName: "여행 렌즈",
  tagline: "외국어를 찍으면 AI가 설명해줘요",
  modeAuto: "자동 판별",
  modeMenu: "메뉴판",
  modeSign: "간판·표지판",
  modeProduct: "상품·패키지",
  classify: "분류",
  hint: "셔터를 눌러 외국어 간판·메뉴판·상품을 찍어보세요.\nAI가 모르는 글자를 풀어 설명해주고 이어서 질문도 받아요.",
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
  onboardTitle: "여행 렌즈에 오신 걸 환영해요",
  onboardStep1Title: "외국어를 찍으세요",
  onboardStep1Body: "간판·메뉴판·상품 패키지·표지판 — 어떤 언어든 OK",
  onboardStep2Title: "AI가 설명해줍니다",
  onboardStep2Body: "메뉴판은 모든 항목을 표로, 간판은 어떤 가게인지 알려줘요",
  onboardStep3Title: "이어서 질문도 가능",
  onboardStep3Body: "\"매워?\", \"돼지고기 들어있어?\" 같은 추가 질문도 바로",
  onboardStart: "시작하기",
  onboardSkip: "건너뛰기",
  iosInstallTitle: "홈 화면에 추가하기",
  iosInstallBody: "하단 공유 버튼 ⎘ 탭 → \"홈 화면에 추가\" 선택",
  loadingUpload: "사진을 보내는 중...",
  loadingRead: "AI가 읽고 있어요...",
  loadingWrite: "해석을 작성하고 있어요...",
  loadingAlmost: "거의 다 됐어요...",
  modeAutoDesc: "AI가 알아서 판별",
  modeMenuDesc: "모든 메뉴를 표로 정리",
  modeSignDesc: "가게·시설 종류 확인",
  modeProductDesc: "원재료·사용법 확인",
  historyDelete: "삭제",
  historyClearAll: "전체 삭제",
  offline: "인터넷 연결 없음",
  grantCamera: "카메라 권한 허용 후 다시 시도",
  valueAnchor1: "도쿄 생수 1병 가격으로 24시간 무제한",
  valueAnchor2: "메뉴판 한 장 = 보통 5~10회 스캔",
  valueAnchor3: "Google 번역보다 메뉴 해석 정확도 ↑",
  oneTime: "원타임 결제 (자동 갱신 없음)",
  noAutoRenew: "24시간 후 자동 종료, 추가 청구 없음",
  noCardSaved: "카드 정보 저장 안 함",
  refundIntro: "결제 후 24시간 이내 사용 안 했으면 전액 환불",
  refundContact: "문제가 있으신가요? travellens.help@gmail.com 로 주문번호와 함께 연락 주세요.",
  paymentRecovery: "결제는 됐지만 화면이 갱신되지 않을 수 있어요. 새로고침하거나 위 이메일로 주문번호를 알려주세요.",
  paymentTimeout: "결제창이 응답하지 않아요. 팝업 차단이 켜져 있는지 확인하시고 다시 시도해주세요.",
  paypalUnavailable: "PayPal 서비스에 연결할 수 없어요. 잠시 후 다시 시도해주세요.",
  privacyLink: "개인정보처리방침",
  termsLink: "이용약관",
  refundLink: "환불 정책",
  poweredBy: "AI 분석은 OpenAI GPT-4o 로 처리됩니다",
  cameraGrantHelp: "권한이 거부됐어요. 주소창의 자물쇠 → 카메라 → '허용' 으로 변경 후 새로고침해주세요.",
  inAppBrowserWarn: "이 브라우저에서는 카메라가 동작하지 않아요. 우측 상단 메뉴에서 'Safari/Chrome 으로 열기' 를 선택해주세요.",
  openInBrowser: "Safari/Chrome 으로 열기",
  cameraSettingsHelp: "iOS 설정 → Safari → 카메라 → 허용",
  cancelRequest: "취소",
  retryFree: "무료로 다시 시도",
  badScanRetry: "사진이 흐릿했나요? 다시 찍으면 횟수 차감 안 돼요",
  confirmDeleteOne: "이 사진을 삭제할까요?",
  confirmClearAll: "모든 히스토리를 삭제할까요?",
  confirmYes: "삭제",
  confirmNo: "취소",
  paidExpiringSoon: "무제한 이용 30분 남았어요",
  modeChangedRetake: "분류를 바꾸려면 다시 촬영하세요",
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
  onboardTitle: "Welcome to Travel Lens",
  onboardStep1Title: "Photograph foreign text",
  onboardStep1Body: "Signs, menus, product labels, notices — any language works",
  onboardStep2Title: "AI explains it",
  onboardStep2Body: "Menus become a complete table; signs tell you what the place is",
  onboardStep3Title: "Ask follow-ups",
  onboardStep3Body: "\"Is it spicy?\" \"Does it have pork?\" — just ask",
  onboardStart: "Get Started",
  onboardSkip: "Skip",
  iosInstallTitle: "Add to Home Screen",
  iosInstallBody: "Tap the share button ⎘ below → select \"Add to Home Screen\"",
  loadingUpload: "Uploading photo...",
  loadingRead: "AI is reading...",
  loadingWrite: "Writing explanation...",
  loadingAlmost: "Almost done...",
  modeAutoDesc: "AI detects the type",
  modeMenuDesc: "All items as a table",
  modeSignDesc: "What kind of place it is",
  modeProductDesc: "Ingredients & usage",
  historyDelete: "Delete",
  historyClearAll: "Clear all",
  offline: "No internet connection",
  grantCamera: "Grant camera permission and retry",
  valueAnchor1: "Cheaper than a bottle of water in Tokyo",
  valueAnchor2: "One menu = ~5-10 scans typically",
  valueAnchor3: "More accurate than Google Translate for menus",
  oneTime: "One-time payment (no recurring)",
  noAutoRenew: "Auto-ends after 24h, no extra charge",
  noCardSaved: "Card details not stored",
  refundIntro: "Full refund within 24h if unused",
  refundContact: "Issue? Email travellens.help@gmail.com with your order number.",
  paymentRecovery: "Payment may have succeeded but UI didn't refresh. Reload, or email us with your order number.",
  paymentTimeout: "Payment window not responding. Check popup blocker and try again.",
  paypalUnavailable: "Can't reach PayPal right now. Please try again in a moment.",
  privacyLink: "Privacy Policy",
  termsLink: "Terms",
  refundLink: "Refunds",
  poweredBy: "AI by OpenAI GPT-4o",
  cameraGrantHelp: "Permission denied. Tap the lock icon in the URL bar → Camera → Allow, then reload.",
  inAppBrowserWarn: "Camera doesn't work in this browser. Open in Safari or Chrome from the menu (top right).",
  openInBrowser: "Open in Safari/Chrome",
  cameraSettingsHelp: "iOS Settings → Safari → Camera → Allow",
  cancelRequest: "Cancel",
  retryFree: "Retry for free",
  badScanRetry: "Was the photo blurry? Retake doesn't cost a scan",
  confirmDeleteOne: "Delete this photo?",
  confirmClearAll: "Delete all history?",
  confirmYes: "Delete",
  confirmNo: "Cancel",
  paidExpiringSoon: "30 minutes of unlimited remaining",
  modeChangedRetake: "Retake to apply the new category",
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
  onboardTitle: "トラベルレンズへようこそ",
  onboardStep1Title: "外国語を撮影",
  onboardStep1Body: "看板・メニュー・商品パッケージ・案内 — どんな言語でもOK",
  onboardStep2Title: "AIが解説します",
  onboardStep2Body: "メニューは全項目を表で、看板は店の種類を教えてくれます",
  onboardStep3Title: "追加質問もOK",
  onboardStep3Body: "「辛い？」「豚肉入ってる？」など気軽に質問",
  onboardStart: "はじめる",
  onboardSkip: "スキップ",
  iosInstallTitle: "ホーム画面に追加",
  iosInstallBody: "下の共有ボタン ⎘ をタップ → \"ホーム画面に追加\" を選択",
  loadingUpload: "写真を送信中...",
  loadingRead: "AIが読んでいます...",
  loadingWrite: "解説を作成中...",
  loadingAlmost: "もうすぐです...",
  modeAutoDesc: "AIが種類を自動判別",
  modeMenuDesc: "全項目を表に",
  modeSignDesc: "店舗・施設の種類",
  modeProductDesc: "原材料・使用方法",
  historyDelete: "削除",
  historyClearAll: "すべて削除",
  offline: "インターネット接続なし",
  grantCamera: "カメラ許可後、再試行してください",
  valueAnchor1: "東京の水1本より安い",
  valueAnchor2: "メニュー1枚 ≈ 5〜10回スキャン",
  valueAnchor3: "Google翻訳よりメニュー解読が正確",
  oneTime: "ワンタイム決済（自動更新なし）",
  noAutoRenew: "24時間後に自動終了、追加請求なし",
  noCardSaved: "カード情報は保存しません",
  refundIntro: "24時間以内に未使用なら全額返金",
  refundContact: "問題があれば注文番号を添えて travellens.help@gmail.com まで。",
  paymentRecovery: "決済は完了したが画面が更新されない場合があります。リロードまたは上記メールに連絡を。",
  paymentTimeout: "決済画面が応答しません。ポップアップブロックを確認してやり直してください。",
  paypalUnavailable: "PayPal に接続できません。少し時間をおいて再試行を。",
  privacyLink: "プライバシーポリシー",
  termsLink: "利用規約",
  refundLink: "返金ポリシー",
  poweredBy: "AI解析は OpenAI GPT-4o を使用",
  cameraGrantHelp: "カメラが拒否されています。アドレスバーの鍵アイコン → カメラ → 許可 → 再読み込み。",
  inAppBrowserWarn: "このブラウザでは動作しません。右上メニューから Safari / Chrome で開いてください。",
  openInBrowser: "Safari/Chrome で開く",
  cameraSettingsHelp: "iOS 設定 → Safari → カメラ → 許可",
  cancelRequest: "キャンセル",
  retryFree: "無料で再試行",
  badScanRetry: "写真がブレた? 撮り直しは回数を消費しません",
  confirmDeleteOne: "この写真を削除しますか？",
  confirmClearAll: "履歴をすべて削除しますか？",
  confirmYes: "削除",
  confirmNo: "キャンセル",
  paidExpiringSoon: "無制限あと30分",
  modeChangedRetake: "新しい分類で撮り直してください",
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
  onboardTitle: "欢迎使用旅行镜头",
  onboardStep1Title: "拍摄外语文字",
  onboardStep1Body: "招牌·菜单·商品包装·告示 — 任何语言都可以",
  onboardStep2Title: "AI为您解释",
  onboardStep2Body: "菜单会变成完整表格，招牌会告诉您是什么店",
  onboardStep3Title: "继续提问",
  onboardStep3Body: "\"辣吗？\"\"有猪肉吗？\"— 尽管问",
  onboardStart: "开始使用",
  onboardSkip: "跳过",
  iosInstallTitle: "添加到主屏幕",
  iosInstallBody: "点击底部分享按钮 ⎘ → 选择\"添加到主屏幕\"",
  loadingUpload: "上传照片中...",
  loadingRead: "AI正在阅读...",
  loadingWrite: "正在撰写解释...",
  loadingAlmost: "即将完成...",
  modeAutoDesc: "AI自动识别类型",
  modeMenuDesc: "所有项目表格化",
  modeSignDesc: "店铺·设施类型",
  modeProductDesc: "成分与使用方法",
  historyDelete: "删除",
  historyClearAll: "全部清空",
  offline: "无网络连接",
  grantCamera: "允许相机权限后重试",
  valueAnchor1: "比东京一瓶水还便宜",
  valueAnchor2: "一份菜单 ≈ 5-10 次扫描",
  valueAnchor3: "菜单解读比 Google 翻译更准",
  oneTime: "一次性付款（无自动续订）",
  noAutoRenew: "24 小时后自动结束，不会额外收费",
  noCardSaved: "不保存卡信息",
  refundIntro: "24 小时内未使用全额退款",
  refundContact: "如有问题，请将订单号发送至 travellens.help@gmail.com。",
  paymentRecovery: "支付可能已完成但界面未刷新。请刷新页面或邮件联系我们。",
  paymentTimeout: "支付窗口无响应。请检查浏览器弹窗拦截后重试。",
  paypalUnavailable: "无法连接 PayPal，请稍后再试。",
  privacyLink: "隐私政策",
  termsLink: "使用条款",
  refundLink: "退款政策",
  poweredBy: "AI 由 OpenAI GPT-4o 提供",
  cameraGrantHelp: "权限被拒。点击地址栏锁形图标 → 相机 → 允许 → 刷新。",
  inAppBrowserWarn: "此浏览器无法使用相机。请从右上角菜单选择「用 Safari/Chrome 打开」。",
  openInBrowser: "用 Safari/Chrome 打开",
  cameraSettingsHelp: "iOS 设置 → Safari → 相机 → 允许",
  cancelRequest: "取消",
  retryFree: "免费重试",
  badScanRetry: "照片模糊？重拍不会扣次数",
  confirmDeleteOne: "删除这张照片？",
  confirmClearAll: "删除所有历史？",
  confirmYes: "删除",
  confirmNo: "取消",
  paidExpiringSoon: "无限制剩余30分钟",
  modeChangedRetake: "重新拍摄以应用新分类",
};

export const TRANSLATIONS: Record<Locale, T> = { ko, en, ja, zh };
export type Translations = T;

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  DISPATCH_ACTION,
} from "@paypal/react-paypal-js";
import { TRANSLATIONS, LOCALE_LABELS, type Locale } from "@/lib/locale";

type Mode = "auto" | "menu" | "sign" | "product";
type ChatTurn = { role: "user" | "assistant"; content: string };
type QuotaInfo = {
  count: number;
  limit: number;
  remaining: number;
  isPaid: boolean;
  paidUntil?: number;
};
type ScanRecord = { thumb: string; firstLine: string; ts: number };
type Sheet = "none" | "settings" | "upgrade" | "history";
type ZoomCaps = { min: number; max: number; step: number };
type FocusPoint = { x: number; y: number };

const HISTORY_KEY = "tl_history";
const LOCALE_KEY = "tl_locale";
const MAX_HISTORY = 6;
const MODE_ICONS: Record<Mode, string> = {
  auto: "✦",
  menu: "🍽",
  sign: "🪧",
  product: "📦",
};

/* ── 타입 확장 (브라우저 신규 API) ── */
type CamCapabilities = MediaTrackCapabilities & {
  zoom?: { min: number; max: number; step: number };
  focusMode?: string[];
  torch?: boolean;
};
type AdvancedConstraint = {
  zoom?: number;
  focusMode?: string;
  pointsOfInterest?: { x: number; y: number }[];
  torch?: boolean;
};

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "ko";
  const l = navigator.language.toLowerCase();
  if (l.startsWith("ko")) return "ko";
  if (l.startsWith("ja")) return "ja";
  if (l.startsWith("zh")) return "zh";
  return "en";
}

function fmtDate(ts: number, locale: Locale) {
  return new Date(ts).toLocaleString(
    { ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN" }[locale],
    { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
  );
}

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }
}

/**
 * PayPal SDK 를 한 번만 로드해서 재사용.
 * - Provider 는 최상단에 항상 마운트 (deferLoading 으로 초기엔 로드 안 함)
 * - paypalId 가 도착하면 resetOptions 로 SDK 로딩 트리거
 * - 이후 업그레이드 시트를 열면 PayPalButtons 가 이미 준비된 SDK 사용 → 즉시 반응
 */
function PayPalBootstrap({ clientId }: { clientId: string | null }) {
  const [, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    if (!clientId) return;
    dispatch({
      type: DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        clientId,
        currency: "USD",
        components: "buttons",
        intent: "capture",
      },
    });
  }, [clientId, dispatch]);
  return null;
}

export default function Page() {
  const [ppId, setPpId] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/paypal/clientid")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.clientId && setPpId(d.clientId))
      .catch(() => {});
  }, []);

  return (
    <PayPalScriptProvider
      options={{ clientId: "placeholder", components: "buttons" }}
      deferLoading
    >
      <PayPalBootstrap clientId={ppId} />
      <PageInner paypalId={ppId} />
    </PayPalScriptProvider>
  );
}

function PageInner({ paypalId }: { paypalId: string | null }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const deferredInstall = useRef<BeforeInstallPromptEvent | null>(null);
  const pinchStart = useRef<{ dist: number; zoom: number } | null>(null);

  const [locale, setLocale] = useState<Locale>("ko");
  const [ready, setReady] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("auto");
  const [sheet, setSheet] = useState<Sheet>("none");
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [price, setPrice] = useState("$1");
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [toast, setToast] = useState("");
  const [installable, setInstallable] = useState(false);

  // 카메라 제어
  const [zoomCaps, setZoomCaps] = useState<ZoomCaps | null>(null);
  const [zoom, setZoom] = useState(1);
  const [hasFocus, setHasFocus] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [focusPoint, setFocusPoint] = useState<FocusPoint | null>(null);

  const t = TRANSLATIONS[locale];
  const chatting = !!shot && messages.length > 0;

  /* ── 초기화 ───────────────────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
    setLocale(saved && TRANSLATIONS[saved] ? saved : detectBrowserLocale());

    try {
      setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]"));
    } catch {
      /**/
    }

    fetch("/api/quota")
      .then((r) => r.json())
      .then((d) => d.quota && setQuota(d.quota))
      .catch(() => {});
    fetch("/api/price")
      .then((r) => r.json())
      .then((d) => d.price?.display && setPrice(d.price.display))
      .catch(() => {});

    const beforeInstall = (e: Event) => {
      e.preventDefault();
      deferredInstall.current = e as BeforeInstallPromptEvent;
      setInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", beforeInstall);

    const params = new URLSearchParams(window.location.search);
    const paid = params.get("paid");
    if (paid) {
      const msg =
        paid === "success"
          ? TRANSLATIONS[locale].paidSuccess
          : paid === "cancelled"
          ? TRANSLATIONS[locale].paidCancelled
          : TRANSLATIONS[locale].paidError;
      showToastMsg(msg, paid === "success" ? 5000 : 3000);
      const url = new URL(window.location.href);
      url.searchParams.delete("paid");
      window.history.replaceState({}, "", url.toString());
    }

    return () => window.removeEventListener("beforeinstallprompt", beforeInstall);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  function showToastMsg(msg: string, ms = 3000) {
    setToast(msg);
    setTimeout(() => setToast(""), ms);
  }

  /* ── 카메라 ───────────────────────────────── */
  const detectCaps = useCallback(() => {
    const stream = streamRef.current;
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    if (!track) return;
    const caps: CamCapabilities = track.getCapabilities?.() ?? {};
    if (caps.zoom) {
      setZoomCaps({
        min: caps.zoom.min,
        max: caps.zoom.max,
        step: caps.zoom.step ?? 0.1,
      });
      setZoom(caps.zoom.min);
    } else {
      setZoomCaps(null);
    }
    setHasFocus(Array.isArray(caps.focusMode) && caps.focusMode.length > 0);
    setHasTorch(!!caps.torch);
    setTorchOn(false);
  }, []);

  const startCamera = useCallback(async () => {
    setError("");
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setReady(true);
      detectCaps();
    } catch (e: unknown) {
      setError(
        `${t.cameraError}: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }, [t, detectCaps]);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  /* ── 카메라 제어 (줌/초점/손전등) ──────────── */
  const applyAdvanced = useCallback(async (c: AdvancedConstraint) => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    try {
      await track.applyConstraints({
        advanced: [c as MediaTrackConstraintSet],
      });
    } catch {
      /* 지원 안 하는 기기 */
    }
  }, []);

  const applyZoom = useCallback(
    async (z: number) => {
      if (!zoomCaps) return;
      const clamped = Math.max(zoomCaps.min, Math.min(zoomCaps.max, z));
      await applyAdvanced({ zoom: clamped });
      setZoom(clamped);
    },
    [zoomCaps, applyAdvanced]
  );

  const toggleTorch = useCallback(async () => {
    if (!hasTorch) return;
    const next = !torchOn;
    await applyAdvanced({ torch: next });
    setTorchOn(next);
    navigator.vibrate?.(20);
  }, [hasTorch, torchOn, applyAdvanced]);

  const handleCameraTap = useCallback(
    async (e: React.PointerEvent<HTMLDivElement>) => {
      if (shot) return;
      if (!hasFocus) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const normX = localX / rect.width;
      const normY = localY / rect.height;
      setFocusPoint({ x: localX, y: localY });
      setTimeout(() => setFocusPoint(null), 800);
      navigator.vibrate?.(15);
      await applyAdvanced({
        pointsOfInterest: [{ x: normX, y: normY }],
        focusMode: "single-shot",
      });
    },
    [shot, hasFocus, applyAdvanced]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (shot || !zoomCaps) return;
      if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchStart.current = { dist: d, zoom };
      }
    },
    [shot, zoomCaps, zoom]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (shot || !zoomCaps || !pinchStart.current) return;
      if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = d / pinchStart.current.dist;
        applyZoom(pinchStart.current.zoom * factor);
      }
    },
    [shot, zoomCaps, applyZoom]
  );

  const handleTouchEnd = useCallback(() => {
    pinchStart.current = null;
  }, []);

  /* ── API ──────────────────────────────────── */
  const callAPI = useCallback(
    async (image: string, turns: ChatTurn[]) => {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          messages: turns,
          mode,
          uiLang: locale,
        }),
      });
      const data = await res.json();
      if (data.quota) setQuota(data.quota);
      if (!res.ok)
        throw Object.assign(new Error(data?.error ?? "Error"), {
          needUpgrade: !!data.needUpgrade,
        });
      return (data.text as string) ?? "";
    },
    [mode, locale]
  );

  /* ── 촬영 ────────────────────────────────── */
  const capture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current,
      c = canvasRef.current;
    const w = v.videoWidth || 1280,
      h = v.videoHeight || 720;
    const s = Math.min(1, 1280 / Math.max(w, h));
    c.width = Math.round(w * s);
    c.height = Math.round(h * s);
    c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
    const dataUrl = c.toDataURL("image/jpeg", 0.82);

    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    navigator.vibrate?.(40);
    setShot(dataUrl);
    setMessages([]);
    setError("");
    setLoading(true);

    try {
      const text = await callAPI(dataUrl, []);
      setMessages([{ role: "assistant", content: text }]);
      const firstLine = text.replace(/[#*|`]/g, "").split("\n")[0] ?? "";
      setHistory((prev) => {
        const next = [
          { thumb: dataUrl, firstLine: firstLine.slice(0, 60), ts: Date.now() },
          ...prev,
        ].slice(0, MAX_HISTORY);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        return next;
      });
    } catch (e: unknown) {
      const err = e as Error & { needUpgrade?: boolean };
      setError(err.message);
      if (err.needUpgrade) setSheet("upgrade");
    } finally {
      setLoading(false);
    }
  }, [callAPI]);

  const retake = useCallback(() => {
    setShot(null);
    setMessages([]);
    setInput("");
    setError("");
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    } else {
      startCamera();
    }
  }, [startCamera]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || !shot || loading) return;
    const next: ChatTurn[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const reply = await callAPI(shot, next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [callAPI, input, loading, messages, shot]);

  /* ── 액션 유틸 ───────────────────────────── */
  const copyText = useCallback(
    (s: string) => {
      navigator.clipboard.writeText(s).then(() => showToastMsg(t.copied));
    },
    [t]
  );
  const shareText = useCallback(
    (s: string) => {
      navigator.share
        ? navigator.share({ title: t.appName, text: s }).catch(() => {})
        : copyText(s);
    },
    [copyText, t]
  );

  const afterPayPalCapture = useCallback(
    async (orderID: string) => {
      const r = await fetch("/api/paypal/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID }),
      });
      const d = await r.json();
      if (d.ok) {
        const qr = await fetch("/api/quota");
        const qd = await qr.json();
        if (qd.quota) setQuota(qd.quota);
        setSheet("none");
        showToastMsg(t.paidSuccess, 5000);
      } else {
        showToastMsg(t.paidError);
      }
    },
    [t]
  );

  const modeLabel = (m: Mode) =>
    ({
      auto: t.modeAuto,
      menu: t.modeMenu,
      sign: t.modeSign,
      product: t.modeProduct,
    }[m]);

  const quotaLabel = quota
    ? quota.isPaid
      ? t.unlimited
      : t.quotaLabel(quota.count, quota.limit)
    : "…";
  const nearLimit =
    !!quota && !quota.isPaid && quota.remaining <= 2 && quota.remaining > 0;
  const exhausted = !!quota && !quota.isPaid && quota.remaining === 0;

  // 줌 프리셋 값 (지원 범위 내에서 1x / 2x / max)
  const zoomPresets = zoomCaps
    ? Array.from(
        new Set(
          [1, 2, Math.round(zoomCaps.max * 10) / 10]
            .filter((v) => v >= zoomCaps.min && v <= zoomCaps.max)
            .sort((a, b) => a - b)
        )
      )
    : [];

  /* ── 렌더 ────────────────────────────────── */
  return (
    <main className={`app ${chatting ? "chatting" : ""}`}>
      {flash && <div className="flash" />}

      {/* 카메라 */}
      <div
        className={`camera-wrap ${chatting ? "compact" : ""}`}
        onPointerDown={handleCameraTap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="camera-overlay-top">
          <button className="logo-btn" onClick={() => setSheet("history")}>
            🌏 {t.appName}
          </button>
          <button
            className={`badge badge-btn ${quota?.isPaid ? "paid" : ""} ${
              nearLimit || exhausted ? "warn" : ""
            }`}
            onClick={() =>
              setSheet(sheet === "settings" ? "none" : "settings")
            }
          >
            {quota?.isPaid ? "♾" : exhausted ? "⚠" : "📸"} {quotaLabel}
          </button>
        </div>

        {!shot && (
          <div className="cam-brackets">
            <span /><span /><span /><span />
          </div>
        )}

        {shot ? (
          <img src={shot} alt="captured" className="preview" />
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            style={{ background: "#000" }}
          />
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 초점 링 */}
        {focusPoint && !shot && (
          <div
            className="focus-ring"
            style={{ left: focusPoint.x, top: focusPoint.y }}
          />
        )}

        {/* 카메라 우측 컨트롤 */}
        {!shot && (
          <div className="cam-controls-right">
            {hasTorch && (
              <button
                className={`cam-btn ${torchOn ? "on" : ""}`}
                onClick={toggleTorch}
                aria-label="torch"
              >
                {torchOn ? "🔦" : "💡"}
              </button>
            )}
          </div>
        )}

        {/* 줌 칩 */}
        {!shot && zoomCaps && zoomPresets.length > 1 && (
          <div className="zoom-chips">
            {zoomPresets.map((z) => (
              <button
                key={z}
                className={`zoom-chip ${
                  Math.abs(zoom - z) < 0.15 ? "active" : ""
                }`}
                onClick={() => applyZoom(z)}
              >
                {z < 1 ? z.toFixed(1) : z >= 10 ? z.toFixed(0) : z.toFixed(z % 1 === 0 ? 0 : 1)}x
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 셔터 바 */}
      <div className="action-bar">
        {shot ? (
          <>
            <button className="side-btn" onClick={retake}>
              ↺
            </button>
            <button
              className="shutter"
              onClick={capture}
              disabled={loading || !ready}
              style={{ background: loading ? "#555" : "#fff" }}
            />
            <button className="side-btn" onClick={() => setSheet("history")}>
              🕐
            </button>
          </>
        ) : (
          <>
            <button className="side-btn" onClick={() => setSheet("history")}>
              🕐
            </button>
            <button
              className="shutter"
              onClick={capture}
              disabled={loading || !ready}
            />
            <button className="side-btn" onClick={() => setSheet("settings")}>
              ⚙
            </button>
          </>
        )}
      </div>

      {/* 결과 */}
      <div className="result">
        {!shot && (
          <>
            <div className="section-label">{t.classify}</div>
            <div className="chip-row" style={{ marginBottom: 14 }}>
              {(["auto", "menu", "sign", "product"] as Mode[]).map((m) => (
                <button
                  key={m}
                  className={`chip ${mode === m ? "active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  {MODE_ICONS[m]} {modeLabel(m)}
                </button>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="err">
            {error}
            {exhausted && (
              <button
                className="err-upgrade"
                onClick={() => setSheet("upgrade")}
              >
                {t.upgradeBtn(price)} →
              </button>
            )}
          </div>
        )}

        {!messages.length && !loading && !error && (
          <div className="hint">
            {t.hint.split("\n").map((l, i) => (
              <span key={i}>
                {l}
                {i === 0 && <br />}
              </span>
            ))}
            <div className="hint-sub">{t.hintSub}</div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`bubble-row ${m.role}`}>
            <div className={`bubble ${m.role}`}>
              {m.role === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              ) : (
                m.content
              )}
              {m.role === "assistant" && (
                <div className="bubble-actions">
                  <button onClick={() => copyText(m.content)}>{t.copy}</button>
                  <button onClick={() => shareText(m.content)}>
                    {t.share}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="bubble-row assistant">
            <div className="bubble assistant loading-bubble">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {chatting && (
        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={t.chatPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            enterKeyHint="send"
            autoComplete="off"
          />
          <button
            type="submit"
            className="send-btn"
            disabled={loading || !input.trim()}
          >
            ↑
          </button>
        </form>
      )}

      {toast && <div className="toast">{toast}</div>}

      {installable && (
        <div className="install-banner">
          <span>{t.installBanner}</span>
          <button
            onClick={async () => {
              deferredInstall.current?.prompt();
              const r = await deferredInstall.current?.userChoice;
              if (r?.outcome === "accepted") setInstallable(false);
            }}
          >
            {t.installBtn}
          </button>
          <button onClick={() => setInstallable(false)}>✕</button>
        </div>
      )}

      {/* 바텀시트 */}
      {sheet !== "none" && (
        <div className="sheet-backdrop" onClick={() => setSheet("none")}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />

            {sheet === "settings" && (
              <>
                <div className="sheet-title">{t.settingsTitle}</div>
                <div className="quota-card">
                  {quota?.isPaid ? (
                    <>
                      <div className="quota-headline">{t.unlimited}</div>
                      <div className="quota-sub">
                        {quota.paidUntil
                          ? t.paidActive(fmtDate(quota.paidUntil, locale))
                          : ""}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="quota-headline">
                        {quota ? `${quota.count} / ${quota.limit}` : "…"}
                      </div>
                      <div className="quota-sub">
                        {quota
                          ? quota.remaining > 0
                            ? t.remaining(quota.remaining)
                            : t.exhausted
                          : ""}
                      </div>
                      <button
                        className="upgrade-btn"
                        onClick={() => setSheet("upgrade")}
                      >
                        {t.upgradeBtn(price)}
                      </button>
                    </>
                  )}
                </div>

                <div className="sheet-title" style={{ marginTop: 16 }}>
                  {t.classify}
                </div>
                {(["auto", "menu", "sign", "product"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    className={`sheet-row compact ${
                      mode === m ? "active" : ""
                    }`}
                    onClick={() => {
                      setMode(m);
                      setSheet("none");
                    }}
                  >
                    <span className="sheet-row-label">
                      {MODE_ICONS[m]} {modeLabel(m)}
                    </span>
                    {mode === m && <span className="sheet-check">✓</span>}
                  </button>
                ))}

                <div className="sheet-title" style={{ marginTop: 16 }}>
                  {t.langLabel}
                </div>
                <div className="lang-row">
                  {(Object.keys(LOCALE_LABELS) as Locale[]).map((l) => (
                    <button
                      key={l}
                      className={`chip ${locale === l ? "active" : ""}`}
                      onClick={() => setLocale(l)}
                    >
                      {LOCALE_LABELS[l]}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* 업그레이드 — PayPal 전용 */}
            {sheet === "upgrade" && (
              <>
                <div className="sheet-title">{t.upgradeTitle}</div>
                <div className="quota-card" style={{ marginBottom: 16 }}>
                  <div className="quota-headline">
                    {t.upgradePlanName} — {price}
                  </div>
                  <div className="quota-sub">{t.upgradeNote}</div>
                </div>

                {paypalId ? (
                  <div className="paypal-wrap">
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "pay",
                        height: 48,
                      }}
                      createOrder={async () => {
                        const r = await fetch("/api/paypal/create", {
                          method: "POST",
                        });
                        const d = await r.json();
                        if (!d.orderID) throw new Error(d.error);
                        return d.orderID as string;
                      }}
                      onApprove={async (data) => {
                        await afterPayPalCapture(data.orderID ?? "");
                      }}
                    />
                  </div>
                ) : (
                  <div className="paypal-placeholder">
                    <div className="pay-icon">🅿</div>
                    <div className="pay-label">
                      <span>{t.payWithPayPal}</span>
                      <span className="pay-note">
                        서버에 PAYPAL_CLIENT_ID 설정 후 활성화
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            {sheet === "history" && (
              <>
                <div className="sheet-title">{t.historyTitle}</div>
                {history.length === 0 ? (
                  <div className="hint" style={{ padding: "20px 0" }}>
                    —
                  </div>
                ) : (
                  <div className="history-grid">
                    {history.map((h, i) => (
                      <button
                        key={i}
                        className="history-item"
                        onClick={() => {
                          setShot(h.thumb);
                          setMessages([]);
                          setSheet("none");
                        }}
                      >
                        <img
                          src={h.thumb}
                          alt=""
                          className="history-thumb"
                        />
                        <div className="history-line">
                          {h.firstLine || "…"}
                        </div>
                        <div className="history-ts">
                          {fmtDate(h.ts, locale)}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            <button className="sheet-close" onClick={() => setSheet("none")}>
              {t.close}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

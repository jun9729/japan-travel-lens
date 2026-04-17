"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Mode = "auto" | "menu" | "sign" | "product";
type ChatTurn = { role: "user" | "assistant"; content: string };
type ModelId = "gpt-4o" | "gpt-4o-mini" | "gpt-4-turbo";

const MODE_LABEL: Record<Mode, string> = {
  auto: "자동 판별",
  menu: "메뉴판",
  sign: "간판/표지판",
  product: "상품",
};

const MODELS: {
  id: ModelId;
  label: string;
  sub: string;
  tag?: string;
}[] = [
  { id: "gpt-4o", label: "고정밀", sub: "GPT-4o · 정확도↑", tag: "추천" },
  { id: "gpt-4o-mini", label: "빠름", sub: "GPT-4o-mini · 저렴·빠름" },
  { id: "gpt-4-turbo", label: "터보", sub: "GPT-4-turbo · 구세대" },
];

const MODEL_SHORT: Record<ModelId, string> = {
  "gpt-4o": "4o",
  "gpt-4o-mini": "4o-mini",
  "gpt-4-turbo": "4-turbo",
};

const MODEL_STORAGE_KEY = "jtl.model";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [ready, setReady] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<Mode>("auto");
  const [model, setModel] = useState<ModelId>("gpt-4o");
  const [showModelSheet, setShowModelSheet] = useState(false);

  // 선택한 모델을 localStorage에 저장·복원
  useEffect(() => {
    const saved = localStorage.getItem(MODEL_STORAGE_KEY) as ModelId | null;
    if (saved && MODELS.some((m) => m.id === saved)) setModel(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem(MODEL_STORAGE_KEY, model);
  }, [model]);

  const chatting = !!shot && messages.length > 0;

  const startCamera = useCallback(async () => {
    setError("");
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
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
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "카메라를 열 수 없습니다.";
      setError(
        `카메라 접근 실패: ${msg}\n브라우저 주소창 옆 자물쇠 아이콘에서 카메라 권한을 허용해 주세요.`
      );
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const callAPI = useCallback(
    async (image: string, turns: ChatTurn[]) => {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, messages: turns, mode, model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "분석에 실패했어요");
      return (data.text as string) ?? "";
    },
    [mode, model]
  );

  const capture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    const maxSide = 1280;
    const scale = Math.min(1, maxSide / Math.max(w, h));
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82);

    setShot(dataUrl);
    setMessages([]);
    setError("");
    setLoading(true);

    try {
      const text = await callAPI(dataUrl, []);
      setMessages([{ role: "assistant", content: text }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
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
    const nextTurns: ChatTurn[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextTurns);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const reply = await callAPI(shot, nextTurns);
      setMessages([...nextTurns, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [callAPI, input, loading, messages, shot]);

  return (
    <main className={`app ${chatting ? "chatting" : ""}`}>
      <div className={`camera-wrap ${chatting ? "compact" : ""}`}>
        <div className="camera-overlay-top">
          <div className="logo">🇯🇵 여행 렌즈</div>
          <button
            className="badge badge-btn"
            onClick={() => setShowModelSheet(true)}
            aria-label="모델 선택"
          >
            ⚙ {MODEL_SHORT[model]} · {MODE_LABEL[mode]}
          </button>
        </div>

        {shot ? (
          <img src={shot} alt="촬영 결과" className="preview" />
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
      </div>

      <div className="action-bar">
        {shot ? (
          <>
            <button className="side-btn" onClick={retake} aria-label="다시 찍기">
              ↺
            </button>
            <button
              className="shutter"
              onClick={capture}
              disabled={loading || !ready}
              aria-label="다시 분석"
              style={{ background: loading ? "#888" : "#fff" }}
            />
            <div className="side-btn" style={{ opacity: 0 }} />
          </>
        ) : (
          <>
            <div className="side-btn" style={{ opacity: 0 }} />
            <button
              className="shutter"
              onClick={capture}
              disabled={loading || !ready}
              aria-label="촬영"
            />
            <div className="side-btn" style={{ opacity: 0 }} />
          </>
        )}
      </div>

      <div className="result">
        {!shot && (
          <>
            <div className="section-label">분류</div>
            <div className="chip-row" style={{ marginBottom: 12 }}>
              {(Object.keys(MODE_LABEL) as Mode[]).map((m) => (
                <button
                  key={m}
                  className={`chip ${mode === m ? "active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  {MODE_LABEL[m]}
                </button>
              ))}
            </div>
            <div className="section-label">모델</div>
            <div className="chip-row" style={{ marginBottom: 14 }}>
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  className={`chip ${model === m.id ? "active" : ""}`}
                  onClick={() => setModel(m.id)}
                  title={m.sub}
                >
                  {m.label}
                  {m.tag && <span className="chip-tag"> {m.tag}</span>}
                </button>
              ))}
            </div>
          </>
        )}

        {error && <div className="err">{error}</div>}

        {messages.length === 0 && !loading && !error && (
          <div className="hint">
            아래 셔터를 눌러 일본어가 적힌 간판·메뉴판·상품을 찍어보세요.
            <br />
            AI가 한국어로 설명하고, 이어서 자유롭게 질문할 수 있어요.
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
            </div>
          </div>
        ))}

        {loading && (
          <div className="bubble-row assistant">
            <div className="bubble assistant">
              <span className="loading">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {showModelSheet && (
        <div
          className="sheet-backdrop"
          onClick={() => setShowModelSheet(false)}
        >
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">모델 선택</div>
            {MODELS.map((m) => (
              <button
                key={m.id}
                className={`sheet-row ${model === m.id ? "active" : ""}`}
                onClick={() => {
                  setModel(m.id);
                  setShowModelSheet(false);
                }}
              >
                <div className="sheet-row-main">
                  <span className="sheet-row-label">
                    {m.label}
                    {m.tag && <span className="chip-tag"> {m.tag}</span>}
                  </span>
                  <span className="sheet-row-sub">{m.sub}</span>
                </div>
                {model === m.id && <span className="sheet-check">✓</span>}
              </button>
            ))}
            <div className="sheet-title" style={{ marginTop: 8 }}>
              분류
            </div>
            {(Object.keys(MODE_LABEL) as Mode[]).map((m) => (
              <button
                key={m}
                className={`sheet-row compact ${mode === m ? "active" : ""}`}
                onClick={() => {
                  setMode(m);
                  setShowModelSheet(false);
                }}
              >
                <span className="sheet-row-label">{MODE_LABEL[m]}</span>
                {mode === m && <span className="sheet-check">✓</span>}
              </button>
            ))}
            <button
              className="sheet-close"
              onClick={() => setShowModelSheet(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {shot && messages.length > 0 && (
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
            placeholder="이어서 물어보기 (예: 맵기 어느 정도야?)"
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
            aria-label="보내기"
          >
            ↑
          </button>
        </form>
      )}
    </main>
  );
}

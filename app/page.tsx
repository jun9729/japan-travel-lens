"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Mode = "auto" | "menu" | "sign" | "product";

const MODE_LABEL: Record<Mode, string> = {
  auto: "자동 판별",
  menu: "메뉴판",
  sign: "간판/표지판",
  product: "상품",
};

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [ready, setReady] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<Mode>("auto");

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
      const msg =
        e instanceof Error ? e.message : "카메라를 열 수 없습니다.";
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

  const capture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    // 긴 변 1280 으로 다운스케일 (업로드 속도 & 토큰 절약)
    const maxSide = 1280;
    const scale = Math.min(1, maxSide / Math.max(w, h));
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
    setShot(dataUrl);
    setResult("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl, mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "분석에 실패했어요");
      setResult(data.text ?? "");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  const retake = useCallback(() => {
    setShot(null);
    setResult("");
    setError("");
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    } else {
      startCamera();
    }
  }, [startCamera]);

  return (
    <main className="app">
      <div className="camera-wrap">
        <div className="camera-overlay-top">
          <div className="logo">🇯🇵 여행 렌즈</div>
          <div className="badge">{MODE_LABEL[mode]}</div>
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
        <div className="chip-row" style={{ marginBottom: 14 }}>
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

        {error && <div className="err">{error}</div>}

        {loading && (
          <div className="result-card">
            <span className="loading">
              AI가 사진을 읽는 중
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </span>
          </div>
        )}

        {!loading && result && (
          <>
            <h2>설명</h2>
            <div className="result-card">{result}</div>
          </>
        )}

        {!loading && !result && !error && (
          <div className="hint">
            아래 셔터를 눌러 일본어가 적힌 간판·메뉴판·상품을 찍어보세요.
            <br />
            AI가 무엇인지 한국어로 설명해 줍니다.
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

type Stats = {
  bootedAt: string;
  uptimeSec: number;
  counters: Record<string, number>;
};

const LABELS: Record<string, string> = {
  page_view: "페이지 진입",
  scan_attempt: "촬영 시도",
  scan_success: "정상 분석 완료",
  scan_blurry: "흐릿 → 환불",
  scan_quota_block: "무료 한도 초과",
  scan_aborted: "사용자 취소",
  pay_create: "결제 시작",
  pay_capture: "결제 완료 ✅",
  pay_failed: "결제 실패",
  quota_check: "쿼터 조회",
};

export default function Admin() {
  const [key, setKey] = useState<string>("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string>("");
  const [auto, setAuto] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem("admin_key");
    if (saved) setKey(saved);
  }, []);

  useEffect(() => {
    if (!key) return;
    const fetchStats = async () => {
      try {
        const r = await fetch(`/api/stats?key=${encodeURIComponent(key)}`, {
          cache: "no-store",
        });
        const d = await r.json();
        if (!r.ok) {
          setError(d.error ?? "Error");
          setStats(null);
        } else {
          setStats(d);
          setError("");
          localStorage.setItem("admin_key", key);
        }
      } catch (e) {
        setError(String(e));
      }
    };
    fetchStats();
    if (!auto) return;
    const id = setInterval(fetchStats, 5000);
    return () => clearInterval(id);
  }, [key, auto]);

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 20px",
        color: "#f0f0f5",
        fontFamily: "ui-monospace, Menlo, monospace",
        height: "100dvh",
        overflow: "auto",
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>
        🌏 Travel Lens — Admin Stats
      </h1>

      <div
        style={{
          background: "#16161e",
          padding: 14,
          borderRadius: 10,
          marginBottom: 18,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <label style={{ fontSize: 12, color: "#8a8a95" }}>ADMIN_KEY</label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter admin key"
          style={{
            width: "100%",
            padding: 8,
            marginTop: 6,
            background: "#0a0a0f",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6,
            color: "#fff",
            fontFamily: "inherit",
          }}
        />
        <label
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: 8,
            fontSize: 12,
            color: "#8a8a95",
          }}
        >
          <input
            type="checkbox"
            checked={auto}
            onChange={(e) => setAuto(e.target.checked)}
          />
          5초마다 자동 갱신
        </label>
      </div>

      {error && (
        <div
          style={{
            background: "rgba(255,80,80,0.1)",
            border: "1px solid rgba(255,80,80,0.3)",
            color: "#ff9090",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {stats && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 18,
              fontSize: 13,
              color: "#a0a0aa",
            }}
          >
            <div>
              <div style={{ color: "#6a6a72", fontSize: 11 }}>BOOTED AT</div>
              <div>{stats.bootedAt}</div>
            </div>
            <div>
              <div style={{ color: "#6a6a72", fontSize: 11 }}>UPTIME</div>
              <div>
                {Math.floor(stats.uptimeSec / 60)}m {stats.uptimeSec % 60}s
              </div>
            </div>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <th style={{ textAlign: "left", padding: "10px 4px" }}>이벤트</th>
                <th style={{ textAlign: "right", padding: "10px 4px" }}>개수</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.counters).map(([k, v]) => (
                <tr
                  key={k}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <td style={{ padding: "10px 4px", color: "#d0d0dd" }}>
                    {LABELS[k] ?? k}
                    <span
                      style={{
                        color: "#5a5a65",
                        fontSize: 11,
                        marginLeft: 8,
                      }}
                    >
                      {k}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "10px 4px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: v > 0 ? "#4d8bff" : "#5a5a65",
                    }}
                  >
                    {v.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: 24,
              padding: 12,
              background: "rgba(255,170,0,0.06)",
              border: "1px solid rgba(255,170,0,0.2)",
              borderRadius: 8,
              fontSize: 12,
              color: "#ffcc66",
              lineHeight: 1.6,
            }}
          >
            ⚠ 이 카운터는 <strong>현재 서버 인스턴스 메모리</strong>에만 저장돼요.
            cold start (보통 30-60분 무사용) 시 0으로 리셋됩니다.
            <br />
            영구 통계는 Vercel Analytics 활성화 후 보세요:
            <br />
            <a
              href="https://vercel.com/jjlee9729-gmailcoms-projects/japan-travel-lens/analytics"
              target="_blank"
              rel="noopener"
              style={{ color: "#ffd166" }}
            >
              vercel.com → Analytics → Enable
            </a>
          </div>
        </>
      )}

      {!stats && !error && key && (
        <div style={{ color: "#6a6a72", fontSize: 13 }}>로딩 중...</div>
      )}
      {!key && (
        <div style={{ color: "#6a6a72", fontSize: 13 }}>
          ADMIN_KEY 를 입력하면 통계가 표시됩니다.
        </div>
      )}
    </div>
  );
}

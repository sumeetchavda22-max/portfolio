import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Sumit Chavda — Data Center & Infrastructure Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #070b14 0%, #0b1120 60%, #101a33 100%)",
          color: "#e6edf7",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(79,140,255,0.35), transparent 65%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, color: "#9aa8bd" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#34d399" }} />
          SUMIT.CHAVDA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Building, Monitoring &amp; Securing Modern IT Infrastructure.
          </div>
          <div style={{ fontSize: 28, color: "#9aa8bd" }}>
            Data Center Technical Support Engineer &amp; Infrastructure Engineer
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#22d3ee", letterSpacing: 2 }}>
          <span>INFRASTRUCTURE</span>
          <span style={{ color: "#64718a" }}>/</span>
          <span>CYBERSECURITY</span>
          <span style={{ color: "#64718a" }}>/</span>
          <span>MONITORING</span>
          <span style={{ color: "#64718a" }}>/</span>
          <span>AUTOMATION</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

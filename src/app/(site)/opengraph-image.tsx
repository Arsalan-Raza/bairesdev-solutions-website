import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BairesDev Solutions | Custom Software Development Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent line */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 3, backgroundColor: "#22d3ee" }} />
          <span style={{ color: "#22d3ee", fontSize: 13, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            BairesDev Solutions
          </span>
        </div>

        {/* Main heading */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Custom Software
            <br />
            <span style={{ color: "#22d3ee" }}>Built to Last.</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: 680,
            }}
          >
            Enterprise software engineering, AI systems, and digital transformation for global enterprises.
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 64,
            borderTop: "1px solid #27272a",
            paddingTop: 40,
          }}
        >
          {[
            ["500+", "Engineers"],
            ["1.2K", "Projects"],
            ["98%", "Retention"],
            ["12", "Global Offices"],
          ].map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#ffffff" }}>{value}</span>
              <span style={{ fontSize: 13, color: "#71717a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

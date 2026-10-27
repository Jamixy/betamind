import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "Betamind Technology — Premium Digital Agency";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image generated at the edge.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #020617 100%)",
          width:      "100%",
          height:     "100%",
          display:    "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding:    "60px",
          position:   "relative",
        }}
      >
        {/* Logo mark */}
        <div style={{
          width: 72, height: 72,
          background: "linear-gradient(135deg, #FA5A02, #FFA24C)",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          fontSize: 36,
          fontWeight: 700,
          color: "#ffffff",
        }}>
          B
        </div>

        {/* Company name */}
        <div style={{ fontSize: 20, color: "#94A3B8", marginBottom: 16, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          BETAMIND TECHNOLOGY
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 52,
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.1,
          marginBottom: 20,
          maxWidth: 900,
        }}>
          We Build Digital Products That Grow Businesses
        </div>

        {/* Sub */}
        <div style={{ fontSize: 22, color: "#64748B", textAlign: "center", maxWidth: 700 }}>
          Premium web agency · 130+ projects · 13+ countries
        </div>

        {/* Bottom gradient bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 4,
          background: "linear-gradient(90deg, #FA5A02, #FFA24C)",
        }} />
      </div>
    ),
    { ...size }
  );
}

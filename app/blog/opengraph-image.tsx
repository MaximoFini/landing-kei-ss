import { ImageResponse } from "next/og";

export const alt = "Blog · KEI Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Blog · KEI Software
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            color: "#d4d4d4",
          }}
        >
          Desarrollo de software, IA y automatización
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 26,
            color: "#8a8a8a",
          }}
        >
          Córdoba, Argentina
        </div>
      </div>
    ),
    { ...size },
  );
}

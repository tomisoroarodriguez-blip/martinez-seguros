import { ImageResponse } from "next/og";

export const alt = "Martínez Seguros — Protegemos lo que más importa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#183766", color: "#fff" }}>
        <div style={{ fontSize: 34, color: "#f8c36b" }}>Martínez Seguros</div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>Protegemos lo que más importa.</div>
        <div style={{ fontSize: 34, marginTop: 30, color: "#ffffffb0" }}>Corredores de seguros en todo Uruguay</div>
      </div>
    ),
    size,
  );
}

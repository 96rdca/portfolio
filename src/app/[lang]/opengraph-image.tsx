import { ImageResponse } from "next/og";
import { getLocalizedData } from "@/lib/data";
import { locales } from "@/lib/dictionaries";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = await getLocalizedData(lang as "en" | "es");
  const { name, title, tagline } = data.personal;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0f172a",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <span style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>
              {name.split(" ").map((w: string) => w[0]).join("")}
            </span>
          </div>
          <span
            style={{ color: "#94a3b8", fontSize: "20px", fontWeight: 500 }}
          >
            Portfolio
          </span>
        </div>

        <div
          style={{
            fontSize: "68px",
            fontWeight: 800,
            color: "#f8fafc",
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-1px",
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#10b981",
            marginBottom: "24px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: "900px",
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <span style={{ color: "#475569", fontSize: "18px" }}>
            {lang === "es" ? "Disponible para proyectos" : "Available for projects"}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

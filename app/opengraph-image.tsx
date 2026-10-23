import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "../data/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "assets/og-portrait.png"));
  const src = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#2443d6", color: "#ffffff" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 760 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#d4ff3a",
              color: "#0b0d11",
              fontSize: 24,
              padding: "10px 22px",
              borderRadius: 999,
              letterSpacing: 2,
            }}
          >
            OPEN TO INTERNSHIPS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>HARI CHANDRA</div>
            <div style={{ display: "flex", marginTop: 8 }}>
              <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1, background: "#d4ff3a", color: "#0b0d11", padding: "0 14px" }}>
                WIJAYA.
              </div>
            </div>
            <div style={{ fontSize: 30, marginTop: 32, lineHeight: 1.35, color: "rgba(255,255,255,0.9)" }}>
              Full-stack software with a numerical core.
            </div>
          </div>
          <div style={{ display: "flex", gap: 36, fontSize: 24, color: "rgba(255,255,255,0.85)" }}>
            <span>Feng Chia University</span>
            <span>Taichung, Taiwan</span>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, position: "relative", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: 999, background: "#d4ff3a", top: 70, right: 40 }} />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img tags */}
          <img src={src} width={400} height={500} alt="" style={{ position: "relative" }} />
        </div>
      </div>
    ),
    size,
  );
}

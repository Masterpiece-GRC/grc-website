import { ImageResponse } from "next/og";
import { brandName } from "@/lib/site";

export const alt = `${brandName} — governance, risk, compliance and information security consulting`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share image.
 *
 * Drawn from the approved palette only, in the same layered-navy idiom as the
 * site's dark sections. Champagne gold appears as a rule and an accent, never
 * as small text. No imagery of the kind the brand guidance rules out.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#071827",
          backgroundImage:
            "radial-gradient(1000px 620px at 82% 6%, rgba(52,102,112,0.55) 0%, rgba(7,24,39,0) 62%), radial-gradient(760px 520px at 4% 100%, rgba(14,75,79,0.55) 0%, rgba(7,24,39,0) 64%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Masterpiece
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
            <div style={{ width: 44, height: 2, backgroundColor: "#B89A5D" }} />
            <div style={{ fontSize: 18, letterSpacing: 5, color: "#C9D3DA" }}>GRC CONSULTING</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -1.6,
              maxWidth: 900,
            }}
          >
            Governance, risk, compliance and information security — made practical.
          </div>
          <div
            style={{
              marginTop: 32,
              height: 2,
              width: 260,
              backgroundImage: "linear-gradient(90deg, #B89A5D, rgba(184,154,93,0))",
            }}
          />
          <div style={{ marginTop: 30, fontSize: 26, color: "#C9D3DA", maxWidth: 880 }}>
            Practical controls, credible evidence and confident decisions.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

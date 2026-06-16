const BLACK = "#0A0A0A";
const DARK = "#1A1A1A";
const GRAY = "#888888";
const WHITE = "#FFFFFF";

export function Footer() {
  return (
    <footer
      style={{
        background: BLACK,
        borderTop: `1px solid ${DARK}`,
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/images/logo.png"
            alt="SetSpace"
            style={{ width: "30px", height: "30px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: WHITE,
              letterSpacing: "0.5px",
            }}
          >
            SetSpace
          </span>
        </div>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: GRAY,
          }}
        >
          © {new Date().getFullYear()} SetSpace. All rights reserved.
        </span>

        <a
          href="https://setspace.agency"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: WHITE,
            textDecoration: "none",
          }}
        >
          setspace.agency
        </a>
      </div>
    </footer>
  );
}

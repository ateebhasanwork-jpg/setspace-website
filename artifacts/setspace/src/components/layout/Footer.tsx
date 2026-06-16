const OFF_WHITE = "#F5F0EB";
const GRAY = "#888888";
const BORDER = "#2A2A2A";
const BLACK = "#0A0A0A";

export function Footer() {
  return (
    <footer style={{ background: BLACK, borderTop: `1px solid ${BORDER}`, padding: "32px 24px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: OFF_WHITE, letterSpacing: "2px" }}>
          SetSpace
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: GRAY }}>
          © {new Date().getFullYear()} SetSpace. All rights reserved.
        </span>
        <a href="https://setspace.agency" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: OFF_WHITE, textDecoration: "none" }}>
          setspace.agency
        </a>
      </div>
    </footer>
  );
}

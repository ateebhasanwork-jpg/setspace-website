const GRAY  = "#888888";
const WHITE = "#FFFFFF";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 24px",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE, marginBottom: "6px" }}>
            SetSpace
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY }}>
            Content &amp; Marketing Engine
          </div>
        </div>

        {/* Center */}
        <div style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY }}>
            © {new Date().getFullYear()} SetSpace. All rights reserved.
          </span>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "20px" }}>
          <a
            href="https://setspace.agency"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: WHITE, textDecoration: "none" }}
          >
            setspace.agency
          </a>
          <a
            href="https://www.instagram.com/setspaceagency"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: GRAY, display: "flex", alignItems: "center", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#2D8AFF")}
            onMouseLeave={e => (e.currentTarget.style.color = GRAY)}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

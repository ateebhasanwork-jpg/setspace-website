const BLACK  = "#0A0A0A";
const DARK   = "#1A1A1A";
const GRAY   = "#888888";
const WHITE  = "#FFFFFF";
const ORANGE = "#E84B1A";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="2" y="2" width="20" height="20" rx="0" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ background: BLACK, borderTop: `1px solid ${DARK}`, padding: "60px 24px" }}>
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "32px",
          alignItems: "center",
        }}
        className="footer-grid"
      >
        {/* Left */}
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE, letterSpacing: "3px", marginBottom: "8px" }}>
            SETSPACE
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY }}>
            Content &amp; Marketing Engine
          </div>
        </div>

        {/* Center */}
        <div style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY }}>
            © {new Date().getFullYear()} SetSpace. All rights reserved.
          </span>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "20px" }}>
          <a
            href="https://setspace.agency"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: WHITE, textDecoration: "none" }}
          >
            setspace.agency
          </a>
          <a
            href="https://www.instagram.com/setspaceagency"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: GRAY, display: "flex", alignItems: "center", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
            onMouseLeave={e => (e.currentTarget.style.color = GRAY)}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

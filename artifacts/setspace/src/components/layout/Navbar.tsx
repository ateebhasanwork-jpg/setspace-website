import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const BLACK   = "#0A0A0A";
const DARK    = "#1A1A1A";
const WHITE   = "#FFFFFF";
const ORANGE  = "#E84B1A";
const DIVIDER = "#E8E8E8";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: BLACK,
          borderBottom: scrolled ? `1px solid ${DARK}` : "1px solid transparent",
          transition: "border-color 0.3s",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: BLACK, lineHeight: 1 }}>S</span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE, letterSpacing: "3px" }}>
              SETSPACE
            </span>
          </a>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                background: BLACK,
                color: WHITE,
                border: `2px solid ${ORANGE}`,
                padding: "10px 22px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "2px",
                transition: "background 0.3s, color 0.3s",
                display: "inline-block",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = BLACK; }}
              onMouseLeave={e => { e.currentTarget.style.background = BLACK; e.currentTarget.style.color = WHITE; }}
            >
              Get Free Audit
            </a>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: "transparent", border: "none", color: WHITE, cursor: "pointer", padding: "4px", display: "flex" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 35,
            background: BLACK,
            paddingTop: "80px",
            paddingLeft: "24px",
            paddingRight: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "Services", id: "#services" },
              { label: "Work", id: "#work" },
              { label: "Pricing", id: "#pricing" },
              { label: "Team", id: "#team" },
            ].map(link => (
              <a
                key={link.label}
                href={link.id}
                onClick={e => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "32px",
                  color: WHITE,
                  textDecoration: "none",
                  padding: "16px 0",
                  borderBottom: `1px solid ${DARK}`,
                  display: "block",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div style={{ marginTop: "32px" }}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                background: ORANGE,
                color: BLACK,
                padding: "16px 0",
                textDecoration: "none",
                display: "block",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Get Free Audit
            </a>
          </div>
        </div>
      )}
    </>
  );
}

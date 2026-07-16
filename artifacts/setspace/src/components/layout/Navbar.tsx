import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const BLUE     = "#2D8AFF";
const WHITE    = "#FFFFFF";
const CALENDLY = "https://booking.setspace.agency/widget/bookings/ateeb-hasan-personal-calendar-dal-sdzhc";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
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
          padding: "16px 24px",
          transition: "padding 0.3s",
        }}
      >
        <div
          className="nav-pill"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
            padding: "0 24px",
            borderRadius: "32px",
            transition: "background 0.3s",
          }}
        >
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="SetSpace"
              style={{ width: "28px", height: "28px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", color: WHITE, letterSpacing: "0.5px" }}>
              SetSpace
            </span>
          </a>

          {/* Center nav links — desktop */}
          <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[
              { label: "Home", id: "#hero" },
              { label: "About", id: "#team" },
              { label: "Work", id: "#work" },
              { label: "Contact", id: "#cta" },
            ].map(link => (
              <a
                key={link.label}
                href={link.id}
                onClick={e => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                background: "linear-gradient(180deg, #509dff 0%, #2887ff 50%, #147cff 75%, #0a77ff 87.5%, #0071ff 100%)",
                color: WHITE,
                padding: "10px 24px",
                borderRadius: "26.5px",
                textDecoration: "none",
                border: "1px solid #1b1b1b",
                transition: "opacity 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 35,
            background: "rgba(5,5,5,0.97)",
            backdropFilter: "blur(20px)",
            paddingTop: "100px",
            paddingLeft: "32px",
            paddingRight: "32px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "Home", id: "#hero" },
              { label: "About", id: "#team" },
              { label: "Work", id: "#work" },
              { label: "Contact", id: "#cta" },
            ].map(link => (
              <a
                key={link.label}
                href={link.id}
                onClick={e => { e.preventDefault(); scrollTo(link.id); }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "28px",
                  color: WHITE,
                  textDecoration: "none",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                background: "linear-gradient(180deg, #509dff 0%, #0071ff 100%)",
                color: WHITE,
                padding: "16px 0",
                borderRadius: "32px",
                textDecoration: "none",
                display: "block",
                textAlign: "center",
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

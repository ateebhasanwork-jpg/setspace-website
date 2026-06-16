import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ContactModal } from "@/components/ContactModal";
import { Menu, X } from "lucide-react";

const BLACK = "#0A0A0A";
const WHITE = "#FFFFFF";
const GRAY = "#777777";
const DIVIDER = "#E8E8E8";
const ORANGE = "#E84B1A";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
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
          background: WHITE,
          borderBottom: scrolled ? `1px solid ${DIVIDER}` : "1px solid transparent",
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
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img
              src="/images/logo.png"
              alt="SetSpace"
              style={{ width: "36px", height: "36px", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                color: BLACK,
                letterSpacing: "0.5px",
              }}
            >
              SetSpace
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                background: BLACK,
                color: WHITE,
                border: "none",
                padding: "12px 20px",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Get Free Audit
            </a>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: "transparent", border: "none", color: BLACK, cursor: "pointer", padding: "4px", display: "flex" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 35,
            background: WHITE,
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
                  color: BLACK,
                  textDecoration: "none",
                  padding: "16px 0",
                  borderBottom: `1px solid ${DIVIDER}`,
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
                background: BLACK,
                color: WHITE,
                padding: "16px 0",
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

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}

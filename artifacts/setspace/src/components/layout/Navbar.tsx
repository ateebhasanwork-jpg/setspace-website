import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ContactModal } from "@/components/ContactModal";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#E84B1A";
const BLACK = "#0A0A0A";
const OFF_WHITE = "#F5F0EB";
const GRAY = "#888888";
const BORDER = "#2A2A2A";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Pricing", href: "#pricing" },
  { name: "Team", href: "#team" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/" || location === "";

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollTo = (href: string) => {
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/${href}`);
    }
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
          borderBottom: scrolled ? `1px solid ${ORANGE}` : `1px solid transparent`,
          transition: "border-color 0.3s ease",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src="/images/logo.png" alt="Setspace" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: OFF_WHITE, letterSpacing: "2px" }}>SetSpace</span>
          </Link>

          <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: GRAY, textDecoration: "none", letterSpacing: "0.5px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = GRAY)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setContactOpen(true)}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "1px", background: ORANGE, color: BLACK, border: "none", padding: "10px 24px", cursor: "pointer", display: "inline-block" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Get Free Audit
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: "transparent", border: "none", color: OFF_WHITE, cursor: "pointer", padding: "4px" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ position: "fixed", inset: 0, zIndex: 30, background: BLACK, paddingTop: "80px", paddingLeft: "24px", paddingRight: "24px", display: "flex", flexDirection: "column" }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "24px" }}>
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); setMobileOpen(false); }}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: OFF_WHITE, textDecoration: "none", letterSpacing: "2px", lineHeight: 1.1, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                  onMouseLeave={e => (e.currentTarget.style.color = OFF_WHITE)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: `1px solid ${BORDER}` }}>
              <button
                onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1px", background: ORANGE, color: BLACK, border: "none", padding: "14px 40px", cursor: "pointer", width: "100%" }}
              >
                Get Free Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}

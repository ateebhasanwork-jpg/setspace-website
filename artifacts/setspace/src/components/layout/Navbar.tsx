import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const LANG_LABELS: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };
const LANG_ORDER: Lang[] = ["en", "fr", "ar"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [location] = useLocation();
  const isHome = location === "/" || location === "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.work, href: "#work" },
    { name: t.nav.process, href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: t.nav.team, href: "#team" },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHome) {
      scrollTo(href);
    } else {
      window.location.assign(`/${href}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Setspace logo"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-display font-bold tracking-widest text-xl uppercase">SETSPACE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-7 text-sm font-medium text-foreground/60">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-foreground transition-colors duration-200"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 ms-2">
              {/* Dark / Light toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-all"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Language picker */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-1.5 w-auto px-2.5 h-8 rounded-lg text-sm font-semibold text-foreground/60 hover:text-foreground hover:bg-muted transition-all"
                >
                  <Globe size={14} />
                  {LANG_LABELS[lang]}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 end-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[90px] z-50"
                    >
                      {LANG_ORDER.map(l => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`w-full text-start px-4 py-2.5 text-sm font-medium transition-colors ${
                            lang === l
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-foreground/70 hover:text-foreground"
                          }`}
                        >
                          {l === "en" ? "🇬🇧 English" : l === "fr" ? "🇫🇷 Français" : "🇸🇦 العربية"}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button size="sm" onClick={() => setContactOpen(true)} className="ms-1">
                {t.nav.startProject}
              </Button>
            </div>
          </nav>

          {/* Mobile right controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground/60 hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center text-foreground/80 hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-0 z-30 bg-background/97 backdrop-blur-xl pt-20 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-5 text-2xl font-display mt-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={(e) => { handleNavClick(e, link.href); setMobileMenuOpen(false); }}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Language switcher in mobile */}
            <div className="mt-10 flex gap-3">
              {LANG_ORDER.map(l => (
                <button
                  key={l}
                  onClick={() => { setLang(l); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    lang === l
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <Button
                size="lg"
                className="w-full"
                onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
              >
                {t.nav.startProject}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, Check, ArrowRight, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ── PALETTE ── */
const BLACK    = "#0A0A0A";
const WHITE    = "#FFFFFF";
const OFF_WHITE = "#F5F0EB";
const ORANGE   = "#E84B1A";
const GRAY     = "#777777";
const GRAY2    = "#888888";
const LT_GRAY  = "#E8E8E8";
const DK_GRAY  = "#1A1A1A";
const BORDER_DK = "#2A2A2A";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";
const MAX_W    = "1140px";
const SEC_PAD  = "140px 24px";

/* ── HERO VIDEOS ── */
const HERO_VIDEOS = ["W4Y0a2cz28E", "Ssi2F5K2yaE", "w2U15wziQcw"];

/* ── PORTFOLIO DATA ── */
const portfolioItems = [
  { id: 1,  title: "Wellness Brand Video",       client: "Wellness Coach",           category: "YouTube", videoId: "kvbTfcAIymU" },
  { id: 2,  title: "YouTube Long-Form Edit",      client: "Unexpected Atlanta Tours", category: "YouTube", videoId: "VysdDxP_oPo" },
  { id: 3,  title: "Testimonials Compilation",    client: "Iron Master Awards",       category: "YouTube", videoId: "bWmb_8dzgTk" },
  { id: 4,  title: "Promotional Video",           client: "Kyle",                     category: "YouTube", videoId: "HBejF0eQ2TA" },
  { id: 5,  title: "Talking Head Reel",           client: "Dr Lindsey",               category: "Reels",   videoId: "8iaVENpFw0I" },
  { id: 6,  title: "Podcast Short Clip",          client: "A Steady Space",           category: "Reels",   videoId: "W4Y0a2cz28E" },
  { id: 7,  title: "Gym Lifestyle Reel",          client: "Muhammad Helal",           category: "Reels",   videoId: "gkaBUIK-Y_U" },
  { id: 8,  title: "Informative Reel",            client: "Faceless Creator",         category: "Reels",   videoId: "oamKPmEShfo" },
  { id: 9,  title: "Brand Reel",                  client: "Klinik Europe",            category: "Reels",   videoId: "sum7TRFh28k" },
  { id: 10, title: "Fitness Content Reel",        client: "Creator",                  category: "Reels",   videoId: "l5_OVdR_MWo" },
  { id: 11, title: "Explainer Ad",                client: "CyberCube",                category: "Ads",     videoId: "IZo8Txy26xg" },
  { id: 12, title: "UGC Ad",                      client: "Beast",                    category: "Ads",     videoId: "EPi8_QC6ULE" },
  { id: 13, title: "Meta Ad Creative",            client: "Flagship Media",           category: "Ads",     videoId: "4louAvpt_W0" },
  { id: 14, title: "AI Brand Video",              client: "Setspace",                 category: "AI",      videoId: "kQJRCMOGjvA" },
  { id: 15, title: "AI Product Showcase",         client: "Tech Brand",               category: "AI",      videoId: "NWxk_O1Zf6Q" },
  { id: 16, title: "Motion Graphics Package",     client: "SBD Canada",               category: "AI",      videoId: "D7gJMWCYMqc" },
];
const CATS = ["All", "YouTube", "Reels", "Ads", "AI"];

/* ── TEAM ── */
const teamMembers = [
  { name: "Zoha Adnan",      role: "Lead Gen Executive",         img: "zoha.jpeg" },
  { name: "Jaffer Naqvi",    role: "Video Designer",             img: "jaffer.jpeg" },
  { name: "Sani e Zehra",    role: "Social Media Designer",      img: "sani.jpeg" },
  { name: "Muhammad Ashhad", role: "Video Editor",               img: "ashad.jpeg" },
  { name: "Laiba Malik",     role: "HR & Ops Executive",         img: "laiba.jpeg" },
  { name: "Zayd Saleem",     role: "Explainer Video Specialist", img: "zayd.jpeg" },
];

/* ── UTILS ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function CountUp({ to, suffix = "", duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useInView(0.2);
  const started = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: ORANGE, marginBottom: "24px" }}>
      {children}
    </div>
  );
}

const CYCLE_STATEMENTS = ["We handle the content.", "You handle the clients.", "That's the deal."];
const TICKER_CONTENT = ["SetSpace", "Content Production", "Reels", "Landing Pages", "Email Sequences", "Strategy", "Wellness Marketing", "Done For You", "Mental Health", "Coaches", "Therapists"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [hovered, setHovered] = useState<typeof portfolioItems[0] | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cycleIdx, setCycleIdx] = useState(0);
  const [cycleVisible, setCycleVisible] = useState(true);
  const [blueprintEmail, setBlueprintEmail] = useState("");
  const [blueprintStatus, setBlueprintStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filtered = activeTab === "All" ? portfolioItems : portfolioItems.filter(p => p.category === activeTab);

  /* Cursor */
  useEffect(() => {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("cursor-ready");

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };
    document.addEventListener("mousemove", onMove);

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onEnter = () => ring.classList.add("hovered");
    const onLeave = () => ring.classList.remove("hovered");
    const interactables = document.querySelectorAll("a, button, [role='button']");
    interactables.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.body.removeChild(dot);
      document.body.removeChild(ring);
      document.body.classList.remove("cursor-ready");
    };
  }, []);

  /* Rotating statement */
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleVisible(false);
      setTimeout(() => {
        setCycleIdx(i => (i + 1) % CYCLE_STATEMENTS.length);
        setCycleVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* Blueprint form */
  const handleBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blueprintEmail) return;
    setBlueprintStatus("loading");
    try {
      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: blueprintEmail }),
      });
      if (res.ok) {
        setBlueprintStatus("success");
        setBlueprintEmail("");
      } else {
        setBlueprintStatus("error");
      }
    } catch {
      setBlueprintStatus("error");
    }
  };

  return (
    <div style={{ background: BLACK, color: WHITE, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section style={{ background: BLACK, minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-grid">

            {/* LEFT */}
            <div className="hero-left">
              {/* Animated label */}
              <div className="fade-word" style={{ animationDelay: "0s", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "4px", color: ORANGE, marginBottom: "32px", display: "block", opacity: 0 }}>
                Content &amp; Marketing Engine
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(44px, 6vw, 80px)", lineHeight: 1.05, margin: "0 0 24px" }}>
                <div>
                  {["We", "build", "your", "marketing", "engine."].map((w, i) => (
                    <span key={i} className="fade-word" style={{ animationDelay: `${0.1 + i * 0.1}s`, color: WHITE }}>{w} </span>
                  ))}
                </div>
                <div>
                  {["You", "focus", "on", "your", "clients."].map((w, i) => (
                    <span key={i} className="fade-word" style={{ animationDelay: `${0.6 + i * 0.1}s`, color: ORANGE }}>{w} </span>
                  ))}
                </div>
              </h1>

              {/* Sub */}
              <p className="hero-sub-text" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: GRAY, maxWidth: "480px", margin: "0 0 40px", lineHeight: 1.7, textAlign: "center" }}>
                Done-for-you content and marketing for therapists, counselors, coaches, and wellness professionals.
              </p>

              {/* Buttons */}
              <div className="hero-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "40px" }}>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    background: ORANGE,
                    color: BLACK,
                    padding: "14px 24px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    display: "inline-block",
                    transition: "filter 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Get Free Audit
                </a>
                <a
                  href="#blueprint"
                  onClick={e => { e.preventDefault(); document.querySelector("#blueprint")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    background: "transparent",
                    color: WHITE,
                    border: `2px solid ${WHITE}`,
                    padding: "14px 24px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    display: "inline-block",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = WHITE; e.currentTarget.style.color = BLACK; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = WHITE; }}
                >
                  Download Free Framework
                </a>
              </div>

              {/* Orange accent line */}
              <div style={{ width: "40px", height: "2px", background: ORANGE, marginBottom: "40px" }} className="hero-cta-row" />

              {/* Ticker */}
              <div style={{ borderTop: `1px solid ${BORDER_DK}`, borderBottom: `1px solid ${BORDER_DK}`, overflow: "hidden" }}>
                <div className="ticker-track">
                  {[0, 1].map(rep => (
                    <span key={rep} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                      {TICKER_CONTENT.map((item, i) => (
                        <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: WHITE, padding: "12px 20px", display: "inline-block" }}>
                          {item}<span style={{ marginLeft: "20px", color: ORANGE }}>·</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — video frames */}
            <div className="hero-mockups" aria-hidden="true">
              <div style={{ position: "relative", height: "460px", width: "420px" }}>
                {/* Left frame */}
                <div
                  className="frame-float-left"
                  style={{ position: "absolute", top: "40px", left: "0px", width: "180px", height: "320px", border: `2px solid #333333`, background: "#111111", overflow: "hidden", zIndex: 1 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${HERO_VIDEOS[0]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[0]}&mute=1`}
                    title="Client reel 1"
                    allow="autoplay; encrypted-media"
                    style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
                  />
                </div>
                {/* Center frame — larger, orange border */}
                <div
                  className="frame-float-center"
                  style={{ position: "absolute", top: "20px", left: "100px", width: "200px", height: "355px", border: `2px solid ${ORANGE}`, background: "#111111", overflow: "hidden", zIndex: 3 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${HERO_VIDEOS[1]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[1]}&mute=1`}
                    title="Client reel 2"
                    allow="autoplay; encrypted-media"
                    style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
                  />
                </div>
                {/* Right frame */}
                <div
                  className="frame-float-right"
                  style={{ position: "absolute", top: "40px", left: "220px", width: "180px", height: "320px", border: `2px solid #333333`, background: "#111111", overflow: "hidden", zIndex: 2 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${HERO_VIDEOS[2]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[2]}&mute=1`}
                    title="Client reel 3"
                    allow="autoplay; encrypted-media"
                    style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR — orange
      ═══════════════════════════════════════════ */}
      <section style={{ background: ORANGE, padding: "60px 24px" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }}>
          {[
            { to: 160, suffix: "+", label: "Clients Helped" },
            { to: 1000, suffix: "+", label: "Content Pieces Produced" },
            { to: 3, suffix: " Years", label: "In Production" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 24px", borderRight: i < 2 ? `1px solid rgba(0,0,0,0.2)` : "none" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", color: BLACK, lineHeight: 1 }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.7)", marginTop: "10px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════ */}
      <section id="services" style={{ background: OFF_WHITE, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <Label>What We Do</Label>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 56px)", color: BLACK, lineHeight: 1.1, maxWidth: "600px", margin: "0 0 24px" }}>
              Everything you need to grow online
            </h2>
          </FadeUp>

          {/* Rotating statement */}
          <FadeUp delay={0.1}>
            <div style={{ marginBottom: "64px", minHeight: "36px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: ORANGE, margin: 0, opacity: cycleVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
                {CYCLE_STATEMENTS[cycleIdx]}
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0" }}>
            {[
              { num: "01", title: "Content Production", desc: "Video editing, reels, and short-form content delivered every month — consistently and on-brand, without you lifting a finger." },
              { num: "02", title: "Landing Pages", desc: "High-converting pages designed and built for your practice — capture leads and book sessions on autopilot." },
              { num: "03", title: "Email Nurture Sequences", desc: "Automated email flows that turn viewers into booked sessions — written, designed, and delivered." },
              { num: "04", title: "Content Strategy", desc: "A clear monthly plan for what to post, when, and why — built around your audience and your goals." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  className="service-card"
                  style={{
                    borderTop: `3px solid ${ORANGE}`,
                    padding: "40px",
                    paddingLeft: i % 2 === 1 ? "40px" : "0",
                    paddingRight: i % 2 === 0 ? "56px" : "40px",
                    borderLeft: i % 2 === 1 ? `1px solid ${LT_GRAY}` : "none",
                  }}
                >
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "2px", color: ORANGE }}>
                    {item.num}
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: BLACK, margin: "16px 0 8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHO WE HELP — dark
      ═══════════════════════════════════════════ */}
      <section style={{ background: BLACK, padding: SEC_PAD, position: "relative", overflow: "hidden" }}>
        {/* WELLNESS watermark */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(60px, 14vw, 180px)", color: "rgba(255,255,255,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
          WELLNESS
        </div>

        <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <Label>Who We Help</Label>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 56px)", color: WHITE, lineHeight: 1.1, margin: "0 0 64px" }}>
              Built for wellness professionals
            </h2>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }}>
            {[
              { title: "Therapists & Counselors", desc: "Build trust online, attract ideal clients, and stay consistent without adding hours to your week." },
              { title: "Wellness Coaches & Online Coaches", desc: "Turn your expertise into compelling content that grows your audience and fills your calendar with qualified leads." },
              { title: "Mental Health Practitioners", desc: "Grow your practice with professional content that reflects the care and quality you bring to every session." },
            ].map((col, i) => (
              <FadeUp key={i} delay={i * 0.2}>
                <div style={{ borderLeft: i > 0 ? `1px solid ${BORDER_DK}` : "none", paddingLeft: i > 0 ? "48px" : "0", paddingRight: i < 2 ? "48px" : "0" }}>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: WHITE, marginBottom: "16px" }}>
                    {col.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.7, margin: 0 }}>
                    {col.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTFOLIO — selected work
      ═══════════════════════════════════════════ */}
      <section id="work" style={{ background: OFF_WHITE, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", marginBottom: "56px" }}>
              <div>
                <Label>Selected Work</Label>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 48px)", color: BLACK, margin: 0 }}>Proof of performance.</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {CATS.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      padding: "8px 18px",
                      background: activeTab === cat ? BLACK : WHITE,
                      color: activeTab === cat ? WHITE : GRAY,
                      border: `1px solid ${activeTab === cat ? BLACK : LT_GRAY}`,
                      cursor: "none",
                      transition: "all 0.18s",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "48px", alignItems: "start" }}>
            <div>
              <div style={{ borderTop: `1px solid ${LT_GRAY}`, maxHeight: "520px", overflowY: "auto" }} className="hide-scrollbar">
                {filtered.map((item, i) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                    style={{ display: "flex", alignItems: "center", gap: "20px", padding: "18px 0", borderBottom: `1px solid ${LT_GRAY}`, cursor: "none", background: hovered?.id === item.id ? "#EDEAE6" : "transparent", transition: "background 0.15s" }}
                  >
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: LT_GRAY, width: "28px", flexShrink: 0, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: BLACK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: GRAY, marginTop: "2px" }}>{item.client}</div>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${LT_GRAY}`, color: GRAY, flexShrink: 0 }}>
                      {item.category}
                    </span>
                    <div style={{ width: "32px", height: "32px", border: `1px solid ${LT_GRAY}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: hovered?.id === item.id ? BLACK : "transparent", transition: "background 0.18s" }}>
                      <Play style={{ width: "11px", height: "11px", color: hovered?.id === item.id ? WHITE : GRAY, marginLeft: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "sticky", top: "88px" }}>
              <div style={{ aspectRatio: "16/9", background: "#EDEAE6", border: `1px solid ${LT_GRAY}`, overflow: "hidden", position: "relative" }}>
                {hovered ? (
                  <>
                    <img
                      key={hovered.videoId}
                      src={`https://img.youtube.com/vi/${hovered.videoId}/maxresdefault.jpg`}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${hovered.videoId}/hqdefault.jpg`; }}
                      alt={hovered.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ORANGE, marginBottom: "4px" }}>{hovered.client}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: WHITE }}>{hovered.title}</div>
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                      <div style={{ width: "52px", height: "52px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Play style={{ width: "18px", height: "18px", color: WHITE, marginLeft: "3px" }} fill={WHITE} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", color: GRAY }}>
                    <Play style={{ width: "20px", height: "20px", color: GRAY }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>Hover to preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <motion.div initial={{ scale: 0.97 }} animate={{ scale: 1 }} exit={{ scale: 0.97 }} onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "880px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: WHITE }}>{activeVideo.title}</span>
                <button onClick={() => setActiveVideo(null)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "28px", color: GRAY, background: "none", border: "none", lineHeight: 1 }}>×</button>
              </div>
              <div style={{ position: "relative", aspectRatio: "16/9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          PACKAGES — pricing
      ═══════════════════════════════════════════ */}
      <section id="pricing" style={{ background: OFF_WHITE, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <Label>Pricing</Label>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: BLACK, maxWidth: "700px", margin: "0 0 16px", lineHeight: 1.2 }}>
              No retainer traps. No agency fluff. Just content that works.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: GRAY, margin: "0 0 72px" }}>
              Simple, transparent packages. No hidden fees.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", alignItems: "start" }}>
            {[
              {
                name: "Starter", price: "$800", period: "/mo",
                desc: "For wellness professionals getting started with consistent content.",
                features: ["8 reels / month", "Content strategy", "Basic social media management"],
                dark: false,
              },
              {
                name: "Growth", price: "$1,500", period: "/mo",
                desc: "For growing practices ready to expand content and capture leads.",
                features: ["12 reels + 6 designs / month", "Content strategy", "Landing page (one-time setup)", "Email nurture sequence (3 emails)"],
                dark: true, popular: true,
              },
              {
                name: "Full Engine", price: "$2,500", period: "/mo",
                desc: "A complete done-for-you content and marketing operation.",
                features: ["Full content production", "Strategy + landing page", "Full email nurture sequence", "Monthly performance review"],
                dark: false,
              },
            ].map((plan, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  className="pricing-card"
                  style={{ background: plan.dark ? BLACK : WHITE, border: `2px solid ${plan.dark ? BLACK : LT_GRAY}`, padding: "40px", position: "relative", display: "flex", flexDirection: "column" }}
                >
                  {plan.popular && (
                    <div style={{ position: "absolute", top: 0, left: "40px", background: ORANGE, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", padding: "4px 12px", transform: "translateY(-100%)", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: plan.dark ? GRAY2 : GRAY, marginBottom: "20px" }}>{plan.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "14px" }}>
                      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "48px", color: plan.dark ? WHITE : BLACK, lineHeight: 1 }}>{plan.price}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: plan.dark ? GRAY2 : GRAY }}>{plan.period}</span>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: plan.dark ? GRAY2 : GRAY, lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", flex: 1 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                        <ArrowRight style={{ width: "14px", height: "14px", color: ORANGE, marginTop: "1px", flexShrink: 0 }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: plan.dark ? GRAY2 : GRAY, lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      background: plan.dark ? ORANGE : "transparent",
                      color: plan.dark ? BLACK : BLACK,
                      border: `2px solid ${plan.dark ? ORANGE : BLACK}`,
                      padding: "14px 0",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      transition: "all 0.18s",
                    }}
                    onMouseEnter={e => { if (!plan.dark) { e.currentTarget.style.background = BLACK; e.currentTarget.style.color = WHITE; } }}
                    onMouseLeave={e => { if (!plan.dark) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BLACK; } }}
                  >
                    Get Started
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SOCIAL PROOF STRIP — dark
      ═══════════════════════════════════════════ */}
      <section style={{ background: BLACK, padding: "60px 24px", borderTop: `1px solid ${DK_GRAY}`, borderBottom: `1px solid ${DK_GRAY}` }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(18px, 3vw, 24px)", color: WHITE, lineHeight: 1.6, margin: "0 0 20px" }}>
              "Communication was always clear and smooth. He regularly contributed ideas and suggestions instead of just executing tasks — it felt like a true collaboration."
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: ORANGE, margin: "0 0 48px" }}>
              Philipp F. — Finance Creator, YouTube
            </p>

            {/* Stat pills */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0" }}>
              {[
                { val: "4.9★", label: "Average Rating" },
                { val: "160+", label: "Clients" },
                { val: "1,000+", label: "Content Pieces" },
                { val: "3 Years", label: "In Business" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0" }}>
                  {i > 0 && <div style={{ width: "1px", height: "20px", background: BORDER_DK, margin: "0 20px" }} />}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY2 }}>
                    <span style={{ color: WHITE, fontWeight: 600 }}>{s.val}</span> {s.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT / TEAM
      ═══════════════════════════════════════════ */}
      <section id="team" style={{ background: OFF_WHITE, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Left */}
            <FadeUp>
              <Label>About SetSpace</Label>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)", color: BLACK, lineHeight: 1.15, margin: "0 0 32px", maxWidth: "480px" }}>
                A remote team built for wellness professionals
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: GRAY, lineHeight: 1.8, marginBottom: "48px" }}>
                We help therapists, counselors, coaches, and wellness professionals generate leads and grow online. We handle strategy, video editing, reels, landing pages, and email nurture sequences — so you can focus on your clients.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: LT_GRAY }}>
                {[
                  { value: "160+", label: "Clients Helped" },
                  { value: "1,000+", label: "Content Pieces" },
                  { value: "3 Years", label: "In Production" },
                  { value: "4.9★", label: "Average Rating" },
                ].map((s, i) => (
                  <div key={i} style={{ background: OFF_WHITE, padding: "24px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "28px", color: BLACK, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: GRAY, marginTop: "6px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right — photos */}
            <FadeUp delay={0.15}>
              <div style={{ position: "relative", marginBottom: "8px" }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                  alt="Ateeb Hasan — Founder"
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", border: `2px solid ${BLACK}` }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)", padding: "32px 20px 16px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE }}>Ateeb Hasan</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY2, marginTop: "2px" }}>Founder & Creative Lead</div>
                </div>
              </div>
              <div className="team-grid">
                {teamMembers.map(m => (
                  <div key={m.name} style={{ width: "100%", aspectRatio: "1", overflow: "hidden", border: `2px solid ${BLACK}` }}>
                    <img
                      src={`${import.meta.env.BASE_URL}images/${m.img}`}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ background: OFF_WHITE, borderTop: `1px solid ${LT_GRAY}`, padding: SEC_PAD }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeUp>
            <Label>FAQ</Label>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 48px)", color: BLACK, margin: "0 0 56px" }}>Common questions</h2>
          </FadeUp>
          {[
            { q: "What kinds of clients do you work with?", a: "Therapists, counselors, wellness coaches, and service-based professionals who need consistent content and marketing without managing an in-house team. If you want to grow online while focusing on your clients — we're a good fit." },
            { q: "How does the process work?", a: "You share your goals, existing content, and brand references. We build a content plan, start producing, and deliver on a set schedule every month. You review, approve, and publish — or we handle that too." },
            { q: "What's the turnaround time?", a: "Reels and short clips are delivered within 48 hours. Long-form video edits within 72 hours. On the Full Engine plan, same-day delivery is available for urgent content." },
            { q: "How do revisions work?", a: "You review via Google Drive or Frame.io and leave comments. We turn around revisions within 24 hours. Starter includes 3 revisions per piece; Growth and Full Engine include unlimited." },
            { q: "Is there a contract?", a: "No lock-in contracts. We work month-to-month. We believe results are the only reason to stay — if we're not delivering, you shouldn't be billed." },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${LT_GRAY}` }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", background: "none", border: "none", gap: "24px", textAlign: "left" }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: BLACK, lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "22px", color: ORANGE, flexShrink: 0, lineHeight: 1, fontWeight: 400 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.75, paddingBottom: "24px", margin: 0 }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BLUEPRINT DOWNLOAD — dark
      ═══════════════════════════════════════════ */}
      <section id="blueprint" style={{ background: BLACK, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            {/* Left */}
            <FadeUp>
              <Label>Free Resource</Label>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)", color: WHITE, lineHeight: 1.15, margin: "0 0 20px" }}>
                The Scroll to Client Framework
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: GRAY, lineHeight: 1.8, marginBottom: "40px" }}>
                Find out exactly why your content isn't converting — and what to do about it. Free for therapists, coaches, and wellness professionals.
              </p>

              {/* Bullet points — 2 col */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px", marginBottom: "40px" }}>
                {[
                  "The Scroll to Client Funnel",
                  "The Content Pattern Audit",
                  "The MOFU Gap explained",
                  "The Winning Content Formula",
                  "Production Quality Checklist",
                  "Your 30-Day Content System",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: ORANGE, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: GRAY, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Email form */}
              <form onSubmit={handleBlueprint}>
                <input
                  type="email"
                  value={blueprintEmail}
                  onChange={e => setBlueprintEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{ width: "100%", background: DK_GRAY, border: `1px solid #333333`, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: "15px", padding: "14px 16px", marginBottom: "12px", outline: "none" }}
                />
                <button
                  type="submit"
                  disabled={blueprintStatus === "loading" || blueprintStatus === "success"}
                  style={{ width: "100%", background: blueprintStatus === "success" ? "#2A7A2A" : ORANGE, color: BLACK, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", padding: "16px", border: "none", textTransform: "uppercase", letterSpacing: "1px", transition: "filter 0.2s" }}
                >
                  {blueprintStatus === "loading" ? "Sending..." : blueprintStatus === "success" ? "Sent! Check your inbox." : blueprintStatus === "error" ? "Try again" : "Send Me the Framework"}
                </button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: GRAY, textAlign: "center", marginTop: "12px" }}>
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </FadeUp>

            {/* Right — PDF mockup */}
            <FadeUp delay={0.15}>
              <div style={{ position: "relative" }}>
                <div
                  style={{ background: "#111111", border: `1px solid #222222`, padding: "48px 40px", position: "relative", overflow: "hidden" }}
                  className="frame-float-center"
                >
                  {/* Orange left accent */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: ORANGE }} />
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "3px", color: ORANGE, marginBottom: "32px" }}>
                    Free Framework
                  </div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 28px)", color: WHITE, lineHeight: 1.3, marginBottom: "16px" }}>
                    THE SCROLL TO CLIENT FRAMEWORK
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: ORANGE, marginBottom: "48px" }}>
                    By SetSpace
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {["Content Funnel", "Pattern Audit", "MOFU Gap", "Content Formula"].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "20px", height: "1px", background: ORANGE }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY2 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — orange
      ═══════════════════════════════════════════ */}
      <section id="cta" style={{ background: ORANGE, padding: SEC_PAD, textAlign: "center" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.6)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "32px" }}>
              Trusted by 160+ therapists, counselors, and wellness coaches worldwide.
            </p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(36px, 6vw, 64px)", color: BLACK, lineHeight: 1.08, margin: "0 auto 20px", maxWidth: "800px" }}>
              Ready to build your marketing engine?
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", color: "rgba(0,0,0,0.7)", marginBottom: "48px", maxWidth: "560px", margin: "0 auto 48px" }}>
              Book a free 20-minute audit call. No pitch, no pressure — just honest feedback.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", background: BLACK, color: WHITE, padding: "16px 40px", textDecoration: "none", display: "inline-block", textTransform: "uppercase", letterSpacing: "2px", transition: "transform 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Book Free Audit
            </a>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.5)", marginTop: "20px" }}>
              We respond within 24 hours.
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />

      {/* ═══════════════════════════════════════════
          STICKY CTA — bottom right
      ═══════════════════════════════════════════ */}
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta hidden md:flex"
        title="Book Free Audit"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 30,
          width: "60px",
          height: "60px",
          background: ORANGE,
          color: BLACK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          transition: "transform 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Phone style={{ width: "22px", height: "22px" }} />
      </a>
    </div>
  );
}

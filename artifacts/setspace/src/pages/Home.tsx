import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, ArrowRight, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ── PALETTE (Figma) ── */
const BLACK    = "#050505";
const WHITE    = "#FAFAFA";
const BLUE     = "#2D8AFF";
const BLUE2    = "#0071FF";
const GRAY     = "#C9C9C9";
const GRAY2    = "#888888";
const BORDER   = "rgba(255,255,255,0.08)";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";
const MAX_W    = "1200px";
const SEC_PAD  = "120px 24px";

/* ── VIDEO IDS ── */
const HERO_VIDEOS = ["W4Y0a2cz28E", "Ssi2F5K2yaE", "w2U15wziQcw"];

/* ── PORTFOLIO ── */
const portfolioItems = [
  { id: 1,  title: "Wellness Brand Video",     client: "Wellness Coach",           category: "YouTube", videoId: "kvbTfcAIymU" },
  { id: 2,  title: "YouTube Long-Form Edit",   client: "Unexpected Atlanta Tours", category: "YouTube", videoId: "VysdDxP_oPo" },
  { id: 3,  title: "Testimonials Compilation", client: "Iron Master Awards",       category: "YouTube", videoId: "bWmb_8dzgTk" },
  { id: 4,  title: "Promotional Video",        client: "Kyle",                     category: "YouTube", videoId: "HBejF0eQ2TA" },
  { id: 5,  title: "Talking Head Reel",        client: "Dr Lindsey",               category: "Reels",   videoId: "8iaVENpFw0I" },
  { id: 6,  title: "Podcast Short Clip",       client: "A Steady Space",           category: "Reels",   videoId: "W4Y0a2cz28E" },
  { id: 7,  title: "Gym Lifestyle Reel",       client: "Muhammad Helal",           category: "Reels",   videoId: "gkaBUIK-Y_U" },
  { id: 8,  title: "Informative Reel",         client: "Faceless Creator",         category: "Reels",   videoId: "oamKPmEShfo" },
  { id: 9,  title: "Brand Reel",               client: "Klinik Europe",            category: "Reels",   videoId: "sum7TRFh28k" },
  { id: 10, title: "Fitness Content Reel",     client: "Creator",                  category: "Reels",   videoId: "l5_OVdR_MWo" },
  { id: 11, title: "Explainer Ad",             client: "CyberCube",                category: "Ads",     videoId: "IZo8Txy26xg" },
  { id: 12, title: "UGC Ad",                   client: "Beast",                    category: "Ads",     videoId: "EPi8_QC6ULE" },
  { id: 13, title: "Meta Ad Creative",         client: "Flagship Media",           category: "Ads",     videoId: "4louAvpt_W0" },
  { id: 14, title: "AI Brand Video",           client: "Setspace",                 category: "AI",      videoId: "kQJRCMOGjvA" },
  { id: 15, title: "AI Product Showcase",      client: "Tech Brand",               category: "AI",      videoId: "NWxk_O1Zf6Q" },
  { id: 16, title: "Motion Graphics Package",  client: "SBD Canada",               category: "AI",      videoId: "D7gJMWCYMqc" },
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
  const { ref, visible } = useInView(0.08);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const CYCLE = ["We handle the content.", "You handle the clients.", "That's the deal."];
const TICKER_ITEMS = ["SetSpace", "Content Production", "Reels", "Landing Pages", "Email Sequences", "Strategy", "Wellness Marketing", "Done For You", "Mental Health", "Coaches", "Therapists"];

/* ── BLUE GRADIENT BUTTON ── */
function BlueBtn({ href, children, large = false }: { href: string; children: React.ReactNode; large?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: large ? "16px" : "14px",
        background: "linear-gradient(180deg, #509dff 0%, #2887ff 50%, #147cff 75%, #0a77ff 87.5%, #0071ff 100%)",
        color: WHITE,
        padding: large ? "16px 40px" : "12px 28px",
        borderRadius: "32px",
        textDecoration: "none",
        display: "inline-block",
        border: "1px solid rgba(114, 176, 255, 0.4)",
        boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.33)",
        transition: "opacity 0.2s, transform 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      {children}
    </a>
  );
}

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

  useEffect(() => {
    const id = setInterval(() => {
      setCycleVisible(false);
      setTimeout(() => { setCycleIdx(i => (i + 1) % CYCLE.length); setCycleVisible(true); }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

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
      setBlueprintStatus(res.ok ? "success" : "error");
      if (res.ok) setBlueprintEmail("");
    } catch { setBlueprintStatus("error"); }
  };

  return (
    <div style={{ background: BLACK, color: WHITE, fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px", overflow: "hidden" }}>
        {/* Blue radial glow behind */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,113,255,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Glowing abstract lines (Figma bg element) */}
        <div style={{ position: "absolute", top: "-100px", left: "40%", width: "500px", height: "900px", pointerEvents: "none", opacity: 0.15, transform: "rotate(15deg)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "100%", background: "linear-gradient(to bottom, transparent, #2D8AFF, transparent)" }} />
          <div style={{ position: "absolute", top: 0, left: "60px", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, #509dff, transparent)", opacity: 0.5 }} />
          <div style={{ position: "absolute", top: 0, left: "120px", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, #2D8AFF, transparent)", opacity: 0.3 }} />
        </div>

        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-grid">
            {/* LEFT */}
            <div>
              {/* Label */}
              <div className="fade-word" style={{ animationDelay: "0s", fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "14px", background: "linear-gradient(267deg, #fafafa 2%, #949494 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "24px", display: "block", opacity: 0 }}>
                Content &amp; Marketing Engine
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "clamp(40px, 5vw, 66px)", color: GRAY, lineHeight: 1.1, margin: "0 0 4px", letterSpacing: "-2px" }}>
                We build your
              </h1>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(40px, 5vw, 66px)", lineHeight: 1.1, margin: "0 0 32px", letterSpacing: "-2px" }}>
                {["Marke", "ti"].map((w, i) => (
                  <span key={i} className="fade-word" style={{ animationDelay: `${0.15 + i * 0.12}s`, color: WHITE }}>{w}</span>
                ))}
                <span className="fade-word" style={{ animationDelay: "0.4s", fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: WHITE }}>ng</span>
                {" "}
                <span className="fade-word" style={{ animationDelay: "0.5s", color: BLUE }}>En</span>
                <span className="fade-word" style={{ animationDelay: "0.6s", fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: BLUE }}>gine</span>
              </h1>

              {/* Sub */}
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "17px", color: WHITE, maxWidth: "520px", lineHeight: 1.7, margin: "0 0 40px" }}>
                Done-for-you content and marketing for therapists, counselors, coaches, and wellness professionals.
              </p>

              {/* Buttons */}
              <div className="hero-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "48px" }}>
                <BlueBtn href={CALENDLY}>Get Free Audit</BlueBtn>
                <a
                  href="#blueprint"
                  onClick={e => { e.preventDefault(); document.querySelector("#blueprint")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    background: "transparent",
                    color: WHITE,
                    border: "2px solid rgba(255,255,255,0.25)",
                    padding: "12px 28px",
                    borderRadius: "32px",
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "transparent"; }}
                >
                  Download Free Framework
                </a>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
                {[
                  { val: "160+", label: "Clients Helped" },
                  { val: "1,000+", label: "Content Pieces" },
                  { val: "3+ Years", label: "In Production" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                    {i > 0 && <div className="stat-divider" />}
                    <div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "24px", color: WHITE }}>{s.val}</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — video frames */}
            <div className="hero-mockups" aria-hidden="true">
              <div style={{ position: "relative", height: "480px", width: "420px" }}>
                {/* Left frame */}
                <div className="frame-a" style={{ position: "absolute", top: "60px", left: "0", width: "175px", height: "310px", borderRadius: "16px", overflow: "hidden", border: "1px solid #333", background: "#111", zIndex: 1 }}>
                  <iframe src={`https://www.youtube.com/embed/${HERO_VIDEOS[0]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[0]}&mute=1`} title="Reel 1" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} />
                </div>
                {/* Center frame — blue border, slightly bigger */}
                <div className="frame-b" style={{ position: "absolute", top: "20px", left: "105px", width: "200px", height: "355px", borderRadius: "16px", overflow: "hidden", border: `2px solid ${BLUE}`, background: "#111", zIndex: 3, boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.33)" }}>
                  <iframe src={`https://www.youtube.com/embed/${HERO_VIDEOS[1]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[1]}&mute=1`} title="Reel 2" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} />
                </div>
                {/* Right frame */}
                <div className="frame-c" style={{ position: "absolute", top: "60px", left: "225px", width: "175px", height: "310px", borderRadius: "16px", overflow: "hidden", border: "1px solid #333", background: "#111", zIndex: 2 }}>
                  <iframe src={`https://www.youtube.com/embed/${HERO_VIDEOS[2]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[2]}&mute=1`} title="Reel 3" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glowing horizontal divider */}
        <div style={{ marginTop: "80px", width: "100%", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(45,138,255,0.4) 30%, rgba(45,138,255,0.6) 50%, rgba(45,138,255,0.4) 70%, transparent 100%)" }} />

        {/* Ticker */}
        <div style={{ overflow: "hidden", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="ticker-track">
            {[0, 1].map(rep => (
              <span key={rep} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                {TICKER_ITEMS.map((item, i) => (
                  <span key={i} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "13px", textTransform: "uppercase", letterSpacing: "3px", color: "rgba(255,255,255,0.4)", padding: "0 24px", display: "inline-block" }}>
                    {item}<span style={{ marginLeft: "24px", color: BLUE }}>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHAT WE DO
      ════════════════════════════════════ */}
      <section id="services" style={{ padding: SEC_PAD, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>What We Do</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 4vw, 48px)", color: WHITE, textAlign: "center", marginBottom: "16px", lineHeight: 1.2 }}>
              Everything you need to grow online
            </h2>
            <div style={{ textAlign: "center", marginBottom: "64px", minHeight: "32px" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", color: BLUE, margin: 0, opacity: cycleVisible ? 1 : 0, transition: "opacity 0.4s ease", display: "inline" }}>
                {CYCLE[cycleIdx]}
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
            {[
              { num: "01", title: "Content Production", desc: "Video editing, reels, and short-form content delivered every month — consistently and on-brand, without you lifting a finger.", icon: "🎬" },
              { num: "02", title: "Landing Pages", desc: "High-converting pages designed and built for your practice — capture leads and book sessions on autopilot.", icon: "🖥️" },
              { num: "03", title: "Email Nurture Sequences", desc: "Automated email flows that turn viewers into booked sessions — written, designed, and delivered.", icon: "✉️" },
              { num: "04", title: "Content Strategy", desc: "A clear monthly plan for what to post, when, and why — built around your audience and your goals.", icon: "📋" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  className="glass-card hover-lift"
                  style={{ borderRadius: "20px", padding: "36px", height: "100%" }}
                >
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: BLUE, marginBottom: "20px" }}>
                    {item.num}
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "20px", color: WHITE, margin: "0 0 12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHO WE HELP
      ════════════════════════════════════ */}
      <section style={{ padding: SEC_PAD, position: "relative", overflow: "hidden" }}>
        {/* Blue blend overlay (from Figma) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(180deg, rgba(0,113,255,0) 0%, rgba(0,113,255,0.08) 50%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>Who We Help</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 4vw, 48px)", color: WHITE, textAlign: "center", margin: "0 0 64px", lineHeight: 1.2 }}>
              Built for wellness professionals
            </h2>
          </FadeUp>

          {/* WELLNESS ghost watermark */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(60px, 12vw, 160px)", color: "rgba(255,255,255,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", zIndex: 0 }}>
            WELLNESS
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", position: "relative", zIndex: 1 }}>
            {[
              { title: "Therapists & Counselors", desc: "Build trust online, attract ideal clients, and stay consistent without adding hours to your week.", icon: "🧠" },
              { title: "Wellness Coaches", desc: "Turn your expertise into compelling content that grows your audience and fills your calendar with qualified leads.", icon: "💚" },
              { title: "Mental Health Practitioners", desc: "Grow your practice with professional content that reflects the care and quality you bring to every session.", icon: "🌿" },
            ].map((col, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div
                  className="glass-card hover-lift"
                  style={{ borderRadius: "20px", padding: "40px 32px", height: "100%", textAlign: "center" }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "20px" }}>{col.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", color: WHITE, marginBottom: "16px" }}>
                    {col.title}
                  </h3>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.7, margin: 0 }}>
                    {col.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PORTFOLIO — OUR WORK
      ════════════════════════════════════ */}
      <section id="work" style={{ padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>Our Work</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 4vw, 48px)", color: WHITE, textAlign: "center", margin: "0 0 48px" }}>
              Proof of performance
            </h2>
          </FadeUp>

          {/* Filter tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}>
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  padding: "8px 20px",
                  borderRadius: "24px",
                  border: activeTab === cat ? `1px solid ${BLUE}` : "1px solid rgba(255,255,255,0.1)",
                  background: activeTab === cat ? "rgba(45,138,255,0.15)" : "rgba(255,255,255,0.03)",
                  color: activeTab === cat ? BLUE : GRAY2,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "32px", alignItems: "start" }}>
            <div className="glass-card" style={{ borderRadius: "20px", overflow: "hidden" }}>
              <div style={{ maxHeight: "540px", overflowY: "auto" }} className="hide-scrollbar">
                {filtered.map((item, i) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px 20px",
                      borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      cursor: "pointer",
                      background: hovered?.id === item.id ? "rgba(45,138,255,0.08)" : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", width: "24px", flexShrink: 0, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 600, color: WHITE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2, marginTop: "2px" }}>{item.client}</div>
                    </div>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "12px", background: "rgba(45,138,255,0.1)", color: BLUE, flexShrink: 0 }}>
                      {item.category}
                    </span>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: `1px solid ${hovered?.id === item.id ? BLUE : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: hovered?.id === item.id ? "rgba(45,138,255,0.2)" : "transparent", transition: "all 0.18s" }}>
                      <Play style={{ width: "10px", height: "10px", color: hovered?.id === item.id ? BLUE : GRAY2, marginLeft: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "sticky", top: "100px" }}>
              <div className="glass-card" style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "9/16", maxHeight: "400px", position: "relative" }}>
                {hovered ? (
                  <>
                    <img
                      key={hovered.videoId}
                      src={`https://img.youtube.com/vi/${hovered.videoId}/maxresdefault.jpg`}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${hovered.videoId}/hqdefault.jpg`; }}
                      alt={hovered.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: BLUE, marginBottom: "4px" }}>{hovered.client}</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: 700, color: WHITE }}>{hovered.title}</div>
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                      <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(45,138,255,0.2)", border: "1px solid rgba(45,138,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Play style={{ width: "18px", height: "18px", color: WHITE, marginLeft: "3px" }} fill={WHITE} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                    <Play style={{ width: "24px", height: "24px", color: GRAY2 }} />
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: GRAY2 }}>Hover to preview</span>
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "880px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE }}>{activeVideo.title}</span>
                <button onClick={() => setActiveVideo(null)} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "28px", color: GRAY2, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>
              <div style={{ position: "relative", aspectRatio: "16/9" }}>
                <iframe src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`} title={activeVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", borderRadius: "12px" }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════
          PRICING
      ════════════════════════════════════ */}
      <section id="pricing" style={{ padding: SEC_PAD, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,113,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>Pricing</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(24px, 3.5vw, 40px)", color: WHITE, textAlign: "center", marginBottom: "12px", lineHeight: 1.2 }}>
              No retainer traps. No agency fluff.<br />Just content that works.
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", color: GRAY2, textAlign: "center", margin: "0 0 56px" }}>
              Simple, transparent packages. No hidden fees.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", alignItems: "start" }}>
            {[
              {
                name: "Starter", price: "$800", period: "/mo",
                desc: "For wellness professionals getting started with consistent content.",
                features: ["8 reels / month", "Content strategy", "Basic social media management"],
                featured: false,
              },
              {
                name: "Growth", price: "$1,500", period: "/mo",
                desc: "For growing practices ready to expand content and capture leads.",
                features: ["12 reels + 6 designs / month", "Content strategy", "Landing page setup", "Email nurture sequence (3 emails)"],
                featured: true,
              },
              {
                name: "Full Engine", price: "$2,500", period: "/mo",
                desc: "A complete done-for-you content and marketing operation.",
                features: ["Full content production", "Strategy + landing page", "Full email nurture sequence", "Monthly performance review"],
                featured: false,
              },
            ].map((plan, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  className={plan.featured ? "glass-card-blue hover-lift" : "glass-card hover-lift"}
                  style={{ borderRadius: "24px", padding: "40px 32px", position: "relative", display: "flex", flexDirection: "column" }}
                >
                  {plan.featured && (
                    <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(180deg, #509dff 0%, #0071ff 100%)", color: WHITE, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "11px", padding: "4px 16px", borderRadius: "12px", whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase" }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", color: BLUE, marginBottom: "20px" }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "48px", color: WHITE, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2 }}>{plan.period}</span>
                  </div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.6, margin: "0 0 28px", flex: 0 }}>{plan.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", flex: 1 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
                        <ArrowRight style={{ width: "14px", height: "14px", color: BLUE, marginTop: "2px", flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.featured ? (
                    <BlueBtn href={CALENDLY}>Get Started</BlueBtn>
                  ) : (
                    <a
                      href={CALENDLY}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", background: "transparent", color: WHITE, border: "1px solid rgba(255,255,255,0.2)", padding: "12px 0", borderRadius: "32px", textDecoration: "none", textAlign: "center", display: "block", transition: "border-color 0.2s, background 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = "rgba(45,138,255,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      Get Started
                    </a>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SOCIAL PROOF
      ════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "32px" }}>Social Proof</div>

            {/* Testimonials */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "48px" }}>
              {[
                {
                  quote: "Communication is excellent. This is where I'm going when I need content work and I can't recommend them enough. He delivered more than what I asked for, and stayed in touch through the entire process.",
                  name: "Muhammad Helal",
                  role: "Founder, Flagship Media",
                  initials: "MH",
                },
                {
                  quote: "Communication was smooth with no confusion throughout the project. I will absolutely hire this freelancer again for future projects. Highly recommended.",
                  name: "Dr. Luzelena Rivers",
                  role: "Enterprising Women Foundation",
                  initials: "LR",
                },
                {
                  quote: "Communication was always clear and smooth. He regularly contributed ideas and suggestions instead of just executing tasks — it felt like a true collaboration.",
                  name: "Philipp F.",
                  role: "Finance Creator, YouTube",
                  initials: "PF",
                },
              ].map((t, i) => (
                <FadeUp key={i} delay={i * 0.12}>
                  <div className="glass-card" style={{ borderRadius: "16px", padding: "28px", textAlign: "left", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {/* Stars */}
                    <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                      {[0,1,2,3,4].map(s => (
                        <span key={s} style={{ color: "#FFD700", fontSize: "13px" }}>★</span>
                      ))}
                    </div>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, margin: "0 0 20px", flex: 1 }}>
                      "{t.quote}"
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #2D8AFF, #0071FF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "11px", color: WHITE }}>{t.initials}</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "13px", color: WHITE }}>{t.name}</div>
                        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: BLUE, marginTop: "1px" }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Stat pills */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0" }}>
              {[
                { val: "4.9★", label: "Average Rating" },
                { val: "160+", label: "Clients" },
                { val: "1,000+", label: "Content Pieces" },
                { val: "3+ Years", label: "In Business" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.1)", margin: "0 24px" }} />}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "20px", color: WHITE }}>{s.val}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT / TEAM
      ════════════════════════════════════ */}
      <section id="team" style={{ padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <FadeUp>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "20px" }}>About SetSpace</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3.5vw, 44px)", color: WHITE, lineHeight: 1.2, margin: "0 0 28px" }}>
                A remote team built for wellness professionals
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", color: GRAY2, lineHeight: 1.8, margin: "0 0 48px" }}>
                We help therapists, counselors, coaches, and wellness professionals generate leads and grow online. We handle strategy, video editing, reels, landing pages, and email nurture sequences — so you can focus on your clients.
              </p>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { value: "160+", label: "Clients Helped" },
                  { value: "1,000+", label: "Content Pieces" },
                  { value: "3 Years", label: "In Production" },
                  { value: "4.9★", label: "Average Rating" },
                ].map((s, i) => (
                  <div key={i} className="glass-card" style={{ borderRadius: "16px", padding: "24px" }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "28px", color: WHITE, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2, marginTop: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              {/* Ateeb photo */}
              <div style={{ position: "relative", marginBottom: "12px", borderRadius: "20px", overflow: "hidden", border: `2px solid ${BLUE}`, boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.2)" }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                  alt="Ateeb Hasan — Founder"
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", padding: "32px 24px 20px" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE }}>Ateeb Hasan</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: BLUE, marginTop: "2px" }}>Founder & Creative Lead</div>
                </div>
              </div>

              {/* Team grid */}
              <div className="team-grid">
                {teamMembers.map(m => (
                  <div key={m.name} style={{ width: "100%", aspectRatio: "1", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
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

      {/* ════════════════════════════════════
          FAQ
      ════════════════════════════════════ */}
      <section style={{ padding: SEC_PAD, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 4vw, 40px)", color: WHITE, textAlign: "center", margin: "0 0 56px" }}>
              Frequently Asked Questions
            </h2>
          </FadeUp>

          {[
            { q: "What kinds of clients do you work with?", a: "Therapists, counselors, wellness coaches, and service-based professionals who need consistent content without managing an in-house team." },
            { q: "How does the process work?", a: "You share your goals, existing content, and brand references. We build a content plan, start producing, and deliver on a set schedule every month. You review, approve, and publish — or we handle that too." },
            { q: "What's the turnaround time?", a: "Reels and short clips within 48 hours. Long-form video edits within 72 hours. On the Full Engine plan, same-day delivery is available for urgent content." },
            { q: "How do revisions work?", a: "You review via Google Drive or Frame.io and leave comments. We turn around revisions within 24 hours. Starter includes 3 revisions; Growth and Full Engine include unlimited." },
            { q: "Is there a contract?", a: "No lock-in contracts. We work month-to-month. Results are the only reason to stay — if we're not delivering, you shouldn't be billed." },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "15px", color: WHITE, lineHeight: 1.4 }}>{item.q}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", color: BLUE, flexShrink: 0, lineHeight: 1, fontWeight: 300 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.75, paddingBottom: "22px", margin: 0 }}>{item.a}</p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          BLUEPRINT DOWNLOAD
      ════════════════════════════════════ */}
      <section id="blueprint" style={{ padding: SEC_PAD, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <FadeUp>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "20px" }}>Free Resource</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3.5vw, 44px)", color: WHITE, lineHeight: 1.2, margin: "0 0 16px" }}>
                The Scroll to Client Framework
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", color: GRAY2, lineHeight: 1.8, marginBottom: "32px" }}>
                Find out exactly why your content isn't converting — and what to do about it. Free for therapists, coaches, and wellness professionals.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "36px" }}>
                {["The Scroll to Client Funnel", "The Content Pattern Audit", "The MOFU Gap explained", "The Winning Content Formula", "Production Quality Checklist", "Your 30-Day Content System"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <ArrowRight style={{ width: "14px", height: "14px", color: BLUE, marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY2, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleBlueprint}>
                <input
                  type="email"
                  value={blueprintEmail}
                  onChange={e => setBlueprintEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: WHITE, fontFamily: "'Poppins', sans-serif", fontSize: "15px", padding: "14px 18px", marginBottom: "12px", outline: "none" }}
                />
                <button
                  type="submit"
                  disabled={blueprintStatus === "loading" || blueprintStatus === "success"}
                  style={{ width: "100%", background: blueprintStatus === "success" ? "#1a7a1a" : "linear-gradient(180deg, #509dff 0%, #0071ff 100%)", color: WHITE, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "15px", padding: "14px", border: "none", borderRadius: "12px", cursor: "pointer", transition: "opacity 0.2s" }}
                >
                  {blueprintStatus === "loading" ? "Sending..." : blueprintStatus === "success" ? "Sent! Check your inbox." : "Send Me the Framework"}
                </button>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2, textAlign: "center", marginTop: "12px" }}>No spam. Unsubscribe anytime.</p>
              </form>
            </FadeUp>

            {/* PDF mockup */}
            <FadeUp delay={0.15}>
              <div className="glass-card-blue frame-b" style={{ borderRadius: "24px", padding: "48px 40px", position: "relative", overflow: "hidden", border: `1px solid rgba(45,138,255,0.3)`, boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.2)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "linear-gradient(180deg, #509dff, #0071ff)" }} />
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "32px" }}>Free Framework</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 28px)", color: WHITE, lineHeight: 1.3, marginBottom: "12px" }}>
                  THE SCROLL TO CLIENT FRAMEWORK
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: BLUE, marginBottom: "48px" }}>By SetSpace</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {["Content Funnel", "Pattern Audit", "MOFU Gap", "Content Formula"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "24px", height: "1px", background: BLUE }} />
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY2 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section id="cta" style={{ padding: SEC_PAD, position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,113,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: MAX_W, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeUp>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "24px" }}>
              Trusted by 160+ therapists, counselors, and wellness coaches worldwide.
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(36px, 6vw, 64px)", color: WHITE, lineHeight: 1.1, margin: "0 auto 20px", maxWidth: "800px", letterSpacing: "-1px" }}>
              Ready to build your marketing engine?
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", color: GRAY2, marginBottom: "48px", maxWidth: "520px", margin: "0 auto 48px", lineHeight: 1.6 }}>
              Book a free 20-minute audit call. No pitch, no pressure — just honest feedback.
            </p>
            <BlueBtn href={CALENDLY} large>Book Free Audit</BlueBtn>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY2, marginTop: "20px" }}>
              We respond within 24 hours.
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />

      {/* Sticky CTA */}
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta-btn hidden md:flex"
        title="Book Free Audit"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 30,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(180deg, #509dff 0%, #0071ff 100%)",
          color: WHITE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          border: "1px solid rgba(114,176,255,0.4)",
          transition: "transform 0.3s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Phone style={{ width: "22px", height: "22px" }} />
      </a>
    </div>
  );
}

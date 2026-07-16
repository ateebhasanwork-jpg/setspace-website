import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, ArrowRight, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ── PALETTE ── */
const BLACK    = "#050505";
const WHITE    = "#FAFAFA";
const BLUE     = "#2D8AFF";
const GRAY     = "#C9C9C9";
const GRAY2    = "#888888";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";
const MAX_W    = "1200px";
const SEC_PAD  = "120px 24px";

/* ── HERO REEL IDS ── */
const HERO_VIDEOS = ["W4Y0a2cz28E", "Ssi2F5K2yaE", "w2U15wziQcw"];

/* ── BRANDS ── */
const BRANDS = [
  { name: "Clutch",                   img: "logo-clutch.png" },
  { name: "Enterprising Women Found.", img: "logo-ewf.png" },
  { name: "Flagship Media",           img: "logo-flagship.png" },
  { name: "Pawsitive",                img: "logo-pawsitive.png" },
  { name: "SBD Canada",               img: "logo-sbd.png" },
  { name: "A Steady Space",           img: "logo-steadyspace.png" },
  { name: "Sweet Bee",                img: "logo-sweetbee.png" },
  { name: "Unexpected Atlanta",       img: "logo-unexpected.png" },
];

/* ── PORTFOLIO ── */
const portfolioItems = [
  { id: 1,  title: "Wellness Brand Video",     client: "Wellness Coach",           category: "YouTube", videoId: "kvbTfcAIymU" },
  { id: 2,  title: "YouTube Long-Form Edit",   client: "Unexpected Atlanta Tours", category: "YouTube", videoId: "VysdDxP_oPo" },
  { id: 3,  title: "Testimonials Compilation", client: "Iron Master Awards",       category: "YouTube", videoId: "bWmb_8dzgTk" },
  { id: 4,  title: "Promotional Video",        client: "Kyle",                     category: "YouTube", videoId: "HBejF0eQ2TA" },
  { id: 5,  title: "Talking Head Reel",        client: "Dr. Lindsey",              category: "Reels",   videoId: "8iaVENpFw0I" },
  { id: 6,  title: "Podcast Short Clip",       client: "A Steady Space",           category: "Reels",   videoId: "W4Y0a2cz28E" },
  { id: 7,  title: "Gym Lifestyle Reel",       client: "Muhammad Helal",           category: "Reels",   videoId: "gkaBUIK-Y_U" },
  { id: 8,  title: "Informative Reel",         client: "Faceless Creator",         category: "Reels",   videoId: "oamKPmEShfo" },
  { id: 9,  title: "Brand Reel",               client: "Klinik Europe",            category: "Reels",   videoId: "sum7TRFh28k" },
  { id: 10, title: "Fitness Content Reel",     client: "Creator",                  category: "Reels",   videoId: "l5_OVdR_MWo" },
  { id: 11, title: "Explainer Ad",             client: "CyberCube",                category: "Ads",     videoId: "IZo8Txy26xg" },
  { id: 12, title: "UGC Ad",                   client: "Beast",                    category: "Ads",     videoId: "EPi8_QC6ULE" },
  { id: 13, title: "Meta Ad Creative",         client: "Flagship Media",           category: "Ads",     videoId: "4louAvpt_W0" },
  { id: 14, title: "AI Brand Video",           client: "SetSpace",                 category: "AI",      videoId: "kQJRCMOGjvA" },
  { id: 15, title: "AI Product Showcase",      client: "Tech Brand",               category: "AI",      videoId: "NWxk_O1Zf6Q" },
  { id: 16, title: "Motion Graphics",          client: "SBD Canada",               category: "AI",      videoId: "D7gJMWCYMqc" },
];
const CATS = ["All", "YouTube", "Reels", "Ads", "AI"];

/* ── TEAM ── */
const teamMembers = [
  { name: "Zoha Adnan",      role: "Lead Gen Executive",         img: "zoha.jpeg",   kb: "kb-a" },
  { name: "Jaffer Naqvi",    role: "Video Designer",             img: "jaffer.jpeg", kb: "kb-b" },
  { name: "Sani e Zehra",    role: "Social Media Designer",      img: "sani.jpeg",   kb: "kb-c" },
  { name: "Muhammad Ashhad", role: "Video Editor",               img: "ashad.jpeg",  kb: "kb-d" },
  { name: "Laiba Malik",     role: "HR & Ops Executive",         img: "laiba.jpeg",  kb: "kb-e" },
  { name: "Zayd Saleem",     role: "Explainer Video Specialist", img: "zayd.jpeg",   kb: "kb-f" },
];

/* ── CYCLE PHRASES ── */
const CYCLE = ["We handle the content.", "You handle the clients.", "That's the deal."];
const TICKER_ITEMS = ["SetSpace", "Content Production", "Reels", "Landing Pages", "Email Sequences", "Strategy", "Wellness Marketing", "Done For You", "Mental Health", "Coaches", "Therapists"];

/* ════════════════════════════════════
   HOOKS
════════════════════════════════════ */
function useInView(threshold = 0.12) {
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

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth  - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return pos;
}

/* ════════════════════════════════════
   COMPONENTS
════════════════════════════════════ */
function CountUp({ to, suffix = "", prefix = "", duration = 2200 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const [val, setVal]   = useState(0);
  const [popped, setPop] = useState(false);
  const { ref, visible } = useInView(0.2);
  const started = useRef(false);
  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(tick);
      else { setPop(true); setTimeout(() => setPop(false), 400); }
    };
    requestAnimationFrame(tick);
  }, [visible, to, duration]);
  return (
    <span ref={ref} className={popped ? "counter-pop" : ""}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}

function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useInView(0.08);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SlideIn({ children, delay = 0, from = "left" }: { children: React.ReactNode; delay?: number; from?: "left" | "right" }) {
  const { ref, visible } = useInView(0.08);
  const dx = from === "left" ? "-40px" : "40px";
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : `translateX(${dx})`, transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function BlueBtn({ href, children, large = false, onClick }: { href: string; children: React.ReactNode; large?: boolean; onClick?: () => void }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={onClick}
      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: large ? "16px" : "14px", background: "linear-gradient(180deg, #509dff 0%, #2887ff 50%, #147cff 75%, #0a77ff 87.5%, #0071ff 100%)", color: WHITE, padding: large ? "16px 40px" : "12px 28px", borderRadius: "32px", textDecoration: "none", display: "inline-block", border: "1px solid rgba(114,176,255,0.4)", boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.33)", transition: "opacity 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)"; }}
    >{children}</a>
  );
}

/* ════════════════════════════════════
   HOME PAGE
════════════════════════════════════ */
export default function Home() {
  const [activeTab,      setActiveTab]      = useState("All");
  const [activeVideo,    setActiveVideo]    = useState<{ videoId: string; title: string } | null>(null);
  const [openFaq,        setOpenFaq]        = useState<number | null>(null);
  const [cycleIdx,       setCycleIdx]       = useState(0);
  const [cycleVisible,   setCycleVisible]   = useState(true);
  const [blueprintEmail, setBlueprintEmail] = useState("");
  const [blueprintStatus,setBlueprintStatus]= useState<"idle"|"loading"|"success"|"error">("idle");
  const parallax = useMouseParallax();

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
      const res = await fetch("/api/blueprint", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: blueprintEmail }) });
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,113,255,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Parallax glow blob */}
        <div style={{ position: "absolute", top: "20%", left: "60%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,113,255,0.12) 0%, transparent 70%)", transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`, transition: "transform 0.15s ease-out", pointerEvents: "none" }} />

        {/* Glowing lines */}
        <div style={{ position: "absolute", top: "-100px", left: "40%", width: "500px", height: "900px", pointerEvents: "none", opacity: 0.15, transform: "rotate(15deg)" }}>
          <div style={{ position: "absolute", top: 0, left: 0,    width: "2px", height: "100%", background: "linear-gradient(to bottom, transparent, #2D8AFF, transparent)" }} />
          <div style={{ position: "absolute", top: 0, left: "60px",  width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, #509dff, transparent)", opacity: 0.5 }} />
          <div style={{ position: "absolute", top: 0, left: "120px", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, #2D8AFF, transparent)", opacity: 0.3 }} />
        </div>

        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "0 24px" }}>
          <div className="hero-grid">
            {/* LEFT */}
            <div>
              <div className="fade-word" style={{ animationDelay: "0s", fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "14px", background: "linear-gradient(267deg, #fafafa 2%, #949494 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "24px", display: "block", opacity: 0 }}>
                Content &amp; Marketing Engine
              </div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "clamp(40px, 5vw, 66px)", color: GRAY, lineHeight: 1.1, margin: "0 0 4px", letterSpacing: "-2px" }}>
                We build your
              </h1>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(40px, 5vw, 66px)", lineHeight: 1.1, margin: "0 0 32px", letterSpacing: "-2px" }}>
                {["Marke","ti"].map((w,i) => <span key={i} className="fade-word" style={{ animationDelay: `${0.15+i*0.12}s`, color: WHITE }}>{w}</span>)}
                <span className="fade-word" style={{ animationDelay:"0.4s", fontFamily:"'DM Serif Display', serif", fontStyle:"italic", color: WHITE }}>ng</span>
                {" "}
                <span className="fade-word" style={{ animationDelay:"0.5s", color: BLUE }}>En</span>
                <span className="fade-word" style={{ animationDelay:"0.6s", fontFamily:"'DM Serif Display', serif", fontStyle:"italic", color: BLUE }}>gine</span>
              </h1>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "17px", color: WHITE, maxWidth: "520px", lineHeight: 1.7, margin: "0 0 40px" }}>
                Done-for-you content and marketing for therapists, counselors, coaches, and wellness professionals.
              </p>
              <div className="hero-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "52px" }}>
                <BlueBtn href={CALENDLY}>Get Free Audit</BlueBtn>
                <a href="#blueprint" onClick={e => { e.preventDefault(); document.querySelector("#blueprint")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", background: "transparent", color: WHITE, border: "2px solid rgba(255,255,255,0.25)", padding: "12px 28px", borderRadius: "32px", textDecoration: "none", display: "inline-block", transition: "border-color 0.2s, background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "transparent"; }}
                >Download Free Framework</a>
              </div>

              {/* Live count-up stats */}
              <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
                {[
                  { to: 160, suffix: "+",     label: "Clients Helped" },
                  { to: 1000, suffix: "+",    label: "Content Pieces" },
                  { to: 3, suffix: "+ Years", label: "In Production" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                    {i > 0 && <div className="stat-divider" />}
                    <div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "26px", color: WHITE }}>
                        <CountUp to={s.to} suffix={s.suffix} />
                      </div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — floating video frames with parallax */}
            <div className="hero-mockups" aria-hidden="true">
              <div style={{ position: "relative", height: "480px", width: "420px", transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`, transition: "transform 0.2s ease-out" }}>
                <div className="frame-a" style={{ position: "absolute", top: "60px", left: "0", width: "175px", height: "310px", borderRadius: "16px", overflow: "hidden", border: "1px solid #333", background: "#111", zIndex: 1 }}>
                  <iframe src={`https://www.youtube.com/embed/${HERO_VIDEOS[0]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[0]}&mute=1`} title="Reel 1" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} />
                </div>
                <div className="frame-b border-glow-anim" style={{ position: "absolute", top: "20px", left: "105px", width: "200px", height: "355px", borderRadius: "16px", overflow: "hidden", border: `2px solid ${BLUE}`, background: "#111", zIndex: 3, boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.33)" }}>
                  <iframe src={`https://www.youtube.com/embed/${HERO_VIDEOS[1]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[1]}&mute=1`} title="Reel 2" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} />
                </div>
                <div className="frame-c" style={{ position: "absolute", top: "60px", left: "225px", width: "175px", height: "310px", borderRadius: "16px", overflow: "hidden", border: "1px solid #333", background: "#111", zIndex: 2 }}>
                  <iframe src={`https://www.youtube.com/embed/${HERO_VIDEOS[2]}?autoplay=0&controls=0&loop=1&rel=0&playlist=${HERO_VIDEOS[2]}&mute=1`} title="Reel 3" allow="autoplay; encrypted-media" style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider glow */}
        <div style={{ marginTop: "80px", width: "100%", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(45,138,255,0.4) 30%, rgba(45,138,255,0.6) 50%, rgba(45,138,255,0.4) 70%, transparent 100%)" }} />

        {/* Text ticker */}
        <div style={{ overflow: "hidden", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="ticker-track">
            {[0,1].map(rep => (
              <span key={rep} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                {TICKER_ITEMS.map((item, i) => (
                  <span key={i} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "13px", textTransform: "uppercase", letterSpacing: "3px", color: "rgba(255,255,255,0.4)", padding: "0 24px" }}>
                    {item}<span style={{ marginLeft: "24px", color: BLUE }}>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BRANDS WE'VE WORKED WITH
      ════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: GRAY2, textAlign: "center", marginBottom: "40px" }}>
              Brands we've worked with
            </p>
          </FadeUp>
          <div style={{ overflow: "hidden", position: "relative" }}>
            {/* fade edges */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to right, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to left, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div className="logo-ticker-track">
              {[0, 1].map(rep => (
                <span key={rep} style={{ display: "inline-flex", alignItems: "center", gap: "0" }}>
                  {BRANDS.map((brand, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 48px", flexShrink: 0, height: "56px" }}>
                      <img
                        src={`${import.meta.env.BASE_URL}images/${brand.img}`}
                        alt={brand.name}
                        className="brand-logo"
                        style={{ height: "28px", width: "auto", maxWidth: "120px", objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHAT WE DO
      ════════════════════════════════════ */}
      <section id="services" style={{ padding: SEC_PAD, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>What We Do</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 4vw, 48px)", color: WHITE, textAlign: "center", marginBottom: "16px", lineHeight: 1.2 }}>
              Everything you need to grow online
            </h2>
            <div style={{ textAlign: "center", marginBottom: "64px", minHeight: "32px" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", color: BLUE, margin: 0, opacity: cycleVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
                {CYCLE[cycleIdx]}
              </p>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
            {[
              { num: "01", title: "Content Production",       desc: "Video editing, reels, and short-form content delivered every month — consistently and on-brand, without you lifting a finger." },
              { num: "02", title: "Landing Pages",             desc: "High-converting pages designed and built for your practice — capture leads and book sessions on autopilot." },
              { num: "03", title: "Email Nurture Sequences",   desc: "Automated email flows that turn viewers into booked sessions — written, designed, and delivered." },
              { num: "04", title: "Content Strategy",          desc: "A clear monthly plan for what to post, when, and why — built around your audience and your goals." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,113,255,0.15)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card"
                  style={{ borderRadius: "20px", padding: "40px", height: "100%" }}
                >
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: BLUE, marginBottom: "20px" }}>{item.num}</div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "20px", color: WHITE, margin: "0 0 12px" }}>{item.title}</h3>
                  <p  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHO WE HELP
      ════════════════════════════════════ */}
      <section style={{ padding: SEC_PAD, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,113,255,0) 0%, rgba(0,113,255,0.08) 50%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(60px,12vw,160px)", color: "rgba(255,255,255,0.03)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
          WELLNESS
        </div>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>Who We Help</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px,4vw,48px)", color: WHITE, textAlign: "center", margin: "0 0 64px", lineHeight: 1.2 }}>
              Built for wellness professionals
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
            {[
              { title: "Therapists & Counselors",    desc: "Build trust online, attract ideal clients, and stay consistent without adding hours to your week.",                                      icon: "🧠" },
              { title: "Wellness Coaches",            desc: "Turn your expertise into compelling content that grows your audience and fills your calendar with qualified leads.",                       icon: "💚" },
              { title: "Mental Health Practitioners", desc: "Grow your practice with professional content that reflects the care and quality you bring to every session.",                             icon: "🌿" },
            ].map((col, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card" style={{ borderRadius: "20px", padding: "40px 32px", height: "100%", textAlign: "center" }}>
                  <div style={{ fontSize: "40px", marginBottom: "20px" }}>{col.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", color: WHITE, marginBottom: "16px" }}>{col.title}</h3>
                  <p  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.7, margin: 0 }}>{col.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          OUR WORK — thumbnail grid
      ════════════════════════════════════ */}
      <section id="work" style={{ padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE }}>Our Work</span>
            </div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px,4vw,48px)", color: WHITE, textAlign: "center", margin: "0 0 48px" }}>
              Proof of performance
            </h2>
          </FadeUp>

          {/* Category tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}>
            {CATS.map(cat => (
              <motion.button key={cat} onClick={() => setActiveTab(cat)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "13px", padding: "8px 20px", borderRadius: "24px", border: activeTab === cat ? `1px solid ${BLUE}` : "1px solid rgba(255,255,255,0.1)", background: activeTab === cat ? "rgba(45,138,255,0.15)" : "rgba(255,255,255,0.03)", color: activeTab === cat ? BLUE : GRAY2, cursor: "pointer", transition: "all 0.2s" }}>
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Thumbnail grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="port-thumb"
                  onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`; }}
                  />
                  {/* Overlay with play */}
                  <div className="port-overlay">
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(45,138,255,0.85)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", boxShadow: "0 0 24px rgba(0,113,255,0.5)" }}>
                      <Play style={{ width: "16px", height: "16px", color: WHITE, marginLeft: "2px" }} fill={WHITE} />
                    </div>
                  </div>
                  {/* Info bar */}
                  <div className="port-info">
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: BLUE, marginBottom: "2px" }}>{item.category}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", fontWeight: 600, color: WHITE, lineHeight: 1.3 }}>{item.title}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: GRAY2, marginTop: "2px" }}>{item.client}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "880px" }}>
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
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(24px,3.5vw,40px)", color: WHITE, textAlign: "center", marginBottom: "12px", lineHeight: 1.2 }}>
              No retainer traps. No agency fluff.<br />Just content that works.
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", color: GRAY2, textAlign: "center", margin: "0 0 56px" }}>Simple, transparent packages. No hidden fees.</p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", alignItems: "start" }}>
            {[
              { name: "Starter",     price: "$800",   period: "/mo", desc: "For wellness professionals getting started with consistent content.", features: ["8 reels / month", "Content strategy", "Basic social media management"], featured: false },
              { name: "Growth",      price: "$1,500", period: "/mo", desc: "For growing practices ready to expand content and capture leads.",     features: ["12 reels + 6 designs / month", "Content strategy", "Landing page setup", "Email nurture sequence (3 emails)"], featured: true  },
              { name: "Full Engine", price: "$2,500", period: "/mo", desc: "A complete done-for-you content and marketing operation.",            features: ["Full content production", "Strategy + landing page", "Full email nurture sequence", "Monthly performance review"],     featured: false },
            ].map((plan, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className={plan.featured ? "glass-card-blue" : "glass-card"}
                  style={{ borderRadius: "24px", padding: "40px 32px", position: "relative", display: "flex", flexDirection: "column" }}>
                  {plan.featured && (
                    <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(180deg,#509dff 0%,#0071ff 100%)", color: WHITE, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "11px", padding: "4px 16px", borderRadius: "12px", whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase" }}>Most Popular</div>
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
                  {plan.featured
                    ? <BlueBtn href={CALENDLY}>Get Started</BlueBtn>
                    : <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", background: "transparent", color: WHITE, border: "1px solid rgba(255,255,255,0.2)", padding: "12px 0", borderRadius: "32px", textDecoration: "none", textAlign: "center", display: "block", transition: "border-color 0.2s, background 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = "rgba(45,138,255,0.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
                      >Get Started</a>
                  }
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SOCIAL PROOF
      ════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, textAlign: "center", marginBottom: "48px" }}>Social Proof</div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "60px" }}>
            {[
              { quote: "Communication is excellent. This is where I'm going when I need content work and I can't recommend them enough. He delivered more than what I asked for, and stayed in touch through the entire process.", name: "Muhammad Helal", role: "Founder, Flagship Media", initials: "MH" },
              { quote: "Communication was smooth with no confusion throughout the project. I will absolutely hire this freelancer again for future projects. Highly recommended.",                                                   name: "Dr. Luzelena Rivers", role: "Enterprising Women Foundation", initials: "LR" },
              { quote: "Communication was always clear and smooth. He regularly contributed ideas and suggestions instead of just executing tasks — it felt like a true collaboration.",                                             name: "Philipp F.",          role: "Finance Creator, YouTube",       initials: "PF" },
            ].map((t, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6, borderColor: "rgba(45,138,255,0.3)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card" style={{ borderRadius: "16px", padding: "28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                      {[0,1,2,3,4].map(s => <span key={s} style={{ color: "#FFD700", fontSize: "13px" }}>★</span>)}
                    </div>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, margin: "0 0 20px" }}>"{t.quote}"</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#2D8AFF,#0071FF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "11px", color: WHITE }}>{t.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "13px", color: WHITE }}>{t.name}</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: BLUE, marginTop: "1px" }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Animated stats row */}
          <FadeUp>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
              {[
                { to: 4.9, suffix: "★", prefix: "", label: "Average Rating", decimals: 1 },
                { to: 160, suffix: "+", prefix: "", label: "Clients",         decimals: 0 },
                { to: 1000, suffix: "+", prefix: "",label: "Content Pieces",  decimals: 0 },
                { to: 3, suffix: "+ Years", prefix: "", label: "In Business", decimals: 0 },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.1)", margin: "0 32px" }} />}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "22px", color: WHITE }}>
                      {s.to === 4.9
                        ? <span>4.9★</span>
                        : <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix} />
                      }
                    </div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT / TEAM — Ken Burns photos
      ════════════════════════════════════ */}
      <section id="team" style={{ padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <SlideIn from="left">
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "20px" }}>About SetSpace</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px,3.5vw,44px)", color: WHITE, lineHeight: 1.2, margin: "0 0 28px" }}>
                A remote team built for wellness professionals
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", color: GRAY2, lineHeight: 1.8, margin: "0 0 48px" }}>
                We help therapists, counselors, coaches, and wellness professionals generate leads and grow online. We handle strategy, video editing, reels, landing pages, and email nurture sequences — so you can focus on your clients.
              </p>
              {/* Animated stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { to: 160, suffix: "+",      label: "Clients Helped" },
                  { to: 1000, suffix: "+",     label: "Content Pieces" },
                  { to: 3, suffix: " Years",   label: "In Production" },
                  { to: 100, suffix: "+",      label: "5-Star Reviews" },
                ].map((s, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card" style={{ borderRadius: "16px", padding: "24px" }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "28px", color: WHITE, lineHeight: 1 }}>
                      <CountUp to={s.to} suffix={s.suffix} />
                    </div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2, marginTop: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              {/* Founder — Ken Burns */}
              <div style={{ position: "relative", marginBottom: "10px", borderRadius: "20px", overflow: "hidden", border: `2px solid ${BLUE}`, boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.2)", aspectRatio: "4/3" }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                  alt="Ateeb Hasan — Founder"
                  className="kb-founder"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "transform" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", padding: "32px 24px 20px" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE }}>Ateeb Hasan</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: BLUE, marginTop: "2px" }}>Founder & Creative Lead</div>
                </div>
              </div>

              {/* Team grid — Ken Burns on each photo */}
              <div className="team-grid" style={{ marginTop: "10px" }}>
                {teamMembers.map((m, idx) => (
                  <motion.div
                    key={m.name}
                    whileHover={{ scale: 1.04, zIndex: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="photo-frame"
                    style={{ aspectRatio: "1", position: "relative" }}
                    title={`${m.name} — ${m.role}`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}images/${m.img}`}
                      alt={m.name}
                      className={m.kb}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", display: "block", willChange: "transform" }}
                    />
                    {/* Name on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px 8px", pointerEvents: "none" }}
                    >
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "11px", color: WHITE, lineHeight: 1.2 }}>{m.name}</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "9px", color: BLUE, marginTop: "1px" }}>{m.role}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </SlideIn>
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
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px,4vw,40px)", color: WHITE, textAlign: "center", margin: "0 0 56px" }}>
              Frequently Asked Questions
            </h2>
          </FadeUp>
          {[
            { q: "What kinds of clients do you work with?",      a: "Therapists, counselors, wellness coaches, and service-based professionals who need consistent content without managing an in-house team." },
            { q: "How does the process work?",                   a: "You share your goals, existing content, and brand references. We build a content plan, start producing, and deliver on a set schedule every month. You review, approve, and publish — or we handle that too." },
            { q: "What's the turnaround time?",                  a: "Reels and short clips within 48 hours. Long-form video edits within 72 hours. On the Full Engine plan, same-day delivery is available for urgent content." },
            { q: "How do revisions work?",                       a: "You review via Google Drive or Frame.io and leave comments. We turn around revisions within 24 hours. Starter includes 3 revisions; Growth and Full Engine include unlimited." },
            { q: "Is there a contract?",                         a: "No lock-in contracts. We work month-to-month. Results are the only reason to stay — if we're not delivering, you shouldn't be billed." },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "15px", color: WHITE, lineHeight: 1.4 }}>{item.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: "22px", color: BLUE, flexShrink: 0, lineHeight: 1, fontWeight: 300, display: "inline-block" }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: GRAY2, lineHeight: 1.75, paddingBottom: "22px", margin: 0, overflow: "hidden" }}>
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
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
            <SlideIn from="left">
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "20px" }}>Free Resource</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(28px,3.5vw,44px)", color: WHITE, lineHeight: 1.2, margin: "0 0 16px" }}>
                The Scroll to Client Framework
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", color: GRAY2, lineHeight: 1.8, marginBottom: "32px" }}>
                Find out exactly why your content isn't converting — and what to do about it. Free for therapists, coaches, and wellness professionals.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "36px" }}>
                {["The Scroll to Client Funnel","The Content Pattern Audit","The MOFU Gap explained","The Winning Content Formula","Production Quality Checklist","Your 30-Day Content System"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <ArrowRight style={{ width: "14px", height: "14px", color: BLUE, marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY2, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleBlueprint}>
                <input type="email" value={blueprintEmail} onChange={e => setBlueprintEmail(e.target.value)} placeholder="Your email address" required
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: WHITE, fontFamily: "'Poppins', sans-serif", fontSize: "15px", padding: "14px 18px", marginBottom: "12px", outline: "none" }} />
                <button type="submit" disabled={blueprintStatus === "loading" || blueprintStatus === "success"}
                  style={{ width: "100%", background: blueprintStatus === "success" ? "#1a7a1a" : "linear-gradient(180deg,#509dff 0%,#0071ff 100%)", color: WHITE, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "15px", padding: "14px", border: "none", borderRadius: "12px", cursor: "pointer", transition: "opacity 0.2s" }}>
                  {blueprintStatus === "loading" ? "Sending..." : blueprintStatus === "success" ? "Sent! Check your inbox." : "Send Me the Framework"}
                </button>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: GRAY2, textAlign: "center", marginTop: "12px" }}>No spam. Unsubscribe anytime.</p>
              </form>
            </SlideIn>
            <SlideIn from="right" delay={0.15}>
              <div className="glass-card-blue frame-b" style={{ borderRadius: "24px", padding: "48px 40px", position: "relative", overflow: "hidden", border: "1px solid rgba(45,138,255,0.3)", boxShadow: "-11px -8px 30px 0px rgba(26,127,255,0.2)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "linear-gradient(180deg,#509dff,#0071ff)" }} />
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "3px", color: BLUE, marginBottom: "32px" }}>Free Framework</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.5vw,28px)", color: WHITE, lineHeight: 1.3, marginBottom: "12px" }}>THE SCROLL TO CLIENT FRAMEWORK</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: BLUE, marginBottom: "48px" }}>By SetSpace</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {["Content Funnel","Pattern Audit","MOFU Gap","Content Formula"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "24px", height: "1px", background: BLUE }} />
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY2 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
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
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(36px,6vw,64px)", color: WHITE, lineHeight: 1.1, margin: "0 auto 20px", maxWidth: "800px", letterSpacing: "-1px" }}>
              Ready to build your<br />marketing engine?
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", color: GRAY2, margin: "0 auto 48px", maxWidth: "520px", lineHeight: 1.6 }}>
              Book a free 20-minute audit call. No pitch, no pressure — just honest feedback.
            </p>
            <BlueBtn href={CALENDLY} large>Book Free Audit</BlueBtn>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: GRAY2, marginTop: "20px" }}>We respond within 24 hours.</p>
          </FadeUp>
        </div>
      </section>

      <Footer />

      {/* Sticky pulse CTA */}
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="sticky-cta-btn" title="Book Free Audit"
        style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 30, width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(180deg,#509dff 0%,#0071ff 100%)", color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", border: "1px solid rgba(114,176,255,0.4)", transition: "transform 0.3s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <Phone style={{ width: "22px", height: "22px" }} />
      </a>
    </div>
  );
}

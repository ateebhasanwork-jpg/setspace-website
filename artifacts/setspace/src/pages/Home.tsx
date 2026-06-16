import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const WHITE   = "#FFFFFF";
const WARM    = "#F7F5F2";
const BLACK   = "#0A0A0A";
const DARK    = "#0A0A0A";
const ORANGE  = "#E84B1A";
const GRAY    = "#777777";
const GRAY2   = "#888888";
const DIVIDER = "#E8E8E8";
const DIVIDER2 = "#2A2A2A";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";

const SEC_PAD = "140px 24px";
const SEC_PAD_M = "80px 24px";
const MAX_W = "1140px";

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

const portfolioItems = [
  { id: 1,  title: "Wellness Brand Video",         client: "Wellness Coach",           type: "Talking Head",    category: "YouTube", videoId: "kvbTfcAIymU" },
  { id: 2,  title: "YouTube Long-Form Edit",        client: "Unexpected Atlanta Tours", type: "Long Form",       category: "YouTube", videoId: "VysdDxP_oPo" },
  { id: 3,  title: "Testimonials Compilation",      client: "Iron Master Awards",       type: "Testimonials",    category: "YouTube", videoId: "bWmb_8dzgTk" },
  { id: 4,  title: "Promotional Video",             client: "Kyle",                     type: "Promo Video",     category: "YouTube", videoId: "HBejF0eQ2TA" },
  { id: 5,  title: "Talking Head Reel",             client: "Dr Lindsey",               type: "Talking Head",    category: "Reels",   videoId: "8iaVENpFw0I" },
  { id: 6,  title: "Podcast Short Clip",            client: "A Steady Space",           type: "Podcast Short",   category: "Reels",   videoId: "W4Y0a2cz28E" },
  { id: 7,  title: "Gym Lifestyle Reel",            client: "Muhammad Helal",           type: "Lifestyle Reel",  category: "Reels",   videoId: "gkaBUIK-Y_U" },
  { id: 8,  title: "Informative Reel",              client: "Faceless Creator",         type: "Motion Graphics", category: "Reels",   videoId: "oamKPmEShfo" },
  { id: 9,  title: "Brand Reel",                    client: "Klinik Europe",            type: "Reel",            category: "Reels",   videoId: "sum7TRFh28k" },
  { id: 10, title: "Fitness Content Reel",          client: "Creator",                  type: "Lifestyle Reel",  category: "Reels",   videoId: "l5_OVdR_MWo" },
  { id: 11, title: "Explainer Ad",                  client: "CyberCube",                type: "Explainer",       category: "Ads",     videoId: "IZo8Txy26xg" },
  { id: 12, title: "UGC Ad",                        client: "Beast",                    type: "UGC Ad",          category: "Ads",     videoId: "EPi8_QC6ULE" },
  { id: 13, title: "Meta Ad Creative",              client: "Flagship Media",           type: "Meta Ad",         category: "Ads",     videoId: "4louAvpt_W0" },
  { id: 14, title: "AI Brand Video",                client: "Setspace",                 type: "AI Generated",    category: "AI",      videoId: "kQJRCMOGjvA" },
  { id: 15, title: "AI Product Showcase",           client: "Tech Brand",               type: "AI Showcase",     category: "AI",      videoId: "NWxk_O1Zf6Q" },
  { id: 16, title: "AI Brand Edit",                 client: "Creative Studio",          type: "AI Edit",         category: "AI",      videoId: "K3DznIcAKMo" },
  { id: 17, title: "Motion Graphics Package",       client: "SBD Canada",               type: "Motion Graphics", category: "AI",      videoId: "D7gJMWCYMqc" },
  { id: 18, title: "AI Talking Avatar",             client: "Brand",                    type: "AI Avatar",       category: "AI",      videoId: "fBfNpVJhBrE" },
  { id: 19, title: "Brand Short Clip",              client: "Service Provider",         type: "Talking Head",    category: "Reels",   videoId: "kvbTfcAIymU" },
  { id: 20, title: "YouTube Channel Trailer",       client: "Creator",                  type: "Channel Trailer", category: "YouTube", videoId: "bWmb_8dzgTk" },
];

const CATEGORIES = ["All", "YouTube", "Reels", "Ads", "AI"];

const teamMembers = [
  { name: "Zoha Adnan",      role: "Lead Gen Executive",          img: "zoha.jpeg" },
  { name: "Jaffer Naqvi",    role: "Video Designer",              img: "jaffer.jpeg" },
  { name: "Sani e Zehra",    role: "Social Media Designer",       img: "sani.jpeg" },
  { name: "Muhammad Ashhad", role: "Video Editor",                img: "ashad.jpeg" },
  { name: "Laiba Malik",     role: "HR & Ops Executive",          img: "laiba.jpeg" },
  { name: "Zayd Saleem",     role: "Explainer Video Specialist",  img: "zayd.jpeg" },
  { name: "Abdullah Khan",   role: "Motion Graphics Specialist",  img: "abdullah.jpeg" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "3px", color: ORANGE, marginBottom: "24px" }}>
      {children}
    </div>
  );
}

function SectionHeadline({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 48px)", color: BLACK, lineHeight: 1.15, margin: "0 0 24px", ...style }}>
      {children}
    </h2>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [hovered, setHovered] = useState<typeof portfolioItems[0] | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = activeTab === "All" ? portfolioItems : portfolioItems.filter(p => p.category === activeTab);

  return (
    <div style={{ background: WHITE, color: BLACK, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <Navbar />

      {/* ───────── HERO ───────── */}
      <section style={{ background: WHITE, paddingTop: "140px" }}>
        {/* 2-col: text left, mockups right */}
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "40px 24px 80px" }}>
          <div className="hero-grid">

            {/* LEFT */}
            <div className="hero-left">
              <Label>Content &amp; Marketing Engine</Label>

              <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.08, margin: "0 0 32px" }}>
                {["We", "build", "your", "marketing", "engine."].map((w, i) => (
                  <span key={i} className="fade-word" style={{ animationDelay: `${i * 0.15}s`, color: BLACK }}>{w}{" "}</span>
                ))}
                <br />
                {["You", "focus", "on", "your", "clients."].map((w, i) => (
                  <span key={i} className="fade-word" style={{ animationDelay: `${(5 + i) * 0.15}s`, color: ORANGE }}>{w}{" "}</span>
                ))}
              </h1>

              <p className="hero-sub-text" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: GRAY, maxWidth: "480px", margin: "0 0 48px", lineHeight: 1.7 }}>
                Done-for-you content and marketing for therapists, counselors, and wellness professionals.
              </p>

              <div className="hero-cta-row" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", background: BLACK, color: WHITE, padding: "16px 32px", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Get Free Audit
                </a>
              </div>

              <p className="hero-no-pitch" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY, textAlign: "center" }}>
                No pitch. No pressure. Just honest feedback.
              </p>
            </div>

            {/* RIGHT — floating mockups (desktop only via CSS) */}
            <div className="hero-mockups" aria-hidden="true">
              <div style={{ position: "relative", height: "480px", width: "100%" }}>
                {/* Frame A — back-left */}
                <div
                  className="mockup-float-a"
                  style={{ position: "absolute", top: "30px", left: "0px", width: "180px", height: "310px", border: `1px solid ${DIVIDER}`, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}
                >
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play style={{ width: "16px", height: "16px", color: WHITE, marginLeft: "3px" }} fill={WHITE} />
                  </div>
                </div>
                {/* Frame B — center */}
                <div
                  className="mockup-float-b"
                  style={{ position: "absolute", top: "80px", left: "100px", width: "190px", height: "330px", border: `1px solid ${DIVIDER}`, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}
                >
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(232,75,26,0.3)", border: "1px solid rgba(232,75,26,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play style={{ width: "16px", height: "16px", color: ORANGE, marginLeft: "3px" }} fill={ORANGE} />
                  </div>
                </div>
                {/* Frame C — front-right */}
                <div
                  className="mockup-float-c"
                  style={{ position: "absolute", top: "140px", left: "200px", width: "175px", height: "300px", border: `1px solid ${DIVIDER}`, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}
                >
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play style={{ width: "16px", height: "16px", color: WHITE, marginLeft: "3px" }} fill={WHITE} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* STATS BAR */}
        <div style={{ background: WHITE, borderTop: `1px solid ${DIVIDER}`, borderBottom: `1px solid ${DIVIDER}`, padding: "16px 24px" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
            {["160+ Clients", "1,000+ Content Pieces", "3 Years In Production"].map((s, i) => (
              <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY }}>
                {i > 0 && <span style={{ marginRight: "40px", color: DIVIDER }}>·</span>}
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* MARQUEE TICKER */}
        <div style={{ background: BLACK, padding: "16px 0", overflow: "hidden" }}>
          <div className="ticker-track">
            {[0, 1].map(rep => (
              <span key={rep} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap" }}>
                {["Video Editing", "Instagram Reels", "Content Strategy", "Landing Pages", "Email Sequences", "Short-Form Content", "Wellness Marketing", "Done For You"].map((item, i) => (
                  <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", textTransform: "uppercase", letterSpacing: "2px", color: "#F5F0EB", padding: "0 32px" }}>
                    {item}
                    <span style={{ marginLeft: "32px", color: ORANGE }}>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS ───────── */}
      <section style={{ background: DARK, padding: "80px 24px" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }}>
          {[
            { num: 160, suffix: "+", label: "Clients Helped" },
            { num: 1000, suffix: "+", label: "Content Pieces Produced" },
            { num: 3, suffix: " Years", label: "In Production" },
          ].map((s, i) => (
            <div
              key={i}
              style={{ textAlign: "center", padding: "0 32px", borderRight: i < 2 ? `1px solid ${DIVIDER2}` : "none" }}
            >
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", color: WHITE, lineHeight: 1 }}>
                <CountUp to={s.num} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: GRAY2, marginTop: "10px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── WHAT WE DO ───────── */}
      <section id="services" style={{ background: WARM, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <Label>What We Do</Label>
          <SectionHeadline style={{ maxWidth: "600px" }}>Everything you need to grow online</SectionHeadline>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0", marginTop: "64px" }}>
            {[
              { num: "01", title: "Content Production", desc: "Video editing, reels, and short-form content delivered every month — consistently and on-brand." },
              { num: "02", title: "Landing Pages", desc: "High-converting pages designed and built for your practice to capture leads and book sessions." },
              { num: "03", title: "Email Nurture Sequences", desc: "Automated email flows that turn leads into booked sessions — written, designed, and delivered." },
              { num: "04", title: "Content Strategy", desc: "A clear monthly plan for what to post, when, and why — built around your niche and goals." },
            ].map((item, i) => (
              <div
                key={i}
                style={{ borderTop: `1px solid ${DIVIDER}`, padding: "40px 40px 40px 0", paddingRight: i % 2 === 0 ? "56px" : "0", paddingLeft: i % 2 === 1 ? "56px" : "0" }}
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
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHO WE HELP ───────── */}
      <section style={{ background: WHITE, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <Label>Who We Help</Label>
          <SectionHeadline>Built for wellness professionals</SectionHeadline>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0", marginTop: "64px" }}>
            {[
              { title: "Therapists & Counselors", desc: "Build trust online, attract ideal clients, and stay consistent without adding hours to your week." },
              { title: "Wellness Coaches", desc: "Turn your expertise into compelling content that grows your audience and fills your calendar." },
              { title: "Mental Health Practitioners", desc: "Grow your practice with content that reflects the care and quality you bring to every session." },
            ].map((col, i) => (
              <div
                key={i}
                style={{ borderLeft: i > 0 ? `1px solid ${DIVIDER}` : "none", paddingLeft: i > 0 ? "48px" : "0", paddingRight: "48px" }}
              >
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: BLACK, marginBottom: "16px" }}>
                  {col.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: GRAY, lineHeight: 1.7, margin: 0 }}>
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PORTFOLIO ───────── */}
      <section id="work" style={{ background: WARM, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", marginBottom: "56px" }}>
            <div>
              <Label>Selected Work</Label>
              <SectionHeadline style={{ margin: 0 }}>Proof of performance.</SectionHeadline>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CATEGORIES.map(cat => (
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
                    border: `1px solid ${activeTab === cat ? BLACK : DIVIDER}`,
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "48px", alignItems: "start" }}>
            <div>
              <div style={{ borderTop: `1px solid ${DIVIDER}`, maxHeight: "520px", overflowY: "auto" }} className="hide-scrollbar">
                {filtered.map((item, i) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      padding: "18px 0",
                      borderBottom: `1px solid ${DIVIDER}`,
                      cursor: "pointer",
                      background: hovered?.id === item.id ? WARM : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: DIVIDER, width: "28px", flexShrink: 0, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: BLACK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: GRAY, marginTop: "2px" }}>{item.client}</div>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${DIVIDER}`, color: GRAY, flexShrink: 0 }}>
                      {item.category}
                    </span>
                    <div style={{ width: "32px", height: "32px", border: `1px solid ${DIVIDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: hovered?.id === item.id ? BLACK : "transparent", transition: "background 0.18s" }}>
                      <Play style={{ width: "11px", height: "11px", color: hovered?.id === item.id ? WHITE : GRAY, marginLeft: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "sticky", top: "88px" }}>
              <div style={{ aspectRatio: "16/9", background: WARM, border: `1px solid ${DIVIDER}`, overflow: "hidden", position: "relative" }}>
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
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              onClick={e => e.stopPropagation()}
              style={{ width: "100%", maxWidth: "880px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: WHITE }}>{activeVideo.title}</span>
                <button onClick={() => setActiveVideo(null)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "28px", color: GRAY, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
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

      {/* ───────── PACKAGES ───────── */}
      <section id="pricing" style={{ background: WARM, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Label>Pricing</Label>
            <SectionHeadline>Simple, transparent packages</SectionHeadline>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: GRAY, margin: 0 }}>
              No hidden fees. No long-term lock-ins.
            </p>
          </div>

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
              <div
                key={i}
                style={{
                  background: plan.dark ? BLACK : WHITE,
                  border: `1px solid ${plan.dark ? BLACK : DIVIDER}`,
                  padding: "40px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.popular && (
                  <div style={{ position: "absolute", top: "0", left: "40px", background: ORANGE, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", padding: "4px 12px", transform: "translateY(-100%)" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: plan.dark ? GRAY2 : GRAY, marginBottom: "20px" }}>
                    {plan.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "14px" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "48px", color: plan.dark ? WHITE : BLACK, lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: plan.dark ? GRAY2 : GRAY }}>{plan.period}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: plan.dark ? GRAY2 : GRAY, lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", flex: 1 }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                      <Check style={{ width: "14px", height: "14px", color: ORANGE, marginTop: "1px", flexShrink: 0 }} />
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
                    background: plan.dark ? WHITE : "transparent",
                    color: plan.dark ? BLACK : BLACK,
                    border: `1px solid ${plan.dark ? WHITE : BLACK}`,
                    padding: "14px 0",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = plan.dark ? GRAY2 : BLACK; e.currentTarget.style.color = WHITE; e.currentTarget.style.borderColor = plan.dark ? GRAY2 : BLACK; }}
                  onMouseLeave={e => { e.currentTarget.style.background = plan.dark ? WHITE : "transparent"; e.currentTarget.style.color = BLACK; e.currentTarget.style.borderColor = plan.dark ? WHITE : BLACK; }}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ABOUT / TEAM ───────── */}
      <section id="team" style={{ background: WHITE, padding: SEC_PAD }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <Label>About SetSpace</Label>
          <SectionHeadline style={{ maxWidth: "640px" }}>A remote content and marketing team built for wellness professionals</SectionHeadline>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start", marginTop: "64px" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: BLACK, lineHeight: 1.8, marginBottom: "24px" }}>
                We help therapists, counselors, and wellness professionals generate leads and grow online. We handle strategy, video editing, reels, landing pages, and email nurture sequences — so you can focus on your clients.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.8, marginBottom: "48px" }}>
                3 years in. 160+ clients helped. 1,000+ content pieces produced.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: DIVIDER }}>
                {[
                  { value: "160+", label: "Clients Helped" },
                  { value: "1,000+", label: "Content Pieces" },
                  { value: "4.9★", label: "Average Rating" },
                  { value: "48h", label: "Avg. Turnaround" },
                ].map((s, i) => (
                  <div key={i} style={{ background: WARM, padding: "24px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "28px", color: BLACK, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: GRAY, marginTop: "6px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ position: "relative", marginBottom: "2px" }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                  alt="Ateeb Hasan — Founder"
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", padding: "32px 24px 20px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: WHITE }}>Ateeb Hasan</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY2, marginTop: "4px" }}>Founder & Creative Lead</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                {teamMembers.slice(0, 6).map(m => (
                  <div key={m.name} style={{ flex: "1 1 calc(33.33% - 2px)", minWidth: "60px", position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    <img
                      src={`${import.meta.env.BASE_URL}images/${m.img}`}
                      alt={m.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section style={{ background: WARM, padding: SEC_PAD }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Label>FAQ</Label>
          <SectionHeadline>Common questions</SectionHeadline>

          <div style={{ marginTop: "56px" }}>
            {[
              { q: "What kinds of clients do you work with?", a: "Therapists, counselors, wellness coaches, and service-based professionals who need consistent content and marketing without managing an in-house team. If you want to grow online while focusing on your clients — we're a good fit." },
              { q: "How does the process work?", a: "You share your goals, existing content, and brand references. We build a content plan, start producing, and deliver on a set schedule every month. You review, approve, and publish — or we handle that too." },
              { q: "What's the turnaround time?", a: "Reels and short clips are delivered within 48 hours. Long-form video edits within 72 hours. On the Full Engine plan, same-day delivery is available for urgent content." },
              { q: "How do revisions work?", a: "You review via Google Drive or Frame.io and leave comments. We turn around revisions within 24 hours. Starter includes 3 revisions per piece; Growth and Full Engine include unlimited." },
              { q: "Is there a contract?", a: "No lock-in contracts. We work month-to-month. We believe results are the only reason to stay — if we're not delivering, you shouldn't be billed." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${DIVIDER}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: BLACK, lineHeight: 1.4 }}>{item.q}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "22px", color: ORANGE, flexShrink: 0, lineHeight: 1, fontWeight: 400 }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.75, paddingBottom: "24px", margin: 0 }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section style={{ background: WHITE, borderTop: `1px solid ${DIVIDER}`, padding: SEC_PAD, textAlign: "center" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(36px, 6vw, 72px)", color: BLACK, lineHeight: 1.08, margin: "0 auto 20px", maxWidth: "800px" }}>
            Ready to build your marketing engine?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: GRAY, marginBottom: "48px" }}>
            Book a free 20-minute audit call.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", background: BLACK, color: WHITE, padding: "18px 40px", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Book Free Audit
          </a>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: GRAY, marginTop: "20px" }}>
            We respond within 24 hours.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

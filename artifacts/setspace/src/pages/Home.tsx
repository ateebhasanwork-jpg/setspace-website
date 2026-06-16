import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE = "#E84B1A";
const BLACK = "#0A0A0A";
const CHARCOAL = "#1A1A1A";
const OFF_WHITE = "#F5F0EB";
const GRAY = "#888888";
const BORDER = "#2A2A2A";
const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";

function CountUp({ to, suffix = "", duration = 2400, delay = 400 }: { to: number; suffix?: string; duration?: number; delay?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    started.current = false;
    setValue(0);
    const el = ref.current;
    if (!el) return;
    let raf: number;
    let timeout: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        timeout = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(ease * to));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, [to, duration, delay]);
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

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

const portfolioCategories = ["All", "YouTube", "Reels", "Ads", "AI"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<typeof portfolioItems[0] | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredPortfolio = activeTab === "All"
    ? portfolioItems
    : portfolioItems.filter(p => p.category === activeTab);

  const teamMembers = [
    { name: "Zoha Adnan",      role: "Lead Gen Executive",          img: "zoha.jpeg" },
    { name: "Jaffer Naqvi",    role: "Video Designer",              img: "jaffer.jpeg" },
    { name: "Sani e Zehra",    role: "Social Media Designer",       img: "sani.jpeg" },
    { name: "Muhammad Ashhad", role: "Video Editor",                img: "ashad.jpeg" },
    { name: "Laiba Malik",     role: "HR & Ops Executive",          img: "laiba.jpeg" },
    { name: "Zayd Saleem",     role: "Explainer Video Specialist",  img: "zayd.jpeg" },
    { name: "Abdullah Khan",   role: "Motion Graphics Specialist",  img: "abdullah.jpeg" },
  ];

  return (
    <div style={{ background: BLACK, color: OFF_WHITE, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BLACK, paddingTop: "80px", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center", width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: ORANGE, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "28px", fontWeight: 600 }}>
              Content &amp; Marketing Engine
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 8vw, 96px)", color: OFF_WHITE, lineHeight: 1.02, letterSpacing: "1px", marginBottom: "28px", margin: "0 0 28px" }}>
              We build your<br />marketing engine.<br />
              <span style={{ color: ORANGE }}>You focus on your clients.</span>
            </h1>
            <p style={{ fontSize: "18px", color: GRAY, maxWidth: "620px", margin: "0 auto 44px", lineHeight: 1.75, fontWeight: 400 }}>
              Done-for-you content production and marketing for therapists, counselors, and wellness professionals — strategy, reels, landing pages, and email sequences, all handled for you.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: ORANGE, color: BLACK, fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1px", padding: "16px 48px", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Get Free Audit
              </a>
              <button
                onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: ORANGE, border: `1px solid ${ORANGE}`, fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1px", padding: "16px 48px", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = BLACK; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ORANGE; }}
              >
                See Our Work
              </button>
            </div>
          </motion.div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: ORANGE }} />
      </section>

      {/* ── STATS ── */}
      <section style={{ background: ORANGE, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", textAlign: "center" }}>
          {[
            { num: 160, suffix: "+", label: "Clients Helped" },
            { num: 1000, suffix: "+", label: "Content Pieces Produced" },
            { num: 3, suffix: " Years", label: "In Production" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ padding: "0 24px", borderRight: i < 2 ? `1px solid rgba(0,0,0,0.15)` : "none" }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 72px)", color: BLACK, lineHeight: 1, letterSpacing: "1px" }}>
                <CountUp to={stat.num} suffix={stat.suffix} />
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: BLACK, marginTop: "8px", fontWeight: 500 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section id="services" style={{ background: CHARCOAL, padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "64px" }}>
            <div style={{ color: ORANGE, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>What We Do</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", color: OFF_WHITE, lineHeight: 1.02, letterSpacing: "1px", margin: 0 }}>
              Everything you need to grow online
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }} className="grid-cols-1 md:grid-cols-2">
            {[
              { num: "01", title: "Content Production", desc: "Video editing, reels, and short-form content delivered every month — consistently and on-brand, without you lifting a finger in post." },
              { num: "02", title: "Landing Pages", desc: "High-converting pages designed and built for your practice. Capture leads, book sessions, and grow your email list on autopilot." },
              { num: "03", title: "Email Nurture Sequences", desc: "Automated email flows that turn leads into booked sessions. Written, designed, and delivered — ready to connect with your list." },
              { num: "04", title: "Content Strategy", desc: "A clear plan for what to post, when, and why. Built around your niche, your audience, and your goals — updated monthly." },
            ].map((service, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ background: BLACK, borderTop: `3px solid ${ORANGE}`, padding: "48px 40px", cursor: "default" }}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: ORANGE, lineHeight: 1, marginBottom: "20px", letterSpacing: "1px" }}>
                  {service.num}
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", color: OFF_WHITE, letterSpacing: "0.5px", marginBottom: "16px", margin: "0 0 16px" }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.7, margin: 0 }}>
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section style={{ background: BLACK, padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "72px" }}>
            <div style={{ color: ORANGE, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>Who We Help</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", color: OFF_WHITE, lineHeight: 1.02, letterSpacing: "1px", margin: 0 }}>
              Built for wellness professionals
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }} className="grid-cols-1 md:grid-cols-3">
            {[
              { title: "Therapists & Counselors", desc: "Build trust online, attract ideal clients, and stay consistent without adding hours to your week." },
              { title: "Wellness Coaches", desc: "Turn your expertise into compelling content that grows your audience and fills your calendar with qualified leads." },
              { title: "Mental Health Practitioners", desc: "Grow your practice with professional content that reflects the care and quality you bring to every session." },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "40px", paddingRight: "40px" }}
              >
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", color: OFF_WHITE, letterSpacing: "0.5px", marginBottom: "16px", margin: "0 0 16px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="work" style={{ background: CHARCOAL, padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", marginBottom: "56px" }}>
            <div>
              <div style={{ color: ORANGE, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>Selected Work</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", color: OFF_WHITE, lineHeight: 1.02, letterSpacing: "1px", margin: 0 }}>
                Proof of performance.
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {portfolioCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "8px 20px",
                    background: activeTab === cat ? ORANGE : "transparent",
                    color: activeTab === cat ? BLACK : GRAY,
                    border: `1px solid ${activeTab === cat ? ORANGE : BORDER}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="lg:grid-cols-[3fr_2fr]">
            <div>
              <div style={{ borderTop: `1px solid ${BORDER}`, maxHeight: "520px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: `${BORDER} transparent` }}>
                {filteredPortfolio.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.025 }}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                    style={{ display: "flex", alignItems: "center", gap: "20px", padding: "18px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: BORDER, width: "28px", flexShrink: 0, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: OFF_WHITE, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: GRAY, marginTop: "2px" }}>{item.client}</div>
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: GRAY, flexShrink: 0, display: "none" }} className="hidden md:block">
                      {item.type}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${BORDER}`, color: GRAY, flexShrink: 0 }}>
                      {item.category}
                    </span>
                    <div style={{ width: "32px", height: "32px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: hoveredItem?.id === item.id ? ORANGE : "transparent", transition: "background 0.2s" }}>
                      <Play style={{ width: "12px", height: "12px", color: hoveredItem?.id === item.id ? BLACK : OFF_WHITE, marginLeft: "2px" }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block" style={{ position: "sticky", top: "88px" }}>
              <div style={{ aspectRatio: "16/9", background: BLACK, border: `1px solid ${BORDER}`, overflow: "hidden", position: "relative" }}>
                {hoveredItem ? (
                  <>
                    <motion.img
                      key={hoveredItem.videoId}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={`https://img.youtube.com/vi/${hoveredItem.videoId}/maxresdefault.jpg`}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${hoveredItem.videoId}/hqdefault.jpg`; }}
                      alt={hoveredItem.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ORANGE, marginBottom: "4px" }}>{hoveredItem.client}</div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: OFF_WHITE, letterSpacing: "0.5px" }}>{hoveredItem.title}</div>
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                      <div style={{ width: "56px", height: "56px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Play style={{ width: "20px", height: "20px", color: "white", marginLeft: "3px" }} fill="white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", color: GRAY }}>
                    <div style={{ width: "44px", height: "44px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Play style={{ width: "16px", height: "16px", color: GRAY, marginLeft: "2px" }} />
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>Hover to preview</span>
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
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              style={{ width: "100%", maxWidth: "900px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "0 4px" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: OFF_WHITE, letterSpacing: "0.5px" }}>{activeVideo.title}</span>
                <button onClick={() => setActiveVideo(null)} style={{ fontFamily: "'Inter', sans-serif", fontSize: "28px", color: GRAY, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>
              <div style={{ position: "relative", aspectRatio: "16/9", background: BLACK }}>
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

      {/* ── PACKAGES ── */}
      <section id="pricing" style={{ background: CHARCOAL, padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: "72px" }}>
            <div style={{ color: ORANGE, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", color: OFF_WHITE, lineHeight: 1.02, letterSpacing: "1px", margin: "0 0 16px" }}>
              Simple, transparent packages
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: GRAY, margin: 0 }}>
              No hidden fees. No lock-in contracts. Start this month.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", alignItems: "start" }} className="grid-cols-1 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$800",
                period: "/mo",
                desc: "For wellness professionals getting started with consistent content.",
                features: ["8 reels / month", "Content strategy", "Basic social media management"],
                highlight: false,
              },
              {
                name: "Growth",
                price: "$1,500",
                period: "/mo",
                desc: "For growing practices ready to expand content and capture leads.",
                features: ["12 reels + 6 designs / month", "Content strategy", "Landing page (one-time setup)", "Email nurture sequence (3 emails)"],
                highlight: true,
              },
              {
                name: "Full Engine",
                price: "$2,500",
                period: "/mo",
                desc: "A complete done-for-you content and marketing operation.",
                features: ["Full content production (reels, designs, video)", "Strategy + landing page", "Full email nurture sequence", "Monthly performance review"],
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: BLACK,
                  padding: "48px 40px",
                  borderTop: plan.highlight ? `3px solid ${ORANGE}` : `3px solid ${BORDER}`,
                  borderLeft: plan.highlight ? `1px solid ${ORANGE}` : "none",
                  borderRight: plan.highlight ? `1px solid ${ORANGE}` : "none",
                  borderBottom: plan.highlight ? `1px solid ${ORANGE}` : "none",
                  position: "relative",
                  marginTop: plan.highlight ? "-8px" : "0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.highlight && (
                  <div style={{ position: "absolute", top: "-1px", left: "40px", background: ORANGE, color: BLACK, fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "1px", padding: "4px 14px" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: GRAY, marginBottom: "16px" }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: OFF_WHITE, lineHeight: 1, letterSpacing: "1px" }}>{plan.price}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: GRAY }}>{plan.period}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: GRAY, lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", flex: 1 }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                      <Check style={{ width: "14px", height: "14px", color: ORANGE, marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: GRAY, lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: plan.highlight ? ORANGE : "transparent", color: plan.highlight ? BLACK : ORANGE, border: `1px solid ${plan.highlight ? ORANGE : BORDER}`, fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "1px", padding: "14px 0", textDecoration: "none", textAlign: "center", display: "block", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = BLACK; e.currentTarget.style.borderColor = ORANGE; }}
                  onMouseLeave={e => { e.currentTarget.style.background = plan.highlight ? ORANGE : "transparent"; e.currentTarget.style.color = plan.highlight ? BLACK : ORANGE; e.currentTarget.style.borderColor = plan.highlight ? ORANGE : BORDER; }}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="team" style={{ background: BLACK, padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "72px" }}>
            <div style={{ color: ORANGE, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>About SetSpace</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 4.5vw, 56px)", color: OFF_WHITE, lineHeight: 1.05, letterSpacing: "1px", margin: 0, maxWidth: "700px" }}>
              We are a remote content and marketing agency
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
            <motion.div {...fadeUp}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", color: OFF_WHITE, lineHeight: 1.8, marginBottom: "24px" }}>
                We help therapists, counselors, and wellness professionals generate leads and grow online. We handle strategy, video editing, reels, landing pages, and email nurture sequences — so you can focus on your clients.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.8, marginBottom: "40px" }}>
                3 years in. 160+ clients helped. 1,000+ content pieces produced.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                {[
                  { value: "160+", label: "Clients Helped" },
                  { value: "1,000+", label: "Content Pieces" },
                  { value: "4.9★", label: "Average Rating" },
                  { value: "48h", label: "Avg. Turnaround" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: CHARCOAL, padding: "24px", borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", color: OFF_WHITE, letterSpacing: "1px", lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: GRAY, marginTop: "6px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <div style={{ position: "relative" }}>
                <img
                  src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                  alt="Ateeb Hasan — Founder"
                  style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", padding: "32px 24px 24px" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: OFF_WHITE, letterSpacing: "0.5px" }}>Ateeb Hasan</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: GRAY, marginTop: "4px" }}>Founder & Creative Lead</div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginTop: "2px" }}>
                {teamMembers.slice(0, 6).map(member => (
                  <div key={member.name} style={{ flex: "1 1 calc(33.33% - 2px)", minWidth: "80px", position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    <img
                      src={`${import.meta.env.BASE_URL}images/${member.img}`}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", filter: "grayscale(20%)" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", transition: "background 0.2s" }} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: CHARCOAL, padding: "120px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "64px" }}>
            <div style={{ color: ORANGE, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 60px)", color: OFF_WHITE, lineHeight: 1.02, letterSpacing: "1px", margin: 0 }}>
              Common questions
            </h2>
          </motion.div>

          <div>
            {[
              { q: "What kinds of clients do you work with?", a: "Therapists, counselors, wellness coaches, and service-based professionals who need consistent content and marketing without managing an in-house team. If you want to grow online while focusing on your clients — we're a good fit." },
              { q: "How does the process work?", a: "You share your goals, existing content, and brand references. We build a content plan, start producing, and deliver on a set schedule every month. You review, approve, and publish — or we handle that too." },
              { q: "What's the turnaround time?", a: "Reels and short clips are delivered within 48 hours. Long-form video edits within 72 hours. On the Full Engine plan, same-day delivery is available for urgent content." },
              { q: "How does feedback and revisions work?", a: "You review via Google Drive or Frame.io and leave comments. We turn around revisions within 24 hours. Starter includes 3 revisions per piece; Growth and Full Engine include unlimited." },
              { q: "Is there a contract?", a: "No lock-in contracts. We work month-to-month. We believe results are the only reason to stay — if we're not delivering, you shouldn't be billed." },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.06 }}
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", background: "none", border: "none", cursor: "pointer", gap: "24px", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: OFF_WHITE, letterSpacing: "0.5px", lineHeight: 1.2 }}>{item.q}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: ORANGE, flexShrink: 0, lineHeight: 1 }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: GRAY, lineHeight: 1.75, paddingBottom: "24px", margin: 0 }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: ORANGE, padding: "120px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 80px)", color: BLACK, lineHeight: 1.02, letterSpacing: "1px", marginBottom: "20px" }}>
              Ready to build your marketing engine?
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: BLACK, marginBottom: "48px", lineHeight: 1.6, opacity: 0.75 }}>
              Book a free 20-minute audit call. No pitch, no pressure — just honest feedback.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: BLACK, color: OFF_WHITE, fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "1px", padding: "18px 64px", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Book Free Audit
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

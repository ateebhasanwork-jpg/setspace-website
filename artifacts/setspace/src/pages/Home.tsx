import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Video, Youtube, Target, Wand2, Compass, Scissors, TrendingUp, Send, ChevronDown, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

function CountUp({ to, suffix = "", duration = 3200, delay = 700 }: { to: number; suffix?: string; duration?: number; delay?: number }) {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, [to, duration, delay]);

  return <span ref={ref}>{value}{suffix}</span>;
}

function CountUpFloat({ to, suffix = "", duration = 3600, delay = 700, decimals = 1 }: { to: number; suffix?: string; duration?: number; delay?: number; decimals?: number }) {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          timeout = setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              setValue(parseFloat((ease * to).toFixed(decimals)));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, [to, duration, delay, decimals]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<{ videoId: string; title: string; client: string; type: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const teamScrollRaf = useRef<number>(0);
  const { t } = useLang();

  useEffect(() => {
    const el = teamScrollRef.current;
    if (!el) return;
    const EDGE = 100;
    const SPEED = 6;
    const onMove = (e: MouseEvent) => {
      const { left, right } = el.getBoundingClientRect();
      const x = e.clientX;
      cancelAnimationFrame(teamScrollRaf.current);
      if (x < left + EDGE) {
        const intensity = 1 - (x - left) / EDGE;
        const scroll = () => { el.scrollLeft -= SPEED * intensity; teamScrollRaf.current = requestAnimationFrame(scroll); };
        teamScrollRaf.current = requestAnimationFrame(scroll);
      } else if (x > right - EDGE) {
        const intensity = 1 - (right - x) / EDGE;
        const scroll = () => { el.scrollLeft += SPEED * intensity; teamScrollRaf.current = requestAnimationFrame(scroll); };
        teamScrollRaf.current = requestAnimationFrame(scroll);
      }
    };
    const onLeave = () => cancelAnimationFrame(teamScrollRaf.current);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(teamScrollRaf.current); };
  }, []);

  const portfolioCategories = [t.portfolio.all, "Reels", "YouTube", "Ads", "AI"];

  const portfolioItems = [
    { id: 1,  title: "Motion Graphic Showreel",   client: "Setspace",               type: "Motion Graphics", category: "Reels",   videoId: "HDY0EHDyrxE" },
    { id: 2,  title: "AI Cinematic",               client: "Paw Positive",           type: "AI Video",        category: "AI",      videoId: "ll2fIXoiBpc" },
    { id: 3,  title: "Speaker Sizzle Reel",        client: "Elena",                  type: "Sizzle Reel",     category: "YouTube", videoId: "UZq7QXCE6mM" },
    { id: 4,  title: "YouTube Long Form",          client: "Profit Owl",             type: "Long Form",       category: "YouTube", videoId: "fGxUQfxc_dQ" },
    { id: 5,  title: "Explainer Video",            client: "Rent Keep",              type: "Explainer",       category: "Ads",     videoId: "P2RBeNQyB68" },
    { id: 6,  title: "Long Form Talking Head",     client: "Davina Hehn",            type: "Talking Head",    category: "YouTube", videoId: "ERwDtW146dc" },
    { id: 7,  title: "Meta Ad",                    client: "Shipping Made Good",     type: "Meta Ad",         category: "Ads",     videoId: "M4al9xujW7E" },
    { id: 8,  title: "Talking Head Short Form",    client: "Profit Owl",             type: "Short Form",      category: "Reels",   videoId: "w2U15wziQcw" },
    { id: 9,  title: "Informative Reel",           client: "Faceless",               type: "Motion Graphics", category: "Reels",   videoId: "oamKPmEShfo" },
    { id: 10, title: "Podcast Edit",               client: "Kyle Corbett",           type: "Podcast Edit",    category: "YouTube", videoId: "kvbTfcAIymU" },
    { id: 11, title: "Testimonials",               client: "Iron Master Awards",     type: "Testimonials",    category: "YouTube", videoId: "bWmb_8dzgTk" },
    { id: 12, title: "Promotional Video",          client: "Kyle",                   type: "Promo Video",     category: "YouTube", videoId: "HBejF0eQ2TA" },
    { id: 13, title: "Explainer Video",            client: "CyberCube",              type: "Explainer",       category: "Ads",     videoId: "IZo8Txy26xg" },
    { id: 14, title: "Podcast Short",              client: "A Steady Space",         type: "Podcast Short",   category: "Reels",   videoId: "W4Y0a2cz28E" },
    { id: 15, title: "UGC Ad",                     client: "Beast",                  type: "UGC Ad",          category: "Ads",     videoId: "EPi8_QC6ULE" },
    { id: 16, title: "Reel",                       client: "Klinik Europe",          type: "Reel",            category: "Reels",   videoId: "sum7TRFh28k" },
    { id: 17, title: "Talking Head Reel",          client: "Dr Lindsey",             type: "Talking Head",    category: "Reels",   videoId: "8iaVENpFw0I" },
    { id: 18, title: "Gym Reel",                   client: "Helal",                  type: "Lifestyle Reel",  category: "Reels",   videoId: "gkaBUIK-Y_U" },
    { id: 19, title: "Meta Ad",                    client: "Flagship Media",         type: "Meta Ad",         category: "Ads",     videoId: "4louAvpt_W0" },
    { id: 20, title: "YouTube Video",              client: "Unexpected Atlanta Tours",type: "Long Form",       category: "YouTube", videoId: "VysdDxP_oPo" },
  ];

  const filteredPortfolio = activeTab === t.portfolio.all
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab);

  const serviceIcons = [
    <Video className="w-7 h-7 mb-5 text-foreground/70" />,
    <Youtube className="w-7 h-7 mb-5 text-foreground/70" />,
    <Target className="w-7 h-7 mb-5 text-foreground/70" />,
    <Wand2 className="w-7 h-7 mb-5 text-foreground/70" />,
  ];

  const serviceTags = [
    ["48h delivery", "3 revisions", "Vertical format"],
    ["72h delivery", "3 revisions", "16:9 & 9:16"],
    ["48h delivery", "Multiple variants", "A/B ready"],
    ["Custom timeline", "Source files", "Brand kit"],
  ];

  const processIcons = [
    <Compass className="w-5 h-5" />,
    <Scissors className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <Send className="w-5 h-5" />,
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: "easeOut" },
  };


  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden noise-overlay">

        {/* Background video */}
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: "linear-gradient(135deg, #020202 0%, #141414 30%, #0a0a0a 60%, #050505 100%)" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw", objectFit: "cover" }}
          >
            <source src={`${import.meta.env.BASE_URL}videos/hero.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
        </div>

        {/* Animated blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="blob-1 absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="blob-2 absolute top-[30%] right-[10%] w-96 h-96 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="blob-3 absolute bottom-[20%] left-[40%] w-64 h-64 rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-foreground/60 text-xs font-medium uppercase tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t.hero.badge}
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.08] tracking-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {t.hero.headline1} <br />
            <span className="text-gradient">{t.hero.headline2}</span> <br />
            {t.hero.headline3}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-foreground/55 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            <Button size="lg" onClick={() => setContactOpen(true)} className="w-full sm:w-auto px-8">
              {t.hero.cta1}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8"
              onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.cta2}
            </Button>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-10 mt-12 pt-10 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <div className="text-center">
              <div className="text-3xl font-display font-bold"><CountUp to={300} suffix="+" /></div>
              <div className="text-xs text-foreground/45 mt-1 uppercase tracking-widest">Videos Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold"><CountUp to={100} suffix="+" /></div>
              <div className="text-xs text-foreground/45 mt-1 uppercase tracking-widest">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold"><CountUpFloat to={4.9} suffix="★" duration={2400} /></div>
              <div className="text-xs text-foreground/45 mt-1 uppercase tracking-widest">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-5 border-y border-border overflow-hidden bg-card/50">
        <div className="marquee-track">
          {[...t.marquee, ...t.marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-3 px-6 text-sm font-medium text-foreground/40 uppercase tracking-widest whitespace-nowrap">
              {item}
              <span className="w-1 h-1 rounded-full bg-foreground/20 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ── CLIENT LOGO STRIP ── */}
      <div className="py-12 border-b border-border bg-card/30 overflow-hidden">
        <p className="text-center text-xs font-semibold text-foreground/30 uppercase tracking-widest mb-8">Trusted by</p>
        <div className="marquee-track" style={{ animationDuration: "38s" }}>
          {[
            { name: "Flagship Media",    img: `${import.meta.env.BASE_URL}images/logo-flagship.png`,  url: "https://www.instagram.com/flagshipmedianyc/" },
            { name: "A Steady Space",    img: `${import.meta.env.BASE_URL}images/logo-steadyspace.png`, url: "https://www.asteadyspace.com/" },
            { name: "Enterprising Women",img: `${import.meta.env.BASE_URL}images/logo-ewf.png`,      url: "https://www.enterprisingwomenfoundation.org/" },
            { name: "Unexpected Atlanta",img: `${import.meta.env.BASE_URL}images/logo-unexpected.png`, url: "https://unexpectedatlanta.com/" },
            { name: "Pawsitive Paws",    img: `${import.meta.env.BASE_URL}images/logo-pawsitive.svg`,url: "https://pawsitivepawsresort.com/" },
            { name: "Sweet Bee Naturals",img: `${import.meta.env.BASE_URL}images/logo-sweetbee.png`, url: "https://sweetbeenaturals.com/" },
            { name: "Clutch Moving",     img: `${import.meta.env.BASE_URL}images/logo-clutch.png`,   url: "https://clutchmovingcompany.com/" },
            { name: "SBD Canada",        img: `${import.meta.env.BASE_URL}images/logo-sbd.png`,      url: "https://sbdcanada.ca/" },
            { name: "Flagship Media",    img: `${import.meta.env.BASE_URL}images/logo-flagship.png`,  url: "https://www.instagram.com/flagshipmedianyc/" },
            { name: "A Steady Space",    img: `${import.meta.env.BASE_URL}images/logo-steadyspace.png`, url: "https://www.asteadyspace.com/" },
            { name: "Enterprising Women",img: `${import.meta.env.BASE_URL}images/logo-ewf.png`,      url: "https://www.enterprisingwomenfoundation.org/" },
            { name: "Unexpected Atlanta",img: `${import.meta.env.BASE_URL}images/logo-unexpected.png`, url: "https://unexpectedatlanta.com/" },
            { name: "Pawsitive Paws",    img: `${import.meta.env.BASE_URL}images/logo-pawsitive.svg`,url: "https://pawsitivepawsresort.com/" },
            { name: "Sweet Bee Naturals",img: `${import.meta.env.BASE_URL}images/logo-sweetbee.png`, url: "https://sweetbeenaturals.com/" },
            { name: "Clutch Moving",     img: `${import.meta.env.BASE_URL}images/logo-clutch.png`,   url: "https://clutchmovingcompany.com/" },
            { name: "SBD Canada",        img: `${import.meta.env.BASE_URL}images/logo-sbd.png`,      url: "https://sbdcanada.ca/" },
          ].map((client, i) => (
            <a
              key={i}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2.5 px-10 group cursor-pointer shrink-0"
            >
              <div className="w-20 h-12 flex items-center justify-center opacity-30 grayscale group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={client.img}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <span className="text-[10px] font-medium text-foreground/25 group-hover:text-foreground/60 tracking-wider uppercase transition-colors duration-300 whitespace-nowrap">
                {client.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t.services.label}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold max-w-xl">{t.services.headline}</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.services.items.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-card-border hover:border-foreground/20 transition-all duration-400 flex flex-col"
              >
                {serviceIcons[i]}
                <h4 className="text-xl font-display font-semibold mb-3">{service.title}</h4>
                <p className="text-foreground/50 leading-relaxed text-sm mb-5 flex-1">{service.desc}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {serviceTags[i].map((tag, ti) => (
                    <span key={ti} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-foreground/[0.06] border border-border text-foreground/40 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="work" className="py-28 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <motion.div {...fadeIn}>
              <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t.portfolio.label}</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">{t.portfolio.headline}</h3>
            </motion.div>

            <motion.div {...fadeIn} className="flex flex-wrap gap-2">
              {portfolioCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === cat
                      ? "bg-foreground text-background"
                      : "bg-card border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Editorial list + sticky preview */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">

            {/* ── Project list ── */}
            <div className="relative">
              <div className="divide-y divide-border/50 max-h-[520px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(var(--border)) transparent" }}>
              {filteredPortfolio.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setActiveVideo({ videoId: item.videoId, title: item.title })}
                  className="group flex items-center gap-5 py-5 cursor-pointer"
                >
                  {/* Number */}
                  <span className="font-mono text-xs text-foreground/20 w-7 flex-shrink-0 select-none group-hover:text-foreground/50 transition-colors duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title + client */}
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-[15px] leading-snug group-hover:translate-x-1 transition-transform duration-200 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-foreground/40 mt-0.5">{item.client}</div>
                  </div>

                  {/* Type badge — hidden on mobile */}
                  <span className="hidden md:block text-[11px] text-foreground/30 group-hover:text-foreground/50 transition-colors duration-200 flex-shrink-0">
                    {item.type}
                  </span>

                  {/* Category pill */}
                  <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-foreground/40 group-hover:border-foreground/30 group-hover:text-foreground/60 transition-all duration-200 flex-shrink-0">
                    {item.category}
                  </span>

                  {/* Play icon */}
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground/50 group-hover:bg-foreground group-hover:text-background transition-all duration-200">
                    <Play className="w-3 h-3 ms-0.5" />
                  </div>
                </motion.div>
              ))}
              </div>
              {/* Bottom fade hint */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/40 to-transparent rounded-b-xl" />
            </div>

            {/* ── Sticky preview panel ── */}
            <div className="hidden lg:block sticky top-24">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border/50">
                {hoveredItem ? (
                  <>
                    <motion.img
                      key={hoveredItem.videoId}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      src={`https://img.youtube.com/vi/${hoveredItem.videoId}/maxresdefault.jpg`}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${hoveredItem.videoId}/hqdefault.jpg`; }}
                      alt={hoveredItem.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-1">{hoveredItem.client}</div>
                      <div className="font-display font-bold text-white text-base leading-tight">{hoveredItem.title}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{hoveredItem.type}</div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Play className="w-5 h-5 text-white ms-0.5" fill="white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/20 select-none">
                    <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center">
                      <Play className="w-4 h-4 ms-0.5" />
                    </div>
                    <span className="text-xs tracking-widest uppercase">Hover to preview</span>
                  </div>
                )}
              </div>

              {/* Stats below preview */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {(["Reels", "YouTube", "Ads"] as const).map(cat => {
                  const count = filteredPortfolio.filter(p => p.category === cat).length;
                  return (
                    <div key={cat} className="bg-card rounded-xl border border-border/50 p-3 text-center">
                      <div className="font-display font-bold text-lg">{count}</div>
                      <div className="text-[10px] text-foreground/40 uppercase tracking-wider mt-0.5">{cat}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-white font-display font-semibold text-lg">{activeVideo.title}</h3>
              <button onClick={() => setActiveVideo(null)} className="text-white/50 hover:text-white transition-colors text-3xl leading-none">×</button>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* ── PROCESS ── */}
      <section id="process" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t.process.label}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">{t.process.headline}</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {/* Connector line */}
                {i < t.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 start-[4.5rem] end-0 h-px bg-gradient-to-r from-border to-transparent" />
                )}
                {/* Icon circle */}
                <div className="w-10 h-10 rounded-full bg-foreground/[0.07] border border-border flex items-center justify-center text-foreground/50 mb-5 relative z-10">
                  {processIcons[i]}
                </div>
                <div className="text-5xl font-display font-black text-foreground/[0.05] mb-3 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-lg font-display font-semibold mb-2">{step.title}</h4>
                <p className="text-foreground/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Pricing</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Simple, transparent pricing.</h3>
            <p className="text-foreground/50 mt-4 leading-relaxed">No hidden fees. No contracts. Start with any plan and scale as you grow.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "Starter",
                price: "$399",
                period: "/month",
                desc: "For creators and small brands getting started with consistent content.",
                features: ["8 short-form videos/mo", "48h delivery", "3 revisions per video", "Captions & subtitles", "Basic motion graphics", "Direct communication"],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Growth",
                price: "$799",
                period: "/month",
                desc: "For brands publishing daily and growing across multiple platforms.",
                features: ["10 short-form videos/mo", "2 YouTube long-form edits", "24h priority delivery", "Unlimited revisions", "Custom motion & graphics", "Weekly strategy call", "Thumbnail design"],
                cta: "Most Popular",
                highlight: true,
              },
              {
                name: "Scale",
                price: "Custom",
                period: "",
                desc: "For agencies and high-volume brands needing a dedicated editing partner.",
                features: ["Unlimited videos", "Dedicated editor", "Same-day delivery", "Full brand kit management", "Ad creatives & A/B variants", "Slack/WhatsApp workflow", "Monthly performance report"],
                cta: "Let's Talk",
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-foreground text-background border-foreground shadow-2xl scale-[1.02]"
                    : "bg-card border-card-border hover:border-foreground/20"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-background text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-border flex items-center gap-1.5">
                      <Zap className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className={`text-sm font-semibold uppercase tracking-widest mb-3 ${plan.highlight ? "text-background/60" : "text-foreground/50"}`}>{plan.name}</h4>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-4xl font-display font-bold">{plan.price}</span>
                    {plan.period && <span className={`text-sm mb-1 ${plan.highlight ? "text-background/50" : "text-foreground/40"}`}>{plan.period}</span>}
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.highlight ? "text-background/60" : "text-foreground/50"}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-background/70" : "text-foreground/40"}`} />
                      <span className={plan.highlight ? "text-background/80" : "text-foreground/65"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setContactOpen(true)}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    plan.highlight
                      ? "bg-background text-foreground border-background hover:bg-background/90"
                      : "bg-transparent border-border text-foreground hover:bg-foreground/5 hover:border-foreground/30"
                  }`}
                >
                  {plan.cta} <ArrowRight className="inline w-3.5 h-3.5 ms-1.5 -mt-0.5" />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeIn} className="text-center text-foreground/35 text-sm mt-10">
            Not sure which plan fits? <button onClick={() => setContactOpen(true)} className="text-foreground/60 hover:text-foreground underline underline-offset-2 transition-colors">Let's figure it out together →</button>
          </motion.p>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-28 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-14">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t.team.label}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">{t.team.headline}</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            {/* Photo */}
            <div className="relative group overflow-hidden rounded-2xl bg-muted aspect-[4/5] max-w-sm mx-auto md:mx-0 w-full">
              <img
                src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                alt="Ateeb Hasan"
                className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 start-5">
                <div className="text-white font-display font-bold text-lg">Ateeb Hasan</div>
                <div className="text-white/60 text-sm">Creative Lead & Project Manager</div>
              </div>
            </div>

            {/* Bio & facts */}
            <div className="space-y-7">
              <p className="text-foreground/65 text-lg leading-relaxed">
                Hi, I'm Ateeb, the person behind every project at Setspace. I started this agency because I saw how powerful high-quality video content is for growing brands, and I wanted to make that accessible without the complexity of a big production house.
              </p>
              <p className="text-foreground/50 leading-relaxed">
                I work closely with every client from brief to final file. No hand-offs to junior editors, no surprises. You get direct communication, fast turnarounds, and edits built around your audience's retention.
              </p>

              {/* Fact row */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { value: "300+", label: "Videos Delivered" },
                  { value: "100+", label: "Happy Clients" },
                  { value: "4.9★", label: "Average Rating" },
                  { value: "48h", label: "Avg. Turnaround" },
                ].map((fact, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background border border-border">
                    <div className="text-2xl font-display font-bold mb-0.5">{fact.value}</div>
                    <div className="text-xs text-foreground/40 uppercase tracking-widest">{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rest of the team */}
          <div className="mt-16 pt-12 border-t border-border">
            <h4 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-8">Also on the team</h4>
            <div ref={teamScrollRef} className="flex gap-4 overflow-x-auto -mx-6 px-6 hide-scrollbar">
              {[
                { name: "Zoha Adnan", role: "Lead Gen Executive", img: "zoha.jpeg", objPos: "center 8%", linkedin: "#", instagram: "#" },
                { name: "Jaffer Naqvi", role: "Video Designer", img: "jaffer.jpeg", objPos: "center 5%", linkedin: "#", instagram: "#" },
                { name: "Sani e Zehra", role: "Social Media Designer", img: "sani.jpeg", objPos: "center 5%", linkedin: "#", instagram: "#" },
                { name: "Muhammad Ashhad", role: "Video Editor", img: "ashad.jpeg", objPos: "center 5%", linkedin: "#", instagram: "#" },
                { name: "Laiba Malik", role: "HR & Ops Executive", img: "laiba.jpeg", objPos: "center 8%", linkedin: "#", instagram: "#" },
                { name: "Zayd Saleem", role: "Explainer Video Specialist", img: "zayd.jpeg", objPos: "center 5%", linkedin: "#", instagram: "#" },
                { name: "Abdullah Khan", role: "Motion Graphics Specialist", img: "abdullah.jpeg", objPos: "center 5%", linkedin: "#", instagram: "#" },
                { name: "Salman Aqeel", role: "Junior Editor", img: "salman.png", objPos: "center 15%", linkedin: "#", instagram: "#" },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative group flex-shrink-0 w-44 overflow-hidden rounded-2xl bg-muted aspect-[3/4]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/${member.img}?v=2`}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 brightness-90"
                    style={{ objectPosition: member.objPos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 start-3 end-3">
                    <div className="text-white font-display font-semibold text-xs leading-tight">{member.name}</div>
                    <div className="text-white/55 text-[10px] mt-0.5 mb-2">{member.role}</div>
                    <div className="flex gap-1.5">
                      {member.linkedin !== "#" && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors">
                          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                      {member.instagram !== "#" && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors">
                          <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-28 bg-background overflow-hidden">
        {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-14 px-6">
          <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t.reviews.label}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">{t.reviews.headline}</h3>
        </motion.div>

        {(() => {
          const StarRow = () => (
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          );

          const ReviewCard = ({ review }: { review: { quote: string; name: string; role: string; link: string; initials: string; platform?: string } }) => (
            <div className="flex-shrink-0 w-80 mx-3 p-6 rounded-2xl bg-card border border-card-border hover:border-foreground/20 transition-colors duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <StarRow />
                  {review.platform && (
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-border text-foreground/30">
                      {review.platform}
                    </span>
                  )}
                </div>
                <blockquote className="text-foreground/65 text-sm leading-relaxed line-clamp-4">
                  "{review.quote}"
                </blockquote>
              </div>
              <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-border/50">
                <div className="w-8 h-8 rounded-full bg-foreground/10 border border-border flex items-center justify-center text-[9px] font-bold text-foreground/50 shrink-0">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-foreground truncate">{review.name}</div>
                  <a href={review.link} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-foreground/35 group-hover:text-foreground/60 transition-colors truncate block">
                    {review.role} ↗
                  </a>
                </div>
              </div>
            </div>
          );

          const row1 = [
            { quote: "Ateeb and his team are the best I've worked with. Their service is beyond just video editing. They've given me strategies, suggestions to grow, delivered to me more than what I asked for, and stayed in touch through the entire process. Communication is excellent. This is where I'm going when I need content work and I can't recommend them enough.", name: "Muhammad Helal", role: "Founder, Flagship Media", link: "https://www.instagram.com/flagshipmedianyc/", initials: "MH" },
            { quote: "Ateeb has been a phenomenal collaborator. I found him after a previous freelancer no-showed me at the last minute & I'm so grateful they did. He revamped my entire system and processes with ease, guided and taught me best practices, went beyond the scope without hesitating, and delivered well before deadline.", name: "Davina Hehn", role: "Founder, A Steady Space", link: "https://www.asteadyspace.com/", initials: "DH", platform: "Upwork" },
            { quote: "Amazing job. The work was clear, efficient, and completely exceeded my expectations. Communication was smooth with no confusion throughout the project. I will absolutely hire this freelancer again for future projects. Highly recommended.", name: "Dr. Luzelena Rivers", role: "Enterprising Women Foundation", link: "https://www.enterprisingwomenfoundation.org/dr-luzelena-rivers/", initials: "ER" },
            { quote: "Great content and communication!", name: "Unexpected Atlanta", role: "Tour & Experience Company", link: "https://unexpectedatlanta.com/tours/", initials: "UA" },
          ];

          const row2 = [
            { quote: "Ateeb and his team was great. They created a short video for me to use for crowd funding and website use. This was the first freelance I worked with that made it a point to communicate via zoom often which helped build trust and alignment for the project. I will be using his services again.", name: "PawPositive", role: "Pawsitive Paws Resort", link: "https://pawsitivepawsresort.com/", initials: "PP" },
            { quote: "It was a great experience working with Ateeb and his agency, SetSpace. Their communication was clear, expectations were well defined, and the workflow was smooth throughout the project. I truly appreciated the collaboration.", name: "SweetBeeMagic", role: "Sweet Bee Naturals", link: "https://sweetbeenaturals.com/", initials: "SB", platform: "Upwork" },
            { quote: "I highly recommend working with Setspace! The work came out greatly and I look forward to working with him in the future!", name: "Steven Mandac", role: "Owner, Clutch Moving Company", link: "https://clutchmovingcompany.com/", initials: "SM" },
          ];

          return (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-4">
              {/* Row 1 — scrolls left */}
              <div className="reviews-fade-mask overflow-hidden">
                <div className="marquee-track" style={{ animationDuration: "40s" }}>
                  {[...row1, ...row1].map((r, i) => <ReviewCard key={i} review={r} />)}
                </div>
              </div>
              {/* Row 2 — scrolls right */}
              <div className="reviews-fade-mask overflow-hidden">
                <div className="marquee-track-reverse" style={{ animationDuration: "34s" }}>
                  {[...row2, ...row2, ...row2].map((r, i) => <ReviewCard key={i} review={r} />)}
                </div>
              </div>
            </motion.div>
          );
        })()}
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-card/40">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">FAQ</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Common questions.</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            {[
              {
                q: "How fast do you deliver a finished video?",
                a: "Most short-form edits (Reels, TikToks, Ads) are delivered within 48 hours of receiving your raw footage. YouTube long-form videos take 72 hours. Rush delivery is available on request.",
              },
              {
                q: "How many revisions do I get?",
                a: "Starter and Growth plans include 3 revisions per video. The Scale plan includes unlimited revisions. A revision is a single round of feedback; we aim to nail it in the first pass anyway.",
              },
              {
                q: "What do I need to send you?",
                a: "Just your raw footage and a brief telling us the vibe, goal, and any references you like. You don't need a script; we can work from talking points or even help you structure the narrative.",
              },
              {
                q: "How do we communicate during a project?",
                a: "We work via a simple Google Drive + Notion system, with a dedicated Slack or WhatsApp channel on Growth and Scale plans. You'll always know the status of your video without having to chase.",
              },
              {
                q: "What formats do you deliver in?",
                a: "We deliver in MP4 (H.264) by default, optimised per platform: 9:16 for Reels/TikTok, 16:9 for YouTube, 1:1 or 4:5 for feed posts. Source files available on request.",
              },
              {
                q: "Do you work with brands outside of North America?",
                a: "Absolutely. We work with clients across Canada, the US, the UK, and internationally. Time zones are rarely an issue; we keep async communication clean and responsive.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-foreground/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-start gap-4"
                >
                  <span className="font-medium text-foreground leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-foreground/40 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-6 pb-5 text-sm text-foreground/55 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.03] blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn}>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
              {t.cta.headline}
            </h2>
            <p className="text-xl text-foreground/45 mb-10 max-w-xl mx-auto leading-relaxed">
              {t.cta.sub}
            </p>
            <Button size="lg" onClick={() => setContactOpen(true)} className="h-13 px-8 text-base">
              {t.cta.btn} <ArrowRight className="ms-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}

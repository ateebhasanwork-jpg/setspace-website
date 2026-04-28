import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Video, Youtube, Target, Wand2, Compass, Scissors, TrendingUp, Send, ChevronDown, Check, Zap, FileVideo, Clapperboard, BarChart3 } from "lucide-react";
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
  }, [to, duration, delay]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

const CALENDLY = "https://calendly.com/ateebhasan-work/new-meeting";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<{ videoId: string; title: string; client: string; type: string } | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const teamScrollRaf = useRef<number>(0);
  const { t } = useLang();

  useEffect(() => {
    const SPEED = 0.4;
    const el = teamScrollRef.current;
    if (!el) return;
    let intensity = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const zone = rect.width * 0.18;
      cancelAnimationFrame(teamScrollRaf.current);
      if (x < zone) {
        intensity = 1 - x / zone;
        const scroll = () => { el.scrollLeft -= SPEED * intensity; teamScrollRaf.current = requestAnimationFrame(scroll); };
        teamScrollRaf.current = requestAnimationFrame(scroll);
      } else if (x > rect.width - zone) {
        intensity = 1 - (rect.width - x) / zone;
        const scroll = () => { el.scrollLeft += SPEED * intensity; teamScrollRaf.current = requestAnimationFrame(scroll); };
        teamScrollRaf.current = requestAnimationFrame(scroll);
      }
    };
    const onLeave = () => cancelAnimationFrame(teamScrollRaf.current);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(teamScrollRaf.current); };
  }, []);

  const portfolioItems = [
    { id: 1,  title: "Finance Talking Head",       client: "Finance Creator",         type: "Talking Head",    category: "YouTube", videoId: "kvbTfcAIymU" },
    { id: 2,  title: "YouTube Long-Form Edit",      client: "Unexpected Atlanta Tours", type: "Long Form",       category: "YouTube", videoId: "VysdDxP_oPo" },
    { id: 3,  title: "Testimonials Compilation",    client: "Iron Master Awards",      type: "Testimonials",    category: "YouTube", videoId: "bWmb_8dzgTk" },
    { id: 4,  title: "Promotional Video",           client: "Kyle",                    type: "Promo Video",     category: "YouTube", videoId: "HBejF0eQ2TA" },
    { id: 5,  title: "Talking Head Reel",           client: "Dr Lindsey",              type: "Talking Head",    category: "Reels",   videoId: "8iaVENpFw0I" },
    { id: 6,  title: "Podcast Short Clip",          client: "A Steady Space",          type: "Podcast Short",   category: "Reels",   videoId: "W4Y0a2cz28E" },
    { id: 7,  title: "Gym Lifestyle Reel",          client: "Muhammad Helal",          type: "Lifestyle Reel",  category: "Reels",   videoId: "gkaBUIK-Y_U" },
    { id: 8,  title: "Informative Reel",            client: "Faceless Creator",        type: "Motion Graphics", category: "Reels",   videoId: "oamKPmEShfo" },
    { id: 9,  title: "Brand Reel",                  client: "Klinik Europe",           type: "Reel",            category: "Reels",   videoId: "sum7TRFh28k" },
    { id: 10, title: "Fitness Content Reel",        client: "Creator",                 type: "Lifestyle Reel",  category: "Reels",   videoId: "l5_OVdR_MWo" },
    { id: 11, title: "Explainer Ad",                client: "CyberCube",               type: "Explainer",       category: "Ads",     videoId: "IZo8Txy26xg" },
    { id: 12, title: "UGC Ad",                      client: "Beast",                   type: "UGC Ad",          category: "Ads",     videoId: "EPi8_QC6ULE" },
    { id: 13, title: "Meta Ad Creative",            client: "Flagship Media",          type: "Meta Ad",         category: "Ads",     videoId: "4louAvpt_W0" },
    { id: 14, title: "AI Brand Video",              client: "Setspace",                type: "AI Generated",    category: "AI",      videoId: "kQJRCMOGjvA" },
    { id: 15, title: "AI Product Showcase",         client: "Tech Brand",              type: "AI Showcase",     category: "AI",      videoId: "NWxk_O1Zf6Q" },
    { id: 16, title: "AI Cinematic Edit",           client: "Creative Studio",         type: "AI Cinematic",    category: "AI",      videoId: "K3DznIcAKMo" },
    { id: 17, title: "Motion Graphics Package",     client: "SBD Canada",              type: "Motion Graphics", category: "AI",      videoId: "D7gJMWCYMqc" },
    { id: 18, title: "AI Talking Avatar",           client: "Brand",                   type: "AI Avatar",       category: "AI",      videoId: "fBfNpVJhBrE" },
    { id: 19, title: "Finance Short Clip",          client: "Finance Expert",          type: "Talking Head",    category: "Reels",   videoId: "kvbTfcAIymU" },
    { id: 20, title: "YouTube Channel Trailer",     client: "Creator",                 type: "Channel Trailer", category: "YouTube", videoId: "bWmb_8dzgTk" },
  ];

  const portfolioCategories = [t.portfolio.all, "YouTube", "Reels", "Ads", "AI"];

  const filteredPortfolio = activeTab === t.portfolio.all
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab);

  const processIcons = [
    <Clapperboard className="w-5 h-5" />,
    <Scissors className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
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
              Accepting New Clients
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.08] tracking-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            The content engine for<br />
            <span className="text-gradient">finance experts</span><br />
            building authority on YouTube.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-foreground/55 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            You film 2–4 hours a month. We turn it into a polished YouTube channel, plus shorts and LinkedIn-ready clips. Done-for-you, end to end.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Book a 20-min strategy call <ArrowRight className="w-4 h-4" />
            </a>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8"
              onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Work
            </Button>
          </motion.div>

          <motion.p
            className="text-foreground/35 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            Trusted by finance creators and founders. Top Rated Plus on Upwork. ~$70K delivered.
          </motion.p>

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
            <div className="text-center">
              <div className="text-3xl font-display font-bold">~$70K</div>
              <div className="text-xs text-foreground/45 mt-1 uppercase tracking-widest">Delivered on Upwork</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-5 border-y border-border overflow-hidden bg-card/50">
        <div className="marquee-track">
          {[...["YouTube Long-Form", "Shorts & Reels", "LinkedIn Clips", "Talking Head Editing", "Finance Content", "Thumbnails", "Channel Strategy", "Podcast Clips", "Done-For-You"], ...["YouTube Long-Form", "Shorts & Reels", "LinkedIn Clips", "Talking Head Editing", "Finance Content", "Thumbnails", "Channel Strategy", "Podcast Clips", "Done-For-You"]].map((item, i) => (
            <span key={i} className="flex items-center gap-3 px-6 text-sm font-medium text-foreground/40 uppercase tracking-widest whitespace-nowrap">
              {item}
              <span className="w-1 h-1 rounded-full bg-foreground/20 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ── CLIENT LOGOS ── */}
      <div className="py-12 border-b border-border bg-card/30 overflow-hidden">
        <p className="text-center text-xs font-semibold text-foreground/30 uppercase tracking-widest mb-8">Trusted by</p>
        <div className="marquee-track" style={{ animationDuration: "38s" }}>
          {[
            { name: "Flagship Media",     img: `${import.meta.env.BASE_URL}images/logo-flagship.png`,   url: "https://www.instagram.com/flagshipmedianyc/" },
            { name: "A Steady Space",     img: `${import.meta.env.BASE_URL}images/logo-steadyspace.png`,url: "https://www.asteadyspace.com/" },
            { name: "Enterprising Women", img: `${import.meta.env.BASE_URL}images/logo-ewf.png`,        url: "https://www.enterprisingwomenfoundation.org/" },
            { name: "Unexpected Atlanta", img: `${import.meta.env.BASE_URL}images/logo-unexpected.png`, url: "https://unexpectedatlanta.com/" },
            { name: "Pawsitive Paws",     img: `${import.meta.env.BASE_URL}images/logo-pawsitive.svg`,  url: "https://pawsitivepawsresort.com/" },
            { name: "Sweet Bee Naturals", img: `${import.meta.env.BASE_URL}images/logo-sweetbee.png`,   url: "https://sweetbeenaturals.com/" },
            { name: "Clutch Moving",      img: `${import.meta.env.BASE_URL}images/logo-clutch.png`,     url: "https://clutchmovingcompany.com/" },
            { name: "SBD Canada",         img: `${import.meta.env.BASE_URL}images/logo-sbd.png`,        url: "https://sbdcanada.ca/" },
            { name: "Flagship Media",     img: `${import.meta.env.BASE_URL}images/logo-flagship.png`,   url: "https://www.instagram.com/flagshipmedianyc/" },
            { name: "A Steady Space",     img: `${import.meta.env.BASE_URL}images/logo-steadyspace.png`,url: "https://www.asteadyspace.com/" },
            { name: "Enterprising Women", img: `${import.meta.env.BASE_URL}images/logo-ewf.png`,        url: "https://www.enterprisingwomenfoundation.org/" },
            { name: "Unexpected Atlanta", img: `${import.meta.env.BASE_URL}images/logo-unexpected.png`, url: "https://unexpectedatlanta.com/" },
            { name: "Pawsitive Paws",     img: `${import.meta.env.BASE_URL}images/logo-pawsitive.svg`,  url: "https://pawsitivepawsresort.com/" },
            { name: "Sweet Bee Naturals", img: `${import.meta.env.BASE_URL}images/logo-sweetbee.png`,   url: "https://sweetbeenaturals.com/" },
            { name: "Clutch Moving",      img: `${import.meta.env.BASE_URL}images/logo-clutch.png`,     url: "https://clutchmovingcompany.com/" },
            { name: "SBD Canada",         img: `${import.meta.env.BASE_URL}images/logo-sbd.png`,        url: "https://sbdcanada.ca/" },
          ].map((client, i) => (
            <a key={i} href={client.url} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-2.5 px-10 group cursor-pointer shrink-0"
            >
              <div className="w-20 h-12 flex items-center justify-center opacity-30 grayscale group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500">
                <img src={client.img} alt={client.name} className="max-w-full max-h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <span className="text-[10px] font-medium text-foreground/25 group-hover:text-foreground/60 tracking-wider uppercase transition-colors duration-300 whitespace-nowrap">
                {client.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <section className="py-28 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-14 text-center">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Sound familiar?</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">The problem we solve.</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "I have insights to share, but editing eats my week.", icon: "⏳" },
              { quote: "I've tried freelancers — quality is inconsistent and onboarding is painful.", icon: "😤" },
              { quote: "I want a content engine, not another vendor to manage.", icon: "🎯" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="p-8 rounded-2xl bg-card border border-card-border flex flex-col gap-4"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-foreground/70 text-lg leading-relaxed font-medium">"{item.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="py-28 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">How It Works</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Three steps, zero stress.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clapperboard className="w-5 h-5" />,
                title: "You film.",
                desc: "Talking head, podcast, Zoom — whatever cadence works for you. Film 2–4 hours a month and send it over. That's your only job.",
              },
              {
                icon: <Scissors className="w-5 h-5" />,
                title: "We produce.",
                desc: "Long-form YouTube edits, plus 5–8 shorts per video, thumbnails, and LinkedIn-ready clips — fully edited and ready to publish.",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "You publish, grow, repeat.",
                desc: "Post on YouTube, Shorts, Reels, and LinkedIn. Build authority consistently without editing eating your calendar.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-5 start-[4.5rem] end-0 h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="w-10 h-10 rounded-full bg-foreground/[0.07] border border-border flex items-center justify-center text-foreground/50 mb-5 relative z-10">
                  {step.icon}
                </div>
                <div className="text-5xl font-display font-black text-foreground/[0.05] mb-3 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-xl font-display font-semibold mb-2">{step.title}</h4>
                <p className="text-foreground/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold max-w-xl">Everything your channel needs.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: <Youtube className="w-7 h-7 mb-5 text-foreground/70" />,
                title: "YouTube Long-Form Editing",
                desc: "Professional talking-head editing for finance creators — jump cuts, B-roll, captions, pacing, and retention hooks baked in.",
                tags: ["72h delivery", "3 revisions", "16:9 optimised"],
              },
              {
                icon: <FileVideo className="w-7 h-7 mb-5 text-foreground/70" />,
                title: "Shorts, Reels & LinkedIn Clips",
                desc: "5–8 platform-ready clips from every long-form video. Repurpose your best content across YouTube Shorts, Instagram Reels, and LinkedIn.",
                tags: ["48h delivery", "9:16 & 1:1 formats", "Strong hooks"],
              },
              {
                icon: <Target className="w-7 h-7 mb-5 text-foreground/70" />,
                title: "Thumbnails & Channel Design",
                desc: "Click-worthy thumbnails, channel art, and end-screen templates designed to match your brand and drive higher CTR.",
                tags: ["Same-day", "Unlimited variants", "A/B ready"],
              },
              {
                icon: <BarChart3 className="w-7 h-7 mb-5 text-foreground/70" />,
                title: "Light Channel Strategy",
                desc: "Available on the Authority plan — title and hook guidance, upload scheduling, and monthly performance review calls with Ateeb directly.",
                tags: ["Authority plan", "Monthly calls", "Data-driven"],
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-card-border hover:border-foreground/20 transition-all duration-400 flex flex-col"
              >
                {service.icon}
                <h4 className="text-xl font-display font-semibold mb-3">{service.title}</h4>
                <p className="text-foreground/50 leading-relaxed text-sm mb-5 flex-1">{service.desc}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {service.tags.map((tag, ti) => (
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
              <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Selected Work</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">Proof of performance.</h3>
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

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
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
                    <span className="font-mono text-xs text-foreground/20 w-7 flex-shrink-0 select-none group-hover:text-foreground/50 transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-[15px] leading-snug group-hover:translate-x-1 transition-transform duration-200 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-foreground/40 mt-0.5">{item.client}</div>
                    </div>
                    <span className="hidden md:block text-[11px] text-foreground/30 group-hover:text-foreground/50 transition-colors duration-200 flex-shrink-0">
                      {item.type}
                    </span>
                    <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-foreground/40 group-hover:border-foreground/30 group-hover:text-foreground/60 transition-all duration-200 flex-shrink-0">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground/50 group-hover:bg-foreground group-hover:text-background transition-all duration-200">
                      <Play className="w-3 h-3 ms-0.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/40 to-transparent rounded-b-xl" />
            </div>

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
              <div className="grid grid-cols-3 gap-3 mt-4">
                {(["YouTube", "Reels", "Ads"] as const).map(cat => {
                  const count = portfolioItems.filter(p => p.category === cat).length;
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

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Pricing</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Simple, transparent pricing.</h3>
            <p className="text-foreground/50 mt-4 leading-relaxed">No hidden fees. No lock-in contracts. Pick a plan and start publishing this month.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "Starter",
                price: "$1,500",
                period: "/month",
                desc: "For finance experts publishing 2 videos a month and getting started with shorts.",
                features: [
                  "2 long-form YouTube edits/mo",
                  "8 shorts / reels per month",
                  "Captions & subtitles",
                  "Basic motion graphics",
                  "48h delivery on shorts",
                  "72h delivery on long-form",
                  "3 revisions per video",
                ],
                cta: "Book a Strategy Call",
                highlight: false,
              },
              {
                name: "Growth",
                price: "$2,800",
                period: "/month",
                desc: "For creators publishing consistently and building a presence across YouTube and LinkedIn.",
                features: [
                  "4 long-form YouTube edits/mo",
                  "16 shorts / reels per month",
                  "Custom thumbnails included",
                  "Priority 48h delivery",
                  "Unlimited revisions",
                  "Custom motion & graphics",
                  "Weekly strategy check-in",
                ],
                cta: "Most Popular",
                highlight: true,
              },
              {
                name: "Authority",
                price: "$4,500",
                period: "/month",
                desc: "For established finance voices who want a full content engine and light channel strategy.",
                features: [
                  "6 long-form YouTube edits/mo",
                  "24 shorts / reels per month",
                  "Thumbnails + channel design",
                  "Light channel strategy",
                  "Monthly performance review",
                  "Same-day delivery available",
                  "Dedicated editor + Slack access",
                ],
                cta: "Book a Strategy Call",
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
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 border text-center block ${
                    plan.highlight
                      ? "bg-background text-foreground border-background hover:bg-background/90"
                      : "bg-transparent border-border text-foreground hover:bg-foreground/5 hover:border-foreground/30"
                  }`}
                >
                  {plan.cta} <ArrowRight className="inline w-3.5 h-3.5 ms-1.5 -mt-0.5" />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeIn} className="text-center text-foreground/35 text-sm mt-10">
            Not sure which plan fits?{" "}
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground underline underline-offset-2 transition-colors">
              Book a free 20-min call and we'll figure it out →
            </a>
          </motion.p>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="py-28 bg-card/40">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-14">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Case Study</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">From raw footage to consistent output.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-6">
                Finance Creator — UK
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">Philip — Finance Coach & Educator</h4>
              <p className="text-foreground/60 leading-relaxed mb-6">
                Philip had expertise and a camera but no time to edit. Every week he'd film great content that sat in a folder for days before he found time to cut it — which meant publishing once a month at best.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-8">
                We took over his entire post-production workflow. Now he films, sends the files, and gets back fully edited long-form videos plus 5–6 shorts per episode within 72 hours — ready to publish.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { before: "1×/month", after: "4×/month", label: "Publishing frequency" },
                  { before: "Hours editing", after: "Zero editing", label: "Time spent post-filming" },
                  { before: "0 shorts", after: "5–6 per video", label: "Short-form repurposing" },
                  { before: "Inconsistent", after: "Every week", label: "Content consistency" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background border border-border">
                    <div className="text-[10px] uppercase tracking-widest text-foreground/30 mb-2">{stat.label}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-foreground/30 line-through">{stat.before}</span>
                      <ArrowRight className="w-3 h-3 text-foreground/30" />
                      <span className="font-semibold text-foreground">{stat.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="space-y-6">
              <div className="p-8 rounded-2xl bg-background border border-border relative">
                <div className="text-4xl font-display font-black text-foreground/[0.06] absolute top-4 left-6 select-none">"</div>
                <blockquote className="text-foreground/70 leading-relaxed relative z-10 pt-4">
                  Working with Setspace completely changed how I show up online. I stopped dreading the editing part and started actually enjoying the filming. The consistency has been the biggest win — my audience knows to expect content from me every week now.
                </blockquote>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border/50">
                  <div className="w-9 h-9 rounded-full bg-foreground/10 border border-border flex items-center justify-center text-xs font-bold text-foreground/50">PH</div>
                  <div>
                    <div className="font-semibold text-sm">Philip H.</div>
                    <div className="text-xs text-foreground/40">Finance Coach & Educator, UK</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">What's included in his plan</div>
                {[
                  "4 long-form YouTube edits per month",
                  "5–6 shorts per episode (20+ clips/month)",
                  "Custom thumbnails for every video",
                  "Captions in his brand font and colours",
                  "72h turnaround from footage received",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/65 mb-2.5">
                    <Check className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-foreground/40 text-sm mb-4">Ready to build your content engine?</p>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
                >
                  Book a free strategy call <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / TEAM ── */}
      <section id="team" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-14">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">About</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Meet the team.</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16"
          >
            <div className="relative group overflow-hidden rounded-2xl bg-muted aspect-[4/5] max-w-sm mx-auto md:mx-0 w-full">
              <img
                src={`${import.meta.env.BASE_URL}images/ateeb.jpg`}
                alt="Ateeb Hasan"
                className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 start-5">
                <div className="text-white font-display font-bold text-lg">Ateeb Hasan</div>
                <div className="text-white/60 text-sm">Founder & Creative Lead</div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-foreground/65 text-lg leading-relaxed">
                Hi, I'm Ateeb. I started Setspace because I kept watching finance experts with genuinely valuable insights struggle to build an audience — not because their ideas weren't good, but because editing was eating their time.
              </p>
              <p className="text-foreground/50 leading-relaxed">
                I work closely with every client from brief to final file. No hand-offs to junior editors on your account. You get direct communication, fast turnarounds, and edits built around your audience's retention.
              </p>
              <p className="text-foreground/50 leading-relaxed">
                Top Rated Plus on Upwork. ~$70K delivered. 4.9★ across 100+ projects.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { value: "300+", label: "Videos Delivered" },
                  { value: "100+", label: "Happy Clients" },
                  { value: "4.9★", label: "Average Rating" },
                  { value: "48h", label: "Avg. Turnaround" },
                ].map((fact, i) => (
                  <div key={i} className="p-4 rounded-xl bg-card border border-border">
                    <div className="text-2xl font-display font-bold mb-0.5">{fact.value}</div>
                    <div className="text-xs text-foreground/40 uppercase tracking-widest">{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team */}
          <div className="pt-12 border-t border-border">
            <h4 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-8">Also on the team</h4>
            <div ref={teamScrollRef} className="flex gap-4 overflow-x-auto -mx-6 px-6 hide-scrollbar">
              {[
                { name: "Zoha Adnan",       role: "Lead Gen Executive",          img: "zoha.jpeg",     objPos: "center 8%" },
                { name: "Jaffer Naqvi",     role: "Video Designer",              img: "jaffer.jpeg",   objPos: "center 5%" },
                { name: "Sani e Zehra",     role: "Social Media Designer",       img: "sani.jpeg",     objPos: "center 5%" },
                { name: "Muhammad Ashhad",  role: "Video Editor",                img: "ashad.jpeg",    objPos: "center 5%" },
                { name: "Laiba Malik",      role: "HR & Ops Executive",          img: "laiba.jpeg",    objPos: "center 8%" },
                { name: "Zayd Saleem",      role: "Explainer Video Specialist",  img: "zayd.jpeg",     objPos: "center 5%" },
                { name: "Abdullah Khan",    role: "Motion Graphics Specialist",  img: "abdullah.jpeg", objPos: "center 5%" },
                { name: "Salman Aqeel",     role: "Junior Editor",               img: "salman.png",    objPos: "center 15%" },
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
                    <div className="text-white/55 text-[10px] mt-0.5">{member.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why founders choose Setspace — testimonials */}
          <div className="mt-16 pt-12 border-t border-border">
            <h4 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-10">Why founders choose Setspace</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { quote: "Ateeb and his team are the best I've worked with. Their service is beyond just video editing. They've given me strategies, suggestions to grow, delivered more than what I asked for, and stayed in touch through the entire process.", name: "Muhammad Helal", role: "Founder, Flagship Media", initials: "MH" },
                { quote: "Ateeb has been a phenomenal collaborator. He revamped my entire system and processes with ease, guided me on best practices, went beyond the scope without hesitating, and delivered well before deadline.", name: "Davina Hehn", role: "Founder, A Steady Space", initials: "DH" },
                { quote: "Amazing job. The work was clear, efficient, and completely exceeded my expectations. Communication was smooth throughout. I will absolutely hire Setspace again.", name: "Dr. Luzelena Rivers", role: "Enterprising Women Foundation", initials: "ER" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-card-border flex flex-col justify-between"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-foreground/65 text-sm leading-relaxed flex-1">"{r.quote}"</blockquote>
                  <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-border/50">
                    <div className="w-8 h-8 rounded-full bg-foreground/10 border border-border flex items-center justify-center text-[9px] font-bold text-foreground/50 shrink-0">{r.initials}</div>
                    <div>
                      <div className="font-semibold text-xs text-foreground">{r.name}</div>
                      <div className="text-[10px] text-foreground/40">{r.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
                q: "Do you understand finance content and compliance language?",
                a: "Yes. We work with finance creators regularly and understand the tone, disclaimers, and sensitivities involved. We'll never cut out important compliance language, and we can style disclaimers to look clean rather than jarring.",
              },
              {
                q: "Can you match my existing editing style?",
                a: "Absolutely. Send us 2–3 of your favourite examples — from your own channel or channels you admire — and we'll match the pacing, caption style, colour grade, and overall feel before we touch your footage.",
              },
              {
                q: "What's the turnaround time?",
                a: "Shorts and clips are delivered within 48 hours. Long-form YouTube edits within 72 hours. On the Authority plan, same-day delivery is available for urgent uploads.",
              },
              {
                q: "How does feedback and revisions work?",
                a: "You review the edit and leave timestamped comments — we use a simple Google Drive or Frame.io link depending on your preference. We turn around revisions within 24 hours. Starter includes 3 revisions per video; Growth and Authority include unlimited.",
              },
              {
                q: "What happens if I'm not happy?",
                a: "We'll make it right. No awkward conversations, no hidden fees. If after revisions you're genuinely not satisfied with the output, we'll refund that video — no questions asked. We'd rather earn your trust long-term than keep money for work you're unhappy with.",
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

      {/* ── CLOSING CTA ── */}
      <section className="py-28 relative overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.03] blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn}>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
              Ready to build your content engine?
            </h2>
            <p className="text-xl text-foreground/45 mb-4 max-w-xl mx-auto leading-relaxed">
              Book a free 20-minute strategy call. We'll map out a publishing plan for your channel — no pressure, no pitch deck.
            </p>
            <p className="text-foreground/30 text-sm mb-10">Trusted by finance creators and founders. Top Rated Plus on Upwork. ~$70K delivered.</p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Book a 20-min strategy call <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}

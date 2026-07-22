import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ── PALETTE ── */
const BLACK    = "#050505";
const WHITE    = "#FAFAFA";
const BLUE     = "#2D8AFF";
const GRAY2    = "#888888";
const CALENDLY = "https://booking.setspace.agency/widget/bookings/ateeb-hasan-personal-calendar-dal-sdzhc";
const FRAMEWORK_URL = "https://blueprint.setspace.agency/";
const MAX_W    = "1200px";

/* ── HERO VIDEOS ── */
const HERO_VIDEO = "Ssi2F5K2yaE";

/* ── BRANDS ── */
const BRANDS = [
  { name: "Flagship Media",    img: "logo-flagship.png" },
  { name: "SBD Canada",        img: "logo-sbd.png" },
  { name: "EWF",               img: "logo-ewf.png" },
  { name: "A Steady Space",    img: "logo-steadyspace.png" },
  { name: "Pawsitive",         img: "logo-pawsitive.png" },
  { name: "Sweet Bee",         img: "logo-sweetbee.png" },
  { name: "Unexpected ATL",    img: "logo-unexpected.png" },
  { name: "Clutch",            img: "logo-clutch.png" },
];

/* ── VIDEO TESTIMONIALS ── */
const videoTestimonials: { name:string; role:string; videoId:string|null; isShort?:boolean }[] = [
  { name:"Elena", role:"SetSpace Client", videoId:"uHydFKu0aCg", isShort:true },
];


/* ════════════════════════════════════
   HOOKS
════════════════════════════════════ */
function useInView(threshold = 0.1) {
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
    const handle = (e: MouseEvent) => setPos({
      x: (e.clientX / window.innerWidth  - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 14,
    });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return pos;
}

/* ════════════════════════════════════
   COMPONENTS
════════════════════════════════════ */
function CountUp({ to, suffix="", prefix="", duration=2200 }: { to:number; suffix?:string; prefix?:string; duration?:number }) {
  const [val, setVal] = useState(0);
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
    };
    requestAnimationFrame(tick);
  }, [visible, to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

function FadeUp({ children, delay=0, style }: { children: React.ReactNode; delay?:number; style?:React.CSSProperties }) {
  const { ref, visible } = useInView(0.07);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SlideIn({ children, delay=0, from="left" }: { children:React.ReactNode; delay?:number; from?:"left"|"right" }) {
  const { ref, visible } = useInView(0.07);
  const dx = from === "left" ? "-40px" : "40px";
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : `translateX(${dx})`, transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Video thumbnail with multi-step fallback ── */
function VideoThumb({ item, onClick }: {
  item: { videoId:string; title:string; category:string; client:string };
  onClick: () => void;
}) {
  const STEPS = [
    `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${item.videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
  ];
  const [step, setStep] = useState(0);
  const failed = step >= STEPS.length;

  return (
    <motion.div
      className="port-thumb"
      onClick={onClick}
      initial={{ opacity:0, scale:0.95 }}
      animate={{ opacity:1, scale:1 }}
    >
      {failed ? (
        /* Branded dark placeholder — never looks broken */
        <div style={{ width:"100%",height:"100%",background:"linear-gradient(135deg,#0a0a0a,#111827)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"10px" }}>
          <div style={{ width:"44px",height:"44px",borderRadius:"50%",background:"rgba(45,138,255,0.2)",border:"1px solid rgba(45,138,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Play style={{ width:"16px",height:"16px",color:BLUE,marginLeft:"2px" }} fill={BLUE} />
          </div>
          <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"11px",color:"#444" }}>SetSpace</span>
        </div>
      ) : (
        <img
          src={STEPS[step]}
          alt={item.title}
          onError={() => setStep(s => s + 1)}
          style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.5s ease" }}
        />
      )}
      <div className="port-overlay">
        <div style={{ width:"48px",height:"48px",borderRadius:"50%",background:"rgba(45,138,255,0.85)",border:"2px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",boxShadow:"0 0 24px rgba(0,113,255,0.5)" }}>
          <Play style={{ width:"16px",height:"16px",color:WHITE,marginLeft:"2px" }} fill={WHITE} />
        </div>
      </div>
      <div className="port-info">
        <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"10px",fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",color:BLUE,marginBottom:"2px" }}>{item.category}</div>
        <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",fontWeight:600,color:WHITE,lineHeight:1.3 }}>{item.title}</div>
        <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"11px",color:GRAY2,marginTop:"2px" }}>{item.client}</div>
      </div>
    </motion.div>
  );
}

/* Figma gradient heading style — white→gray, used for all big section titles */
const GradH = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: "clamp(40px, 5.5vw, 66px)",
    background: "linear-gradient(to right, #fff 0%, #999 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1.15,
    letterSpacing: "-1.98px",
    margin: 0,
    ...style,
  }}>{children}</h2>
);

/* Blue gradient CTA button (exact Figma gradient) */
function BlueBtn({ href, children, large=false }: { href:string; children:React.ReactNode; large?:boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize: large ? "18px" : "16px",
        background:"linear-gradient(180deg,#509dff 0%,#2887ff 50%,#147cff 75%,#0a77ff 87.5%,#0071ff 100%)",
        color:WHITE, padding: large ? "18px 48px" : "14px 36px", borderRadius:"32px",
        textDecoration:"none", display:"inline-block",
        border:"1px solid rgba(114,176,255,0.4)",
        boxShadow:"-11px -8px 30px 0px rgba(26,127,255,0.33)", transition:"opacity 0.2s,transform 0.2s" }}
      onMouseEnter={e=>{e.currentTarget.style.opacity="0.88";e.currentTarget.style.transform="scale(1.03)";}}
      onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="scale(1)";}}
    >{children}</a>
  );
}

/* Dark outline button ("Download Free Framework") */
function OutlineBtn({ href, children, onClick }: { href:string; children:React.ReactNode; onClick?:(e:React.MouseEvent)=>void }) {
  return (
    <a href={href} onClick={onClick}
      style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"16px",
        background:"linear-gradient(to bottom,#0a0a0a,#040404)",
        color:"#ededed", padding:"14px 36px", borderRadius:"32px",
        textDecoration:"none", display:"inline-block",
        border:"1px solid #1b1b1b", transition:"border-color 0.2s,background 0.2s" }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="#1b1b1b";}}
    >{children}</a>
  );
}

/* Divider line */
const VDivider = () => (
  <div style={{ width:"1px", alignSelf:"stretch", background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.15),transparent)" }} />
);

/* ════════════════════════════════════
   HOME PAGE
════════════════════════════════════ */
export default function Home() {
  const [openFaq,        setOpenFaq]        = useState<number|null>(0);
  const [pricingBilling, setPricingBilling] = useState<'monthly'|'yearly'>('monthly');
  const parallax = useMouseParallax();

  return (
    <div style={{ background:BLACK, color:WHITE, fontFamily:"'Poppins',sans-serif", overflowX:"hidden" }}>
      <Navbar />

      {/* ════════════════════════════════════
          HERO — Figma: text top-center, glass card BELOW buttons
      ════════════════════════════════════ */}
      <section id="hero" style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", overflow:"hidden", paddingBottom:0 }}>

        {/* Smoke texture — full bleed background */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
          <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt=""
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.5, mixBlendMode:"lighten" }} />
          {/* Blue parallax glow */}
          <div style={{ position:"absolute", top:"30%", left:"40%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(0,113,255,0.12) 0%, transparent 70%)", transform:`translate(${parallax.x * 1.2}px, ${parallax.y * 1.2}px)`, transition:"transform 0.15s ease-out" }} />
        </div>

        {/* ── Text block ── */}
        <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:"780px", margin:"0 auto", padding:"160px 24px 56px" }}>
          {/* Label */}
          <div className="fade-word" style={{ animationDelay:"0s", fontFamily:"'Poppins',sans-serif", fontWeight:400, fontSize:"16px", background:"linear-gradient(266.8deg,#fafafa 2%,#949494 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"20px", opacity:0 }}>
            Content &amp; Marketing Engine
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"clamp(40px,6vw,66px)", color:"#c9c9c9", lineHeight:1.1, margin:"0 0 4px", letterSpacing:"-2.64px" }}>
            We build your
          </h1>
          <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"clamp(40px,6vw,66px)", lineHeight:1.1, margin:"0 0 28px", letterSpacing:"-2.64px" }}>
            <span className="fade-word" style={{ animationDelay:"0.15s", color:WHITE }}>Marke</span>
            <span className="fade-word" style={{ animationDelay:"0.27s", color:WHITE }}>ti</span>
            <span className="fade-word" style={{ animationDelay:"0.4s", fontFamily:"'DM Serif Display',serif", fontStyle:"italic", color:WHITE }}>ng</span>
            {" "}
            <span className="fade-word" style={{ animationDelay:"0.5s", color:BLUE }}>Eng</span>
            <span className="fade-word" style={{ animationDelay:"0.6s", fontFamily:"'DM Serif Display',serif", fontStyle:"italic", color:BLUE }}>ine</span>
          </h1>

          {/* Subheading */}
          <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:400, fontSize:"18px", color:"#fafafa", lineHeight:1.65, margin:"0 auto 36px", maxWidth:"585px" }}>
            Done-for-you content and marketing for therapists, counselors, coaches, and wellness professionals.
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", gap:"20px", justifyContent:"center", flexWrap:"wrap" }}>
            <BlueBtn href={CALENDLY}>Get Free Audit</BlueBtn>
            <OutlineBtn href={FRAMEWORK_URL}>
              Download Free Framework
            </OutlineBtn>
          </div>
        </div>

        {/* ── Figma glass card — BELOW buttons, team photo blurred ── */}
        <div style={{ position:"relative", zIndex:2, width:"min(1136px,92vw)", margin:"0 auto", flexShrink:0 }}>
          <div style={{ height:"385px", borderRadius:"33px", border:"3px solid rgba(255,255,255,0.13)", backdropFilter:"blur(3.15px)", WebkitBackdropFilter:"blur(3.15px)", boxShadow:"-44px -35px 100px 0px rgba(253,253,253,0.07)", overflow:"hidden" }}>
            <img src={`${import.meta.env.BASE_URL}images/hero-card.jpg`} alt="SetSpace team"
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 35%", display:"block", opacity:0.65 }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.35) 55%, rgba(5,5,5,0.1) 100%)" }} />
          </div>
        </div>

        {/* Glow line at bottom */}
        <div style={{ position:"relative", zIndex:2, width:"100%", height:"1px", marginTop:0, background:"linear-gradient(90deg,transparent 0%,rgba(45,138,255,0.5) 30%,rgba(45,138,255,0.8) 50%,rgba(45,138,255,0.5) 70%,transparent 100%)" }} />
      </section>

      {/* ════════════════════════════════════
          STATS — Figma: huge 66px gradient numbers in own section
      ════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", position:"relative" }}>
        <div style={{ maxWidth:MAX_W, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"stretch", gap:"0", flexWrap:"wrap" }}>
            {[
              { to:160, suffix:"+", label:"Clients Helped" },
              { to:1000, suffix:"", label:"Content Pieces Produced" },
              { to:3, suffix:"+ Yrs", label:"In Production" },
            ].map((s, i) => (
              <div key={i} style={{ display:"flex", alignItems:"stretch" }}>
                {i > 0 && <VDivider />}
                <FadeUp delay={i * 0.12}>
                  <div style={{ textAlign:"center", padding:"0 56px" }}>
                    <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"clamp(48px,6vw,66px)", background:"linear-gradient(to bottom,#fafafa 19%,#949494 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.1, letterSpacing:"-1px" }}>
                      <CountUp to={s.to} suffix={s.suffix} />
                    </div>
                    <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"20px", color:"#bababa", marginTop:"10px", letterSpacing:"-0.2px" }}>{s.label}</div>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BRANDS — small square thumbnails + names (Figma exact)
      ════════════════════════════════════ */}
      <section style={{ padding:"72px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:MAX_W, margin:"0 auto" }}>
          <FadeUp>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:500, fontSize:"18px", color:"#747373", textAlign:"center", marginBottom:"40px", letterSpacing:"-0.18px" }}>
              Brands that trust us
            </p>
          </FadeUp>

          {/* Logos ticker with fade edges */}
          <div style={{ position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute",left:0,top:0,bottom:0,width:"100px",background:"linear-gradient(to right,#050505,transparent)",zIndex:2,pointerEvents:"none" }} />
            <div style={{ position:"absolute",right:0,top:0,bottom:0,width:"100px",background:"linear-gradient(to left,#050505,transparent)",zIndex:2,pointerEvents:"none" }} />
            <div className="logo-ticker-track">
              {[0,1].map(rep => (
                <span key={rep} style={{ display:"inline-flex",alignItems:"center",gap:"0" }}>
                  {BRANDS.map((b,i) => (
                    <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"10px",padding:"0 36px",flexShrink:0 }}>
                      {/* Small square thumbnail (44x44px, Figma style) */}
                      <div style={{ width:"44px",height:"44px",borderRadius:"10px",border:"1px solid #151515",background:"#0d0d0d",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <img src={`${import.meta.env.BASE_URL}images/${b.img}`} alt={b.name}
                          style={{ width:"32px",height:"32px",objectFit:"contain",filter:"brightness(0) invert(1)",opacity:0.6 }} />
                      </div>
                      <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"12px",color:"rgba(255,255,255,0.4)",whiteSpace:"nowrap",letterSpacing:"0.5px" }}>{b.name}</span>
                    </div>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICES — left-aligned label + 66px heading (Figma)
      ════════════════════════════════════ */}
      <section id="services" style={{ padding:"120px 24px", position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 50% at 50% 0%,rgba(0,113,255,0.1) 0%,transparent 60%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:MAX_W,margin:"0 auto",position:"relative" }}>
          <SlideIn from="left">
            <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"20px",background:"linear-gradient(to right,#fff,#999)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-0.6px",marginBottom:"16px",textTransform:"uppercase",letterSpacing:"0.5px" }}>
              OUR SERVICES
            </p>
            <GradH style={{ marginBottom:"24px", maxWidth:"701px" }}>
              Everything you need to grow online
            </GradH>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"30px",color:"#0071ff",marginBottom:"64px" }}>
              We Handle the Content
            </p>
          </SlideIn>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"20px" }}>
            {[
              { num:"01", title:"Content Production",     desc:"Video editing, reels, and short-form content delivered every month — consistently and on-brand, without you lifting a finger in post." },
              { num:"02", title:"Landing Pages",           desc:"High-converting pages designed and built for your practice — capture leads and book sessions on autopilot." },
              { num:"03", title:"Email Nurture Sequences", desc:"Automated email flows that turn viewers into booked sessions — written, designed, and delivered." },
              { num:"04", title:"Content Strategy",        desc:"A clear monthly plan for what to post, when, and why — built around your audience and your goals, updated monthly." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y:-8 }} transition={{ type:"spring",stiffness:280,damping:22 }}
                  className="glass-card"
                  style={{ borderRadius:"20px",padding:"40px 36px",height:"100%",display:"flex",flexDirection:"column",gap:"16px" }}>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"2px",color:BLUE }}>{item.num}</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"29px",color:WHITE,margin:0,letterSpacing:"-0.58px" }}>{item.title}</h3>
                  <p  style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"18px",color:"#b3b3b3",lineHeight:1.65,margin:0 }}>{item.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHO WE HELP
      ════════════════════════════════════ */}
      <section style={{ padding:"120px 24px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,113,255,0) 0%,rgba(0,113,255,0.07) 50%,transparent 100%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"clamp(60px,12vw,160px)",color:"rgba(255,255,255,0.025)",whiteSpace:"nowrap",pointerEvents:"none",userSelect:"none" }}>WELLNESS</div>

        <div style={{ maxWidth:MAX_W,margin:"0 auto",position:"relative" }}>
          <FadeUp style={{ textAlign:"center",marginBottom:"64px" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"16px" }}>Who We Help</p>
            <GradH style={{ textAlign:"center",margin:"0 auto",maxWidth:"600px" }}>Built for wellness professionals</GradH>
          </FadeUp>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px" }}>
            {[
              { title:"Therapists & Counselors",    desc:"Build trust online, attract ideal clients, and stay consistent without adding hours to your week.", icon:"🧠" },
              { title:"Wellness Coaches",            desc:"Turn your expertise into compelling content that grows your audience and fills your calendar.", icon:"💚" },
              { title:"Mental Health Practitioners", desc:"Grow your practice with professional content that reflects the care you bring to every session.", icon:"🌿" },
            ].map((col,i) => (
              <FadeUp key={i} delay={i*0.15}>
                <motion.div whileHover={{ y:-8 }} transition={{ type:"spring",stiffness:280,damping:22 }}
                  className="glass-card" style={{ borderRadius:"20px",padding:"40px 32px",height:"100%",textAlign:"center" }}>
                  <div style={{ fontSize:"40px",marginBottom:"20px" }}>{col.icon}</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"18px",color:WHITE,marginBottom:"16px" }}>{col.title}</h3>
                  <p  style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:GRAY2,lineHeight:1.7,margin:0 }}>{col.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          OUR APPROACH — strategy, funnels, frameworks
      ════════════════════════════════════ */}
      <section id="work" style={{ padding:"120px 24px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:MAX_W,margin:"0 auto" }}>

          <FadeUp style={{ textAlign:"center",marginBottom:"72px" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"16px" }}>How We Work</p>
            <GradH style={{ textAlign:"center",marginBottom:"20px" }}>Our Approach</GradH>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"16px",color:GRAY2,maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
              Every client gets a custom-built marketing engine — not a template, not a package, a real system built around your practice.
            </p>
          </FadeUp>

          {/* 3-step process cards */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"48px" }}>
            {[
              { num:"01", icon:"🔍", title:"Discovery & Strategy",     desc:"We audit your digital presence, map your ideal client journey, and build a 90-day content roadmap specific to your niche and goals." },
              { num:"02", icon:"🗺️", title:"Funnel Architecture",       desc:"We design the full scroll-to-session funnel — from awareness reels and trust-building posts to conversion landing pages and email sequences." },
              { num:"03", icon:"🚀", title:"Execution & Optimization",  desc:"We produce all content, manage publishing, and run monthly strategy reviews so your marketing keeps improving as you grow." },
            ].map((s,i) => (
              <FadeUp key={i} delay={i*0.12}>
                <motion.div whileHover={{ y:-8 }} transition={{ type:"spring",stiffness:280,damping:22 }}
                  className="glass-card" style={{ borderRadius:"24px",padding:"40px 36px",height:"100%",display:"flex",flexDirection:"column",gap:"20px" }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <span style={{ fontSize:"32px" }}>{s.icon}</span>
                    <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"2px",color:BLUE }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"22px",color:WHITE,margin:0,letterSpacing:"-0.4px",lineHeight:1.3 }}>{s.title}</h3>
                  <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"15px",color:GRAY2,lineHeight:1.7,margin:0 }}>{s.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* What we deliver — deliverables grid */}
          <FadeUp>
            <div className="glass-card" style={{ borderRadius:"24px",padding:"48px",border:"1px solid rgba(45,138,255,0.2)",background:"linear-gradient(135deg,rgba(45,138,255,0.04),rgba(0,0,0,0))" }}>
              <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"12px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"20px" }}>What You Receive</p>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px 32px" }}>
                {[
                  "Content Funnel Map","Custom Brand Voice Guide","90-Day Content Roadmap",
                  "Landing Page & Lead Capture","Email Nurture Sequence","Monthly Performance Report",
                ].map((item,i) => (
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:"10px",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color:BLUE,fontSize:"14px",flexShrink:0 }}>→</span>
                    <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:"#d0d0d0" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════
          PRICING — 66px heading, featured center card (Figma)
      ════════════════════════════════════ */}
      <section id="pricing" style={{ padding:"120px 24px",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% 50%,rgba(0,113,255,0.09) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:MAX_W,margin:"0 auto",position:"relative" }}>
          <FadeUp style={{ textAlign:"center",marginBottom:"16px" }}>
            <GradH style={{ textAlign:"center",marginBottom:"20px" }}>Pricing</GradH>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"25px",color:WHITE,margin:"0 auto 12px",maxWidth:"428px",textAlign:"center",lineHeight:1.35 }}>
              No retainer traps. No agency fluff. Just content that works
            </p>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"18px",color:"#ddd",margin:"0 auto 48px",maxWidth:"466px",textAlign:"center" }}>
              Simple, transparent packages. No hidden fees
            </p>
          </FadeUp>

          {/* Pricing plan selector */}
          <div style={{ display:"flex",justifyContent:"center",marginBottom:"12px" }}>
            <div style={{ background:"linear-gradient(to bottom,#171717,#090909)",border:"2px solid #98c6ff",borderRadius:"36px",padding:"12px",display:"flex",gap:"8px" }}>
              <button onClick={()=>setPricingBilling('monthly')}
                style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"15px",
                  background: pricingBilling==='monthly' ? "linear-gradient(to bottom,#0071ff,#0c78ff)" : "none",
                  color: pricingBilling==='monthly' ? WHITE : "rgba(255,255,255,0.5)",
                  border:"none",padding:"12px 36px",borderRadius:"28px",cursor:"pointer",
                  boxShadow: pricingBilling==='monthly' ? "0px 4px 30px 0px rgba(0,83,216,0.79)" : "none",
                  transition:"all 0.25s" }}>Monthly</button>
              <button onClick={()=>setPricingBilling('yearly')}
                style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"15px",
                  background: pricingBilling==='yearly' ? "linear-gradient(to bottom,#0071ff,#0c78ff)" : "none",
                  color: pricingBilling==='yearly' ? WHITE : "rgba(255,255,255,0.5)",
                  border:"none",padding:"12px 36px",borderRadius:"28px",cursor:"pointer",
                  boxShadow: pricingBilling==='yearly' ? "0px 4px 30px 0px rgba(0,83,216,0.79)" : "none",
                  transition:"all 0.25s" }}>Yearly</button>
            </div>
          </div>

          {/* Yearly savings label */}
          <div style={{ textAlign:"center",marginBottom:"40px",minHeight:"28px" }}>
            {pricingBilling==='yearly' && (
              <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"13px",color:BLUE,background:"rgba(45,138,255,0.1)",border:"1px solid rgba(45,138,255,0.25)",borderRadius:"20px",padding:"4px 16px" }}>
                🎉 2 months free — save up to $6,000/yr
              </span>
            )}
          </div>

          {/* 3 cards — center is featured */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1.1fr 1fr",gap:"16px",alignItems:"start" }}>
            {[
              { name:"Starter",    monthly:"$800",  yearly:"$640",  period:"/mo", desc:"For wellness professionals getting started with consistent content.", features:["8 reels / month","Content strategy","Basic social media management"], featured:false },
              { name:"Growth",     monthly:"$1,500",yearly:"$1,200",period:"/mo", desc:"For growing practices ready to expand content and capture leads.",    features:["12 reels + 6 designs/month","Content strategy","Landing page (one-time setup)","Email nurture sequence (3 emails)"], featured:true  },
              { name:"Full Engine",monthly:"$2,500",yearly:"$2,000",period:"/mo", desc:"A complete done-for-you content and marketing operation.",           features:["Full content production","Strategy + landing page","Full email nurture sequence","Monthly performance review"], featured:false },
            ].map((plan,i) => {
              const price = pricingBilling==='yearly' ? plan.yearly : plan.monthly;
              return (
              <FadeUp key={i} delay={i*0.1}>
                {plan.featured ? (
                  /* Featured center card — Figma: white border, rounded-[51px], blue shadow */
                  <div style={{ position:"relative" }}>
                    <div style={{ borderRadius:"51px",border:"1px solid rgba(255,255,255,0.8)",boxShadow:"0px -5px 150px 0px rgba(4,73,194,0.17)",overflow:"hidden",background:"#050505",padding:"48px 40px" }}>
                      <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"12px",textTransform:"uppercase",letterSpacing:"2px",color:BLUE,marginBottom:"16px" }}>{plan.name}</p>
                      <div style={{ display:"flex",alignItems:"baseline",gap:"4px",marginBottom:"8px" }}>
                        <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"47px",color:WHITE,lineHeight:1,letterSpacing:"-0.94px" }}>{plan.name}</span>
                      </div>
                      <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"46px",color:WHITE,letterSpacing:"-0.92px",marginBottom:"4px" }}>{price}{plan.period}</div>
                      {pricingBilling==='yearly' && <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",color:BLUE,marginBottom:"28px" }}>billed annually — save 20%</p>}
                      <ul style={{ listStyle:"none",padding:0,margin:"0 0 36px" }}>
                        {plan.features.map((f,fi) => (
                          <li key={fi} style={{ display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"20px" }}>
                            <span style={{ color:BLUE,fontSize:"16px",flexShrink:0,marginTop:"2px" }}>✓</span>
                            <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"23px",color:WHITE,lineHeight:1.4 }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <BlueBtn href={CALENDLY}>Get Started</BlueBtn>
                    </div>
                  </div>
                ) : (
                  <motion.div whileHover={{ y:-6 }} transition={{ type:"spring",stiffness:280,damping:22 }}
                    className="glass-card" style={{ borderRadius:"24px",padding:"40px 32px",position:"relative",display:"flex",flexDirection:"column" }}>
                    <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"12px",textTransform:"uppercase",letterSpacing:"2px",color:BLUE,marginBottom:"16px" }}>{plan.name}</p>
                    <div style={{ display:"flex",alignItems:"baseline",gap:"4px",marginBottom:"4px" }}>
                      <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"40px",color:WHITE,lineHeight:1 }}>{price}</span>
                      <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:GRAY2 }}>{plan.period}</span>
                    </div>
                    {pricingBilling==='yearly' && <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"11px",color:BLUE,margin:"0 0 16px" }}>billed annually — save 20%</p>}
                    <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:GRAY2,lineHeight:1.6,margin:"0 0 24px",flex:0 }}>{plan.desc}</p>
                    <ul style={{ listStyle:"none",padding:0,margin:"0 0 32px",flex:1 }}>
                      {plan.features.map((f,fi) => (
                        <li key={fi} style={{ display:"flex",alignItems:"flex-start",gap:"8px",marginBottom:"12px" }}>
                          <span style={{ color:BLUE,fontSize:"14px",flexShrink:0 }}>✓</span>
                          <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:GRAY2,lineHeight:1.5 }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"14px",background:"transparent",color:WHITE,border:"1px solid rgba(255,255,255,0.15)",padding:"12px 0",borderRadius:"32px",textDecoration:"none",textAlign:"center",display:"block",transition:"border-color 0.2s,background 0.2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=BLUE;e.currentTarget.style.background="rgba(45,138,255,0.08)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.background="transparent";}}>
                      Get Started
                    </a>
                  </motion.div>
                )}
              </FadeUp>
            ); })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SOCIAL PROOF — 66px heading (Figma)
      ════════════════════════════════════ */}
      <section style={{ padding:"120px 24px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:MAX_W,margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center",marginBottom:"56px" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"25px",color:WHITE,marginBottom:"12px" }}>Testimonial</p>
            <GradH style={{ textAlign:"center" }}>Social Proof</GradH>
          </FadeUp>

          {/* Two rows of testimonials (Figma has 4) */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"80px" }}>
            {[
              { quote:"Ateeb and his team are the best I've worked with. Their service is beyond just video editing. They've given me strategies, suggestions to grow, delivered more than I asked for, and stayed in touch through the entire process. Communication is excellent. This is where I'm going when I need content work and I can't recommend them enough.", name:"Muhammad Helal",    role:"Founder, Flagship Media",              initials:"MH" },
              { quote:"Really great experience working with Atteeb on my Ironman content. He was easy to work with, communicated well, and did a great job putting the videos together. The edits came out clean and captured the race experience really well. He was also open to feedback and made changes quickly when needed. Overall, happy with how everything turned out.", name:"Naomi",              role:"Ironman Content Creator",              initials:"N"  },
              { quote:"Communication was smooth with no confusion throughout the project. I will absolutely hire this freelancer again for future projects. Highly recommended.",                                                                                                                                                                                        name:"Dr. Luzelena Rivers", role:"Enterprising Women Foundation",        initials:"LR" },
              { quote:"Communication was always clear and smooth. He regularly contributed ideas and suggestions instead of just executing tasks — it felt like a true collaboration.",                                                                                                                                                                                 name:"Philipp F.",           role:"Finance Creator, YouTube",             initials:"PF" },
            ].map((t,i) => (
              <FadeUp key={i} delay={i*0.1}>
                <motion.div whileHover={{ y:-6 }} transition={{ type:"spring",stiffness:280,damping:22 }}
                  className="glass-card" style={{ borderRadius:"16px",padding:"36px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                  <div>
                    <div style={{ display:"flex",gap:"3px",marginBottom:"20px" }}>
                      {[0,1,2,3,4].map(s => <span key={s} style={{ color:"#FFD700",fontSize:"15px" }}>★</span>)}
                    </div>
                    <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:400,fontSize:"18px",color:"#e6e6e6",lineHeight:1.75,margin:"0 0 24px",fontStyle:"normal" }}>"{t.quote}"</p>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:"12px" }}>
                    <div style={{ width:"36px",height:"36px",borderRadius:"50%",background:"linear-gradient(135deg,#2D8AFF,#0071FF)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"11px",color:WHITE }}>{t.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"14px",color:WHITE }}>{t.name}</div>
                      <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",color:BLUE,marginTop:"1px" }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Big stats row — Figma: gradient large numbers */}
          <FadeUp>
            <div style={{ display:"flex",justifyContent:"center",alignItems:"stretch",flexWrap:"wrap" }}>
              {[
                { label:"Average Rating",   num:"4.9★", gradient:"linear-gradient(to bottom,#c3deff 19%,#0071ff 100%)", isStatic:true },
                { label:"Clients",          to:160,  suffix:"+",     gradient:"linear-gradient(to bottom,#fafafa 19%,#949494 100%)" },
                { label:"Content Pieces",   to:1000, suffix:"+",     gradient:"linear-gradient(to bottom,#fafafa 19%,#949494 100%)" },
                { label:"In Business",      to:3,    suffix:"+ Years",gradient:"linear-gradient(to bottom,#fafafa 19%,#949494 100%)" },
              ].map((s,i) => (
                <div key={i} style={{ display:"flex",alignItems:"stretch" }}>
                  {i > 0 && <VDivider />}
                  <div style={{ textAlign:"center",padding:"0 48px" }}>
                    <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"clamp(40px,5vw,66px)",background:s.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1,letterSpacing:"-1px" }}>
                      {s.isStatic ? s.num : <CountUp to={(s as {to:number;suffix:string}).to} suffix={(s as {to:number;suffix:string}).suffix} />}
                    </div>
                    <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"20px",color:"#d0d0d0",marginTop:"10px" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════
          VIDEO TESTIMONIALS
      ════════════════════════════════════ */}
      <section style={{ padding:"120px 24px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:MAX_W,margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center",marginBottom:"56px" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"16px" }}>Client Stories</p>
            <GradH style={{ textAlign:"center",marginBottom:"16px" }}>What Our Clients Say</GradH>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"16px",color:GRAY2,maxWidth:"480px",margin:"0 auto" }}>Real results from real practices.</p>
          </FadeUp>

          <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"24px" }}>
            {videoTestimonials.map((vt,i) => (
              <FadeUp key={i} delay={i*0.1}>
                <div className="glass-card" style={{ borderRadius:"20px",overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",width: vt.isShort ? "320px" : "560px",flexShrink:0 }}>
                  <div style={{ position:"relative",aspectRatio: vt.isShort ? "9/16" : "16/9",background:"#080808" }}>
                    {vt.videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vt.videoId}?rel=0&modestbranding=1&showinfo=0`}
                        title={`Testimonial — ${vt.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ position:"absolute",inset:0,width:"100%",height:"100%",border:"none" }}
                      />
                    ) : (
                      <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px" }}>
                        <div style={{ width:"64px",height:"64px",borderRadius:"50%",background:"rgba(45,138,255,0.12)",border:"1px solid rgba(45,138,255,0.35)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                          <span style={{ fontSize:"22px",marginLeft:"4px",color:BLUE }}>▶</span>
                        </div>
                        <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"13px",color:GRAY2,margin:0 }}>Video testimonial coming soon</p>
                      </div>
                    )}
                  </div>
                  <div style={{ padding:"16px 20px 20px" }}>
                    <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"15px",color:WHITE }}>{vt.name}</div>
                    <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",color:BLUE,marginTop:"3px" }}>{vt.role}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT — left: text+stats  |  right: team collage
      ════════════════════════════════════ */}
      <section id="team" style={{ padding:"120px 24px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:MAX_W,margin:"0 auto" }}>

          {/* ── Top two-column: text left, founder photo right ── */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"72px",alignItems:"center" }}>

            <SlideIn from="left">
              <h2 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:"clamp(24px,3vw,40px)",lineHeight:1.275,margin:"0 0 28px",letterSpacing:"-1.2px" }}>
                <span style={{ background:"linear-gradient(to right,#fff,#999)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>A </span>
                <span style={{ background:"linear-gradient(to right,#5ea6ff,#0071ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>remote content</span>
                <span style={{ background:"linear-gradient(to right,#fff,#999)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}> and marketing team built for wellness professionals</span>
              </h2>

              <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"15px",color:GRAY2,lineHeight:1.8,margin:"0 0 40px" }}>
                We help therapists, counselors, coaches, and wellness professionals generate leads and grow online. We handle strategy, video editing, reels, landing pages, and email nurture sequences — so you can focus on your clients.
              </p>

              {/* Stats */}
              <div style={{ display:"flex",gap:"36px",alignItems:"center",flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"clamp(36px,4vw,56px)",background:"linear-gradient(to bottom,#c3deff 19%,#0071ff 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,letterSpacing:"-1px" }}>4.9★</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:GRAY2,marginTop:"6px" }}>Avg. Rating</div>
                </div>
                <VDivider />
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"clamp(36px,4vw,56px)",background:"linear-gradient(to bottom,#fafafa 19%,#949494 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,letterSpacing:"-1px" }}>
                    <CountUp to={180} suffix="+" />
                  </div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:GRAY2,marginTop:"6px" }}>Clients</div>
                </div>
              </div>
            </SlideIn>

            {/* Team collage — 4×2 grid, all 8 members */}
            <SlideIn from="right" delay={0.1}>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridAutoRows:"clamp(110px,12vw,155px)",gap:"8px" }}>
                {[
                  { src:"team-ateeb.jpg",    alt:"Ateeb",    pos:"center 20%" },
                  { src:"team-zoha.jpg",     alt:"Zoha",     pos:"center 15%" },
                  { src:"team-sani.jpg",     alt:"Sani",     pos:"center 10%" },
                  { src:"team-laiba.jpg",    alt:"Laiba",    pos:"center 15%" },
                  { src:"team-jaffer.jpg",   alt:"Jaffer",   pos:"center 15%" },
                  { src:"team-abdullah.jpg", alt:"Abdullah", pos:"center 15%" },
                  { src:"team-ashad.jpg",    alt:"Ashad",    pos:"center 15%" },
                  { src:"team-zayd.jpg",     alt:"Zayd",     pos:"center 15%" },
                ].map((m,i) => (
                  <div key={i} style={{ borderRadius:"14px",overflow:"hidden",border: i===0 ? `1px solid ${BLUE}` : "1px solid rgba(255,255,255,0.08)" }}>
                    <img src={`${import.meta.env.BASE_URL}images/${m.src}`} alt={m.alt}
                      style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:m.pos,display:"block" }} />
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ — dark gradient cards (Figma)
      ════════════════════════════════════ */}
      <section style={{ padding:"120px 24px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:"842px",margin:"0 auto" }}>
          <FadeUp style={{ textAlign:"center",marginBottom:"64px" }}>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"clamp(32px,5vw,66px)",background:"linear-gradient(to right,#fff 0%,#999 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2,margin:"0 0 8px",letterSpacing:"-1.98px" }}>
              Frequently Asked
            </h2>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"clamp(32px,5vw,66px)",background:"linear-gradient(to right,#fff 0%,#999 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2,margin:0,letterSpacing:"-1.98px" }}>
              Questions
            </h2>
          </FadeUp>

          {[
            { q:"What kinds of clients do you work with?",  a:"Therapists, counselors, wellness coaches, and service-based professionals who need consistent content and marketing without managing an in-house team. If you want to grow online while focusing on your clients, we're a good fit." },
            { q:"How does the process work?",               a:"You share your goals, existing content, and brand references. We build a content plan, start producing, and deliver on a set schedule every month. You review, approve, and publish — or we handle that too." },
            { q:"What's the turnaround time?",              a:"Reels and short clips within 48 hours. Long-form video edits within 72 hours. On the Full Engine plan, same-day delivery is available for urgent content." },
            { q:"How do revisions work?",                   a:"You review via Google Drive or Frame.io and leave comments. We turn around revisions within 24 hours. Starter includes 3 revisions; Growth and Full Engine include unlimited." },
            { q:"Is there a contract?",                     a:"No lock-in contracts. We work month-to-month. Results are the only reason to stay — if we're not delivering, you shouldn't be billed." },
          ].map((item, i) => (
            <FadeUp key={i} delay={i*0.05}>
              {/* Figma: dark gradient bg, rounded-[21px], border-[#303030] */}
              <div style={{ marginBottom:"8px" }}>
                <button onClick={()=>setOpenFaq(openFaq===i ? null : i)}
                  style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"28px 32px",background:"linear-gradient(to bottom,#0c0c0c,#0d0d0d)",border:"1px solid #303030",borderRadius:openFaq===i ? "21px 21px 0 0" : "21px",cursor:"pointer",gap:"24px",textAlign:"left",transition:"border-radius 0.2s" }}>
                  <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:400,fontSize:"22px",color:WHITE,lineHeight:1.4 }}>{item.q}</span>
                  <motion.span animate={{ rotate:openFaq===i ? 45 : 0 }} transition={{ duration:0.2 }}
                    style={{ fontFamily:"'Poppins',sans-serif",fontSize:"26px",color:openFaq===i ? WHITE : "#3e3e3e",flexShrink:0,lineHeight:1,fontWeight:300,display:"inline-block" }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.3 }}
                      style={{ overflow:"hidden",background:"linear-gradient(to bottom,#0c0c0c,#0d0d0d)",border:"1px solid #303030",borderTop:"none",borderRadius:"0 0 21px 21px" }}>
                      <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"18px",color:"#8c8c8c",lineHeight:1.7,padding:"20px 32px 28px",margin:0 }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          FRAMEWORK — links to GHL landing page
      ════════════════════════════════════ */}
      <section id="blueprint" style={{ padding:"120px 24px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:MAX_W,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"72px",alignItems:"center" }}>

            <SlideIn from="left">
              <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"20px" }}>Free Resource</div>
              <GradH style={{ marginBottom:"16px" }}>The Scroll to Client Framework</GradH>
              <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"15px",color:GRAY2,lineHeight:1.8,marginBottom:"32px" }}>
                Find out exactly why your content isn't converting — and what to do about it. Free for therapists, coaches, and wellness professionals.
              </p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 24px",marginBottom:"40px" }}>
                {["The Scroll to Client Funnel","The Content Pattern Audit","The MOFU Gap explained","The Winning Content Formula","Production Quality Checklist","Your 30-Day Content System"].map((item,i) => (
                  <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:"8px" }}>
                    <span style={{ color:BLUE,fontSize:"14px",flexShrink:0,marginTop:"2px" }}>→</span>
                    <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"13px",color:GRAY2,lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <BlueBtn href={FRAMEWORK_URL} large>Get the Free Framework</BlueBtn>
              <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"12px",color:GRAY2,marginTop:"14px" }}>No spam. Instant access.</p>
            </SlideIn>

            <SlideIn from="right" delay={0.15}>
              <a href={FRAMEWORK_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",display:"block" }}>
                <motion.div whileHover={{ y:-6,boxShadow:"-11px -8px 50px 0px rgba(26,127,255,0.35)" }}
                  transition={{ type:"spring",stiffness:280,damping:22 }}
                  className="glass-card-blue"
                  style={{ borderRadius:"24px",padding:"48px 40px",position:"relative",overflow:"hidden",border:"1px solid rgba(45,138,255,0.3)",boxShadow:"-11px -8px 30px 0px rgba(26,127,255,0.2)",cursor:"pointer" }}>
                  <div style={{ position:"absolute",top:0,left:0,width:"4px",height:"100%",background:"linear-gradient(180deg,#509dff,#0071ff)" }} />
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"10px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"28px" }}>Free Framework</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"clamp(20px,2.5vw,28px)",color:WHITE,lineHeight:1.3,marginBottom:"10px" }}>THE SCROLL TO CLIENT FRAMEWORK</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",color:BLUE,marginBottom:"40px" }}>By SetSpace</div>
                  {["Content Funnel","Pattern Audit","MOFU Gap","Content Formula"].map((item,i) => (
                    <div key={i} style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px" }}>
                      <div style={{ width:"24px",height:"1px",background:BLUE }} />
                      <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:"13px",color:GRAY2 }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:"32px",display:"flex",alignItems:"center",gap:"8px" }}>
                    <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"14px",color:BLUE }}>Access the framework</span>
                    <span style={{ color:BLUE,fontSize:"16px" }}>→</span>
                  </div>
                </motion.div>
              </a>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA — blue glow, "Ready to build your marketing engine?" (Figma)
      ════════════════════════════════════ */}
      <section id="cta" style={{ padding:"140px 24px",position:"relative",overflow:"hidden",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 70% at 50% 100%,rgba(0,113,255,0.25) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"600px",height:"300px",background:"radial-gradient(ellipse at 50% 100%,rgba(0,113,255,0.4) 0%,transparent 70%)",pointerEvents:"none" }} />

        <div style={{ maxWidth:MAX_W,margin:"0 auto",textAlign:"center",position:"relative" }}>
          <FadeUp>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"14px",textTransform:"uppercase",letterSpacing:"3px",color:BLUE,marginBottom:"24px" }}>
              Trusted by 160+ therapists, counselors &amp; wellness coaches worldwide
            </p>
            <h2 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"clamp(36px,6vw,66px)",color:WHITE,lineHeight:1.1,margin:"0 auto 24px",maxWidth:"700px",letterSpacing:"-1.5px" }}>
              Ready to build your<br />
              <span style={{ background:"linear-gradient(to right,#509dff,#0071ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>marketing engine?</span>
            </h2>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"18px",color:GRAY2,margin:"0 auto 48px",maxWidth:"500px",lineHeight:1.65 }}>
              Book a free 20-minute audit call. No pitch, no pressure — just honest feedback.
            </p>
            <BlueBtn href={CALENDLY} large>Book Free Audit</BlueBtn>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:"13px",color:GRAY2,marginTop:"20px" }}>We respond within 24 hours.</p>
          </FadeUp>
        </div>
      </section>

      <Footer />

      {/* Sticky pulse phone button */}
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="sticky-cta-btn" title="Book Free Audit"
        style={{ position:"fixed",bottom:"32px",left:"32px",zIndex:30,width:"60px",height:"60px",borderRadius:"50%",background:"linear-gradient(180deg,#509dff 0%,#0071ff 100%)",color:WHITE,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",border:"1px solid rgba(114,176,255,0.4)",transition:"transform 0.3s" }}
        onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.12)")}
        onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
        <Phone style={{ width:"22px",height:"22px" }} />
      </a>
    </div>
  );
}

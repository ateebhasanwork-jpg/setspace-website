import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactModal } from "@/components/ContactModal";
import { motion } from "framer-motion";
import {
  BookOpen, Globe, TrendingUp, Shield, Zap, Users,
  CheckCircle2, BarChart2, Layers, Printer, Hash,
  UserCircle, ArrowRight, BadgeCheck, Star,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const features = [
  { icon: Users,        title: "Dedicated Project Manager, Editor & Formatter", desc: "Your own dedicated team guiding your book from raw manuscript through to global distribution." },
  { icon: CheckCircle2, title: "Professional Editing & Proofreading",           desc: "Line-by-line editing to ensure your book is polished, coherent and market-ready." },
  { icon: Layers,       title: "Book Cover Design (Front, Back & Spine)",       desc: "Striking, retail-optimised cover design built to grab attention on every platform." },
  { icon: BarChart2,    title: "Formatting & Typesetting",                      desc: "Pixel-perfect formatting for eBook and print — every device, every retailer, every territory." },
  { icon: Globe,        title: "Publishing to 30+ Platforms",                   desc: "Global distribution across Amazon, Apple Books, Kobo, Waterstones, Barnes & Noble and more." },
  { icon: UserCircle,   title: "Author Profile Creation & Set-up",              desc: "Fully built and keyword-optimised author profiles across all major retail platforms." },
  { icon: TrendingUp,   title: "Ranked Keywords & Google Optimisation",         desc: "Data-driven keyword strategy to maximise discoverability in search and on-platform rankings." },
  { icon: Printer,      title: "Print-on-Demand Globally",                      desc: "Physical copies available worldwide with zero upfront print costs — ordered only when sold." },
  { icon: Hash,         title: "ISBN, ASIN & Barcode",                          desc: "Every identifier handled and registered so your book is properly recognised everywhere." },
  { icon: Shield,       title: "100% Author Ownership",                         desc: "You own all rights and collect all royalties. We do the work — you keep everything." },
  { icon: Zap,          title: "Rapid Assistance & Process Reporting",          desc: "Regular progress updates and direct access to your project team throughout." },
  { icon: BookOpen,     title: "Direct Access to Author Portal",                desc: "Real-time visibility into your book's performance, sales data and distribution status." },
];

const platforms = [
  { name: "Amazon Kindle",    region: "Global" },
  { name: "Amazon Print",     region: "Global" },
  { name: "Apple Books",      region: "Global" },
  { name: "Kobo",             region: "Global" },
  { name: "Google Play Books",region: "Global" },
  { name: "Barnes & Noble",   region: "US" },
  { name: "Waterstones",      region: "UK" },
  { name: "Booktopia",        region: "AU" },
  { name: "FNAC",             region: "FR" },
  { name: "Bol.com",          region: "NL" },
  { name: "Scribd",           region: "Global" },
  { name: "OverDrive",        region: "Libraries" },
  { name: "Smashwords",       region: "Global" },
  { name: "Tolino",           region: "DE" },
  { name: "+ 16 More",        region: "Worldwide" },
];

const steps = [
  { n: "01", title: "Submit Your Manuscript",    desc: "Send us your draft — rough or polished. We'll take it from there and assign your dedicated team." },
  { n: "02", title: "Edit, Design & Format",     desc: "Our editors refine your work. Our designers craft your cover and format every version to perfection." },
  { n: "03", title: "You Review & Approve",      desc: "Nothing goes live without your sign-off. Full revision rounds included until you're satisfied." },
  { n: "04", title: "Publish & Distribute",      desc: "We push your book to 30+ platforms globally, set up your author profiles and hand you the keys." },
];

const team = [
  { name: "Ateeb Hasan",  role: "Founder & Director",         initials: "AH", photo: "ateeb.jpg",  bio: "Ateeb leads the Setspace Publishing division, overseeing strategy, quality and client experience from end to end." },
  { name: "Mahad Ali",    role: "Publishing Sales Lead",      initials: "MA", photo: null,         bio: "Mahad leads client relationships for our publishing division, guiding authors from first inquiry through to a signed publishing plan." },
  { name: "Rafay Hasan",  role: "Publishing Sales Executive", initials: "RH", photo: null,         bio: "Rafay works directly with authors to scope their project, answer questions and get their book journey started." },
];

export default function Publishing() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* YouTube background video */}
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: "#050505" }}>
          <iframe
            src="https://www.youtube.com/embed/elnhlONC_0Y?autoplay=1&mute=1&loop=1&playlist=elnhlONC_0Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&cc_load_policy=0&iv_load_policy=3"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw", border: "none", opacity: 0.45 }}
            title="Publishing hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Setspace Publishing — UK & Global
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
          >
            Publish Your Story<br />
            <span className="text-foreground/30">to the World.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-foreground/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Full-service eBook publishing and global distribution for UK authors.
            We handle everything — editing, design, formatting and distribution to 30+ platforms — so you can focus on writing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Start Publishing <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#what-we-do"
              onClick={e => { e.preventDefault(); document.querySelector("#what-we-do")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-xl font-semibold text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-all"
            >
              See What's Included
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-3 gap-6 mt-20 max-w-lg mx-auto"
          >
            {[
              { value: "30+", label: "Platforms" },
              { value: "100%", label: "Your Rights" },
              { value: "UK", label: "Focused" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl">{stat.value}</div>
                <div className="text-xs text-foreground/40 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section id="what-we-do" className="py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Everything Covered</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold max-w-xl">
              One package.<br />The complete journey.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-card border border-border/50 rounded-2xl p-6 hover:border-foreground/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors">
                  <f.icon className="w-5 h-5 text-foreground/60" />
                </div>
                <h4 className="font-display font-semibold text-[15px] mb-2 leading-snug">{f.title}</h4>
                <p className="text-sm text-foreground/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Distribution</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">30+ Platforms.<br />One submission.</h3>
            <p className="text-foreground/40 max-w-xl mx-auto">We distribute your book everywhere readers buy — from Waterstones in the UK to Amazon globally, with a single workflow.</p>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="flex flex-wrap justify-center gap-3"
          >
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border bg-card ${
                  p.name.startsWith("+") ? "border-foreground/30 text-foreground/60" : "border-border/60 text-foreground/70"
                } text-sm font-medium`}
              >
                <BadgeCheck className={`w-3.5 h-3.5 ${p.name.startsWith("+") ? "text-foreground/40" : "text-emerald-400"}`} />
                {p.name}
                <span className="text-[10px] text-foreground/30 font-normal">{p.region}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* UK highlight */}
          <motion.div {...fadeIn} className="mt-14 bg-card border border-border/50 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <div className="text-2xl mb-2">🇬🇧</div>
            <h4 className="font-display font-bold text-xl mb-2">UK-First Publishing</h4>
            <p className="text-foreground/40 text-sm leading-relaxed">
              As a UK-focused agency we prioritise Waterstones, Amazon UK and regional distribution channels to ensure your book reaches the British market first — then the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">How It Works</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Simple process.<br />Exceptional results.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-card border border-border/50 rounded-2xl p-6"
              >
                <div className="font-mono text-4xl font-bold text-foreground/8 mb-4 select-none leading-none">{step.n}</div>
                <h4 className="font-display font-semibold text-base mb-2">{step.title}</h4>
                <p className="text-sm text-foreground/40 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeIn} className="mb-14">
            <h2 className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">Your Publishing Team</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">People who know<br />how to get books sold.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-6 flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-xl bg-foreground/10 flex items-center justify-center font-display font-bold text-lg flex-shrink-0 overflow-hidden">
                  {member.photo
                    ? <img src={`/images/${member.photo}`} alt={member.name} className="w-full h-full object-cover object-top" />
                    : member.initials
                  }
                </div>
                <div>
                  <div className="font-display font-semibold text-base">{member.name}</div>
                  <div className="text-xs text-foreground/40 uppercase tracking-wider mb-3">{member.role}</div>
                  <p className="text-sm text-foreground/50 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-card/30">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeIn}>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-foreground/60 text-foreground/60" />)}
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Your manuscript deserves<br />a global audience.
            </h3>
            <p className="text-foreground/40 text-lg mb-10 max-w-xl mx-auto">
              Get in touch with Mahad or Rafay today — tell us about your book and we'll map out a publishing plan tailored to you.
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Start Your Publishing Journey <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}

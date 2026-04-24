import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { from: "bot" | "user"; text: string };

const QA: { triggers: string[]; answer: string }[] = [
  {
    triggers: ["price", "pricing", "cost", "how much", "rate", "rates", "plan", "plans", "starter", "growth", "scale"],
    answer: "We have three plans:\n\n• Starter — $399/mo (8 short-form videos, 48h delivery)\n• Growth — $799/mo (10 short-form + 2 YouTube edits, 24h delivery, unlimited revisions)\n• Scale — Custom pricing for high-volume brands\n\nWant to chat about which fits you?",
  },
  {
    triggers: ["deliver", "turnaround", "how long", "how fast", "when"],
    answer: "Short-form videos (Reels, TikToks, Ads) are delivered within 48 hours. YouTube long-form takes 72 hours. Rush delivery is available — just mention it when you reach out.",
  },
  {
    triggers: ["revision", "revisions", "change", "edit again", "redo"],
    answer: "Starter and Growth plans include 3 revisions per video. Scale includes unlimited. We aim to nail it in the first pass so revisions are rarely needed.",
  },
  {
    triggers: ["service", "services", "what do you do", "what do you offer", "reel", "youtube", "ad", "motion", "brand"],
    answer: "We offer four core services:\n\n• Instagram Reels & TikTok editing\n• YouTube long-form & talking head\n• Meta & TikTok ad creatives\n• Motion graphics & brand design\n\nAll built around retention and performance.",
  },
  {
    triggers: ["process", "how does it work", "how do i start", "get started", "start"],
    answer: "Simple process:\n1. You fill out the Start Project form\n2. We align on your brand, goals, and references\n3. We edit and deliver within the agreed timeline\n4. You review and request any revisions\n\nMost clients are up and running within 48 hours of onboarding.",
  },
  {
    triggers: ["send", "footage", "raw", "files", "how to send"],
    answer: "You send raw footage via Google Drive or any cloud link. We handle all the heavy lifting — editing, captions, graphics, sound design — and deliver back to your Drive.",
  },
  {
    triggers: ["contact", "reach", "talk", "speak", "email", "message", "human"],
    answer: "You can reach Ateeb directly by clicking the 'Start Project' button at the top of the page. He typically responds within a few hours.",
  },
  {
    triggers: ["who", "ateeb", "team", "founder", "about"],
    answer: "Setspace is led by Ateeb Hasan — Creative Lead and Project Manager. He works directly with every client from brief to final file. No hand-offs, no surprises.",
  },
  {
    triggers: ["hello", "hi", "hey", "hiya", "sup", "good morning", "good afternoon"],
    answer: "Hey! Welcome to Setspace. I can help with questions about pricing, services, turnaround times, or how to get started. What would you like to know?",
  },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const { triggers, answer } of QA) {
    if (triggers.some(t => lower.includes(t))) return answer;
  }
  return "Great question! For a detailed answer, I'd recommend clicking 'Start Project' so Ateeb can chat with you directly. He responds within a few hours.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hey there! I'm the Setspace assistant. Ask me anything about our services, pricing, or process." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(m => [...m, { from: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(m => [...m, { from: "bot", text: reply }]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 end-6 z-50 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-200"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 end-6 z-50 w-80 sm:w-96 rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "min(520px, 80vh)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-foreground/70" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-none mb-0.5">Setspace Assistant</div>
                <div className="text-[10px] text-foreground/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-foreground text-background rounded-br-sm"
                        : "bg-card border border-border text-foreground/80 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-card/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask anything..."
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-foreground/30 transition-colors"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-foreground text-background flex items-center justify-center disabled:opacity-30 transition-opacity hover:opacity-80"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

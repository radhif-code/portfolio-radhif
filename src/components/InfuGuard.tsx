import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, Cpu, Gauge, Monitor, ShieldCheck, Play, X } from "lucide-react";
import device from "@/assets/infuguard-device.jpg";

const tech = ["ESP32", "HX711", "Load Cell", "LCD I2C", "Telegram Bot", "Arduino IDE"];

const featureIcons = [Activity, ShieldCheck, Bell, Monitor];

const demoVideos = [
  { src: "/projects/infuguard/demo.mp4", label: "InfuGuard Demo — System Overview" },
  { src: "/projects/infuguard/demo2.mp4", label: "InfuGuard Demo — Live Operation" },
];

export function InfuGuard() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [vidIdx, setVidIdx] = useState(0);
  const { lang } = useLang();
  const t = translations[lang].infuguard;
  const tf = t.features;

  return (
    <section id="infuguard" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{t.tag}</span>
          <h2 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Infu<span className="text-gradient italic">Guard</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t.subheading}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Clickable device image → opens video */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl glass p-1 glow-border group cursor-pointer"
            onClick={() => { setVidIdx(0); setVideoOpen(true); }}>
            <div className="relative overflow-hidden rounded-[1.4rem]">
              <img src={device} alt="InfuGuard prototype" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid size-16 place-items-center rounded-full transition-all duration-400 group-hover:scale-110"
                  style={{ background: "rgba(37,99,235,0.85)", boxShadow: "0 8px 32px rgba(37,99,235,0.4)" }}>
                  <Play className="size-7 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(37,99,235,0.15)", color: "#93c5fd", border: "1px solid rgba(79,140,255,0.3)" }}>
                  {t.watchDemo}
                </span>
                <span className="text-xs" style={{ color: "rgba(200,215,255,0.6)", fontFamily: "Montserrat, sans-serif" }}>
                  {t.videosAvailable(demoVideos.length)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="glass flex flex-col justify-between rounded-3xl p-8 glow-border">
            <div>
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon-soft text-neon ring-1 ring-neon/30">
                <Cpu className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{t.techTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.techDesc}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span key={t} className="rounded-full border border-neon/30 bg-neon-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-neon">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tf.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass relative overflow-hidden rounded-2xl p-6 glow-border-hover">
              <Gauge className="absolute -right-4 -top-4 size-20 text-neon/5" />
              {featureIcons[i] && (() => { const Ic = featureIcons[i]; return <Ic className="size-5 text-neon" />; })()}
              <h4 className="mt-4 font-display font-semibold">{f.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div key="vid-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(24px)" }}
            onClick={() => setVideoOpen(false)}>
            <motion.div key="vid-panel"
              initial={{ opacity: 0, scale: 0.95, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl overflow-hidden"
              style={{ borderRadius: 24, boxShadow: "0 0 0 1px rgba(79,140,255,0.2), 0 32px 80px rgba(79,140,255,0.18), 0 8px 32px rgba(0,0,0,0.3)" }}
              onClick={(e) => e.stopPropagation()}>

              <button onClick={() => setVideoOpen(false)} className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full" style={{ background: "rgba(0,0,0,0.4)", color: "white" }}>
                <X className="size-4" />
              </button>

              <video key={demoVideos[vidIdx].src} src={demoVideos[vidIdx].src} controls autoPlay playsInline
                className="w-full" style={{ display: "block", background: "#060d24" }} />

              {/* Video selector */}
              {demoVideos.length > 1 && (
                <div className="flex gap-2 p-3" style={{ background: "rgba(6,13,36,0.98)" }}>
                  {demoVideos.map((v, i) => (
                    <button key={i} onClick={() => setVidIdx(i)}
                      className="flex-1 rounded-xl px-3 py-2 text-xs font-semibold text-left transition-all"
                      style={{
                        background: i === vidIdx ? "rgba(79,140,255,0.18)" : "rgba(255,255,255,0.04)",
                        color: i === vidIdx ? "#93c5fd" : "#64748b",
                        border: i === vidIdx ? "1px solid rgba(79,140,255,0.35)" : "1px solid rgba(255,255,255,0.06)",
                        fontFamily: "Montserrat, sans-serif",
                      }}>
                      {v.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// 16 certificates — ordered newest to oldest based on visible dates
// cert-01: Juara 3 Poster Digital Fellasia 2025
// cert-02: Deutsche Woche 2023 participation
// cert-03: Sekolah Pasar Modal IDX April 2026
// cert-04-16: other certs (we display newest first)
// Reorder: 2026 first, 2025 next, 2024, 2023
const certificates = [
  { file: "cert-03.png", year: "2026", title: "Sekolah Pasar Modal", org: "Bursa Efek Indonesia" },
  { file: "cert-01.png", year: "2025", title: "Juara 3 Lomba Poster Digital", org: "Fellasia – Universitas Brawijaya" },
  { file: "cert-04.png", year: "2025", title: "Certificate", org: "2025" },
  { file: "cert-05.png", year: "2025", title: "Certificate", org: "2025" },
  { file: "cert-06.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-07.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-08.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-09.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-10.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-11.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-12.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-13.png", year: "2024", title: "Certificate", org: "2024" },
  { file: "cert-14.png", year: "2023", title: "Certificate", org: "2023" },
  { file: "cert-15.png", year: "2023", title: "Certificate", org: "2023" },
  { file: "cert-16.png", year: "2023", title: "Certificate", org: "2023" },
  { file: "cert-02.png", year: "2023", title: "Deutsche Woche XXVII", org: "Universitas Negeri Surabaya" },
];

function CertModal({ cert, onClose }: { cert: typeof certificates[0] | null; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!cert) return;
    const certIdx = certificates.findIndex((c) => c.file === cert.file);
    setIdx(certIdx >= 0 ? certIdx : 0);
  }, [cert]);

  useEffect(() => {
    if (!cert) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % certificates.length);
    }, 2000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [cert]);

  useEffect(() => {
    document.body.style.overflow = cert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cert]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!cert) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") { if (intervalRef.current) clearInterval(intervalRef.current); setIdx((i) => (i + 1) % certificates.length); }
    if (e.key === "ArrowLeft") { if (intervalRef.current) clearInterval(intervalRef.current); setIdx((i) => (i - 1 + certificates.length) % certificates.length); }
  }, [cert, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          key="cert-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(0.06 0.03 250 / 0.9)", backdropFilter: "blur(24px)" }}
          onClick={onClose}
        >
          <motion.div
            key="cert-modal"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 40px 100px -20px oklch(0 0 0 / 0.6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full transition-colors"
              style={{ background: "oklch(0 0 0 / 0.3)", color: "white" }}
            >
              <X className="size-4" />
            </button>

            <div className="relative" style={{ background: "oklch(0.1 0.03 250)", aspectRatio: "16/9" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={`/certificates/${certificates[idx].file}`}
                  alt={certificates[idx].title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "oklch(1 0 0 / 0.1)" }}>
                <motion.div
                  key={idx}
                  className="h-full"
                  style={{ background: "oklch(0.55 0.24 250)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </div>

              <div className="absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[10px]"
                style={{ background: "oklch(0 0 0 / 0.5)", color: "oklch(0.8 0 0)" }}>
                {idx + 1} / {certificates.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-1.5 overflow-x-auto p-3" style={{ background: "oklch(0.08 0.03 250)" }}>
              {certificates.map((c, i) => (
                <button
                  key={c.file}
                  onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setIdx(i); }}
                  className="shrink-0 overflow-hidden rounded-lg transition-all"
                  style={{
                    width: 60, height: 34,
                    outline: i === idx ? "2px solid oklch(0.55 0.24 250)" : "2px solid transparent",
                    outlineOffset: 1,
                  }}
                >
                  <img src={`/certificates/${c.file}`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Certificates() {
  const [selected, setSelected] = useState<typeof certificates[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);

  // Continuous infinite marquee scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let paused = false;

    const step = () => {
      if (!paused) {
        posRef.current += 0.5;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.parentElement?.addEventListener("mouseenter", pause);
    el.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      el.parentElement?.removeEventListener("mouseenter", pause);
      el.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate certificates for seamless loop
  const doubled = [...certificates, ...certificates];

  return (
    <section id="certificates" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">/ 06 — Certificates</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Recognition &<br /><span className="text-gradient italic">credentials.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg">
            Click any certificate to open the full gallery — it loops automatically through all {certificates.length} certificates.
          </p>
        </motion.div>
      </div>

      {/* Infinite scrolling strip */}
      <div className="relative overflow-hidden" style={{ cursor: "pointer" }}>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        <div ref={scrollRef} className="flex gap-4 w-max py-2">
          {doubled.map((cert, i) => (
            <motion.button
              key={`${cert.file}-${i}`}
              onClick={() => setSelected(cert)}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative shrink-0 overflow-hidden rounded-2xl glass glow-border-hover"
              style={{ width: 280, height: 158 }}
            >
              <img
                src={`/certificates/${cert.file}`}
                alt={cert.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: "oklch(0.55 0.24 250)" }}>
                  {cert.year}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

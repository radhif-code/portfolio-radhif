import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Play } from "lucide-react";
import { projects as allProjects, type Project } from "../data/projects";

import photoshop from "@/assets/tools/photoshop.png";
import canva from "@/assets/tools/canva.jpg";
import capcut from "@/assets/tools/capcut.png";
import excel from "@/assets/tools/excel.png";
import spss from "@/assets/tools/spss.png";
import smartpls from "@/assets/tools/smartpls.png";
import arduino from "@/assets/tools/arduino.png";
import word from "@/assets/tools/word.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const displayProjects = allProjects.filter((p) => p.slug !== "infuguard");

const certificates = [
  { file: "cert-03.png", year: "2026", title: "Sekolah Pasar Modal", org: "Bursa Efek Indonesia" },
  { file: "cert-01.png", year: "2025", title: "Juara 3 – Lomba Poster Digital", org: "Fellasia · Universitas Brawijaya" },
  { file: "cert-04.png", year: "2025", title: "Sertifikat Peserta", org: "2025" },
  { file: "cert-05.png", year: "2025", title: "Sertifikat Peserta", org: "2025" },
  { file: "cert-06.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-07.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-08.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-09.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-10.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-11.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-12.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-13.png", year: "2024", title: "Sertifikat Peserta", org: "2024" },
  { file: "cert-14.png", year: "2023", title: "Sertifikat Peserta", org: "2023" },
  { file: "cert-15.png", year: "2023", title: "Sertifikat Peserta", org: "2023" },
  { file: "cert-16.png", year: "2023", title: "Sertifikat Peserta", org: "2023" },
  { file: "cert-02.png", year: "2023", title: "Deutsche Woche XXVII", org: "Universitas Negeri Surabaya" },
];

const techStack = [
  { name: "Adobe Photoshop", logo: photoshop, category: "Design", desc: "Photo manipulation & graphic design" },
  { name: "Canva", logo: canva, category: "Design", desc: "Social media & presentation design" },
  { name: "CapCut", logo: capcut, category: "Video", desc: "Video editing & motion content" },
  { name: "Microsoft Excel", logo: excel, category: "Data", desc: "Spreadsheets & data analysis" },
  { name: "IBM SPSS", logo: spss, category: "Data", desc: "Statistical analysis software" },
  { name: "SmartPLS", logo: smartpls, category: "Data", desc: "Structural equation modeling" },
  { name: "Arduino IDE", logo: arduino, category: "IoT", desc: "ESP32 firmware development" },
  { name: "MS Word", logo: word, category: "Writing", desc: "Research & proposal writing" },
];

const docPhotos = [
  { file: "doc-1.png", caption: "Juara 3 Lomba Nasional Poster Digital – Fellasia 2025, Universitas Brawijaya" },
  { file: "doc-2.png", caption: "Lolos Seleksi Tahap 2 PKM – PKM-RSH & PKM-VGK, UNESA 2025" },
  { file: "doc-3.png", caption: "Juara 2 Kejurkab Softball Piala KONI Kab. Jombang – SMA Budi Utomo" },
  { file: "doc-4.png", caption: "Atlet Softball – Kompetisi Tingkat Kabupaten Jombang" },
  { file: "doc-5.png", caption: "Mahasiswa Lolos Skema Penelitian Dasar Mahasiswa (LPPM) UNESA 2026" },
  { file: "doc-6.png", caption: "Klinik PKM 2026 – Penguatan & Pendampingan Program Kreativitas Mahasiswa" },
  { file: "doc-7.png", caption: "Akreditasi Program Studi S1 Bisnis Digital FEB UNESA – Maret 2026" },
  { file: "doc-8.png", caption: "Kanvas Yearbook MMXXIV Project – Designer, SMA Budi Utomo" },
];

type Tab = "Projects" | "Certificates" | "Tech Stack" | "Documentation";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function useAutoLoop(len: number, delay = 2600, active = true) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = useCallback(() => {
    if (ref.current) clearInterval(ref.current);
    if (!active || len <= 1) return;
    ref.current = setInterval(() => setIdx((i) => (i + 1) % len), delay);
  }, [len, delay, active]);
  useEffect(() => { start(); return () => { if (ref.current) clearInterval(ref.current); }; }, [start]);
  const stop = () => { if (ref.current) clearInterval(ref.current); };
  const jump = (i: number) => { stop(); setIdx(i); };
  const nav = (dir: 1 | -1) => { stop(); setIdx((i) => (i + dir + len) % len); };
  return { idx, setIdx, stop, jump, nav };
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const len = project?.media.length ?? 0;
  const isVideo = (i: number) => project?.media[i]?.type === "video";
  const { idx, jump, nav } = useAutoLoop(len, 2800, !!project && !isVideo(0));

  useEffect(() => { if (!project) return; }, [project]);
  useEffect(() => { document.body.style.overflow = project ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [project]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!project) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") nav(1);
    if (e.key === "ArrowLeft") nav(-1);
  }, [project, onClose, nav]);
  useEffect(() => { document.addEventListener("keydown", handleKey); return () => document.removeEventListener("keydown", handleKey); }, [handleKey]);

  if (!project) return null;
  const current = project.media[idx];

  return (
    <AnimatePresence>
      <motion.div
        key="pm-bg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
        style={{ background: "rgba(3,7,18,0.93)", backdropFilter: "blur(24px)" }}
        onClick={onClose}
      >
        <motion.div
          key="pm-panel"
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col lg:flex-row"
          style={{
            borderRadius: 28,
            background: "linear-gradient(150deg,#ffffff 0%,#f0f6ff 100%)",
            boxShadow: "0 0 0 1px rgba(79,140,255,0.15), 0 32px 80px rgba(79,140,255,0.2), 0 8px 32px rgba(0,0,0,0.2)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full transition-all hover:scale-110 hover:bg-black/10" style={{ color: "#374151" }}>
            <X className="size-4" />
          </button>

          {/* Media */}
          {len > 0 && (
            <div className="lg:w-[58%] shrink-0 flex flex-col overflow-hidden" style={{ background: "#060d24", borderRadius: "28px 0 0 28px" }}>
              <div className="relative flex-1 min-h-[220px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={idx}
                    initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center">
                    {current.type === "image"
                      ? <img src={current.src} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-contain" />
                      : <video key={current.src} src={current.src} controls playsInline autoPlay className="w-full h-full object-contain" />}
                  </motion.div>
                </AnimatePresence>

                {len > 1 && (
                  <>
                    <button onClick={() => nav(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid size-9 place-items-center rounded-full hover:scale-110 transition-transform" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}><ChevronLeft className="size-5" /></button>
                    <button onClick={() => nav(1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid size-9 place-items-center rounded-full hover:scale-110 transition-transform" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}><ChevronRight className="size-5" /></button>
                  </>
                )}
                <div className="absolute top-3 left-3 rounded-full px-2.5 py-0.5 font-mono text-[10px]" style={{ background: "rgba(0,0,0,0.5)", color: "rgba(200,215,255,0.9)" }}>{idx + 1} / {len}</div>
              </div>

              {len > 1 && (
                <div className="p-3 flex flex-col gap-2" style={{ background: "rgba(0,0,0,0.35)" }}>
                  {/* progress bar */}
                  <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div key={idx} className="h-full rounded-full" style={{ background: "#4f8cff" }}
                      initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.8, ease: "linear" }} />
                  </div>
                  {/* thumbs */}
                  <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                    {project.media.map((m, i) => (
                      <button key={i} onClick={() => jump(i)} className="shrink-0 overflow-hidden rounded-md transition-all"
                        style={{ width: 44, height: 28, outline: i === idx ? "2px solid #4f8cff" : "2px solid transparent", outlineOffset: 1, opacity: i === idx ? 1 : 0.4 }}>
                        {m.type === "image"
                          ? <img src={m.src} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full grid place-items-center text-[9px]" style={{ background: "#1e293b", color: "#94a3b8" }}><Play className="size-2.5" /></div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-5 overflow-y-auto p-6 lg:flex-1">
            <div className="flex flex-wrap gap-2 pr-8">
              <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest" style={{ background: "rgba(79,140,255,0.1)", color: "#2563eb", boxShadow: "inset 0 0 0 1px rgba(79,140,255,0.25)" }}>{project.tag}</span>
              <span className="self-center font-mono text-[11px]" style={{ color: "#94a3b8" }}>{project.year}</span>
            </div>

            <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: "Poppins, sans-serif", color: "#0f172a" }}>{project.title}</h2>

            <div className="flex flex-col gap-2.5">
              {project.longDescription.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ fontFamily: "Montserrat, sans-serif", color: "#475569" }}>{p}</p>
              ))}
            </div>

            <div className="rounded-2xl p-4 flex flex-col gap-2.5" style={{ background: "rgba(79,140,255,0.05)", border: "1px solid rgba(79,140,255,0.12)" }}>
              {project.details.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <span className="w-20 shrink-0 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#3b82f6", fontFamily: "Poppins, sans-serif" }}>{d.label}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "#334155", fontFamily: "Montserrat, sans-serif" }}>{d.value}</span>
                </div>
              ))}
            </div>

            {project.externalLink && (
              <a href={project.externalLink.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03]"
                style={{ background: "#2563eb", color: "white", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
                {project.externalLink.label}<ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── CERT MODAL ───────────────────────────────────────────────────────────────

function CertModal({ startIdx, onClose }: { startIdx: number | null; onClose: () => void }) {
  const { idx, jump, nav } = useAutoLoop(certificates.length, 2200, startIdx !== null);
  useEffect(() => { if (startIdx !== null) jump(startIdx); }, [startIdx]);
  useEffect(() => { document.body.style.overflow = startIdx !== null ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [startIdx]);
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (startIdx === null) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") nav(1);
    if (e.key === "ArrowLeft") nav(-1);
  }, [startIdx, onClose, nav]);
  useEffect(() => { document.addEventListener("keydown", handleKey); return () => document.removeEventListener("keydown", handleKey); }, [handleKey]);

  return (
    <AnimatePresence>
      {startIdx !== null && (
        <motion.div key="cm-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(24px)" }}
          onClick={onClose}>
          <motion.div key="cm-panel"
            initial={{ opacity: 0, scale: 0.95, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl overflow-hidden"
            style={{ borderRadius: 24, boxShadow: "0 0 0 1px rgba(79,140,255,0.2), 0 32px 80px rgba(79,140,255,0.18), 0 8px 32px rgba(0,0,0,0.3)" }}
            onClick={(e) => e.stopPropagation()}>

            <button onClick={onClose} className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full" style={{ background: "rgba(0,0,0,0.4)", color: "white" }}><X className="size-4" /></button>

            <div className="relative" style={{ background: "#060d24", aspectRatio: "16/9" }}>
              <AnimatePresence mode="wait">
                <motion.img key={idx} src={`/certificates/${certificates[idx].file}`} alt={certificates[idx].title}
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }} className="absolute inset-0 w-full h-full object-contain" />
              </AnimatePresence>
              <button onClick={() => nav(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full hover:scale-110 transition-transform" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}><ChevronLeft className="size-5" /></button>
              <button onClick={() => nav(1)} className="absolute right-3 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full hover:scale-110 transition-transform" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}><ChevronRight className="size-5" /></button>
              <div className="absolute top-3 left-3 rounded-full px-2.5 py-0.5 font-mono text-[10px]" style={{ background: "rgba(0,0,0,0.5)", color: "rgba(200,215,255,0.9)" }}>{idx + 1} / {certificates.length}</div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div key={idx} className="h-full" style={{ background: "#4f8cff" }} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.2, ease: "linear" }} />
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto p-3" style={{ background: "rgba(6,13,36,0.98)" }}>
              {certificates.map((c, i) => (
                <button key={c.file} onClick={() => jump(i)} className="shrink-0 overflow-hidden rounded-lg transition-all"
                  style={{ width: 64, height: 36, outline: i === idx ? "2px solid #4f8cff" : "2px solid transparent", outlineOffset: 1, opacity: i === idx ? 1 : 0.4 }}>
                  <img src={`/certificates/${c.file}`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="px-4 py-3" style={{ background: "rgba(6,13,36,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-sm font-semibold" style={{ color: "white", fontFamily: "Poppins, sans-serif" }}>{certificates[idx].title}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "#94a3b8", fontFamily: "Montserrat, sans-serif" }}>{certificates[idx].org} · {certificates[idx].year}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── INFINITE MARQUEE ─────────────────────────────────────────────────────────

function InfiniteMarquee({ items, speed = 0.55 }: {
  items: { src: string; label?: string }[];
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        if (posRef.current >= el.scrollWidth / 2) posRef.current = 0;
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    const p = el.parentElement!;
    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    p.addEventListener("mouseenter", pause);
    p.addEventListener("mouseleave", resume);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      p.removeEventListener("mouseenter", pause);
      p.removeEventListener("mouseleave", resume);
    };
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div ref={trackRef} className="flex gap-4 w-max">
      {doubled.map((item, i) => (
        <div key={i} className="shrink-0 flex flex-col gap-1.5">
          <div className="overflow-hidden rounded-2xl" style={{ width: 280, height: 158 }}>
            <img src={item.src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          {item.label && (
            <p className="text-[10px] leading-snug px-0.5 line-clamp-1" style={{ color: "#64748b", fontFamily: "Montserrat, sans-serif", maxWidth: 280 }}>
              {item.label}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── EDITORIAL PROJECT SLIDER ─────────────────────────────────────────────────

function EditorialSlider({ projects, onSelect }: { projects: Project[]; onSelect: (p: Project) => void }) {
  const [featured, setFeatured] = useState(0);

  const prev = () => setFeatured((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setFeatured((i) => (i + 1) % projects.length);

  const fp = projects[featured];
  const rest = projects.filter((_, i) => i !== featured);

  return (
    <div className="relative w-full select-none">
      {/* Oversized background text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-start pl-4 select-none" style={{ zIndex: 0 }}>
        <span className="font-black uppercase leading-none whitespace-nowrap"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(80px, 14vw, 160px)",
            color: "rgba(79,140,255,0.05)",
            letterSpacing: "-0.04em",
          }}>
          {fp.title.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>

      <div className="relative z-10 flex gap-4 items-stretch" style={{ minHeight: 480 }}>
        {/* Featured card — 70% */}
        <motion.button
          key={fp.slug}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelect(fp)}
          className="group relative overflow-hidden flex-shrink-0 text-left cursor-pointer"
          style={{
            width: "68%",
            borderRadius: 32,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(79,140,255,0.15)",
            boxShadow: "0 4px 32px rgba(79,140,255,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
          whileHover={{ scale: 1.015, boxShadow: "0 16px 56px rgba(79,140,255,0.22), 0 0 0 1.5px rgba(79,140,255,0.4)" }}
        >
          {/* image */}
          <div className="relative overflow-hidden h-full" style={{ borderRadius: 30 }}>
            <img src={fp.img} alt={fp.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ minHeight: 480 }} />
            {/* grain overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,15,40,0.82) 0%, rgba(8,15,40,0.2) 45%, transparent 100%)" }} />

            {/* Hover arrow */}
            <div className="absolute right-5 top-5 grid size-11 place-items-center rounded-full opacity-0 transition-all duration-400 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
              style={{ background: "rgba(37,99,235,0.92)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
              <ArrowUpRight className="size-5 text-white" />
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(79,140,255,0.2)", color: "#93c5fd", border: "1px solid rgba(79,140,255,0.4)", backdropFilter: "blur(8px)" }}>
                  {fp.tag}
                </span>
                <span className="text-[11px] font-mono" style={{ color: "rgba(200,215,255,0.7)" }}>{fp.year}</span>
              </div>
              <h3 className="text-2xl font-black sm:text-3xl md:text-4xl leading-tight" style={{ fontFamily: "Poppins, sans-serif", color: "white" }}>
                {fp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed max-w-sm" style={{ color: "rgba(200,215,255,0.7)", fontFamily: "Montserrat, sans-serif" }}>
                {fp.desc}
              </p>
            </div>
          </div>
        </motion.button>

        {/* Side cards — 30% */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          {rest.slice(0, 2).map((p, i) => (
            <motion.button
              key={p.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={() => { setFeatured(projects.indexOf(p)); onSelect(p); }}
              className="group relative overflow-hidden flex-1 text-left cursor-pointer"
              style={{
                borderRadius: 24,
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(79,140,255,0.12)",
                boxShadow: "0 4px 20px rgba(79,140,255,0.06)",
                minHeight: 0,
              }}
              whileHover={{ scale: 1.025, boxShadow: "0 12px 40px rgba(79,140,255,0.2), 0 0 0 1.5px rgba(79,140,255,0.35)" }}
            >
              <div className="relative overflow-hidden h-full" style={{ borderRadius: 22 }}>
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  style={{ minHeight: 180 }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,15,40,0.8) 0%, rgba(8,15,40,0.1) 60%, transparent 100%)" }} />
                <div className="absolute right-3 top-3 grid size-8 place-items-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{ background: "rgba(37,99,235,0.9)" }}>
                  <ArrowUpRight className="size-3.5 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                    style={{ background: "rgba(79,140,255,0.18)", color: "#93c5fd", border: "1px solid rgba(79,140,255,0.35)" }}>
                    {p.tag}
                  </span>
                  <h4 className="mt-1.5 text-base font-bold leading-tight" style={{ fontFamily: "Poppins, sans-serif", color: "white" }}>
                    {p.title}
                  </h4>
                </div>
              </div>
            </motion.button>
          ))}
          {rest.length > 2 && (
            <button
              onClick={() => setFeatured((featured + 3) % projects.length)}
              className="flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: "rgba(79,140,255,0.08)", color: "#2563eb", border: "1px solid rgba(79,140,255,0.2)" }}>
              +{rest.length - 2} more
              <ArrowUpRight className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-3 mt-6 justify-end">
        <button onClick={prev} className="grid size-10 place-items-center rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(79,140,255,0.08)", border: "1px solid rgba(79,140,255,0.2)", color: "#2563eb" }}>
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-1.5">
          {projects.map((_, i) => (
            <button key={i} onClick={() => setFeatured(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === featured ? 20 : 6, height: 6, background: i === featured ? "#4f8cff" : "rgba(79,140,255,0.25)" }} />
          ))}
        </div>
        <button onClick={next} className="grid size-10 place-items-center rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(79,140,255,0.08)", border: "1px solid rgba(79,140,255,0.2)", color: "#2563eb" }}>
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

// ─── TAB VARIANTS ─────────────────────────────────────────────────────────────

const tabV = {
  enter: { opacity: 0, y: 20, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(6px)" },
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [certIdx, setCertIdx] = useState<number | null>(null);
  const { lang } = useLang();
  const t = translations[lang].showcase;
  const TABS = t.tabs as unknown as Tab[];

  const certMarqueeItems = certificates.map((c) => ({ src: `/certificates/${c.file}` }));

  return (
    <section id="showcase" className="relative py-24 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(79,140,255,0.035) 1px, transparent 1px), linear-gradient(90deg,rgba(79,140,255,0.035) 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(79,140,255,0.06) 1.5px, transparent 1.5px)",
        backgroundSize: "40px 40px",
        backgroundPosition: "20px 20px",
      }} />
      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 pointer-events-none"
        style={{ width: 900, height: 500, background: "radial-gradient(ellipse, rgba(79,140,255,0.06) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{t.tag}</span>
          <h2 className="mt-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(48px,8vw,88px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0f172a", lineHeight: 1.05 }}>
            {t.heading}
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ fontFamily: "Montserrat, sans-serif", color: "#64748b" }}>
            {t.subheading}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="flex justify-center mb-12">
          <div className="inline-flex rounded-2xl p-1.5 gap-1 flex-wrap justify-center"
            style={{ background: "rgba(79,140,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(79,140,255,0.12)" }}>
            {TABS.map((tab: Tab) => {
              const active = tab === activeTab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: active ? "#1d4ed8" : "#64748b",
                    background: active ? "rgba(255,255,255,0.95)" : "transparent",
                    boxShadow: active ? "0 2px 20px rgba(79,140,255,0.18), 0 0 0 1px rgba(79,140,255,0.15)" : "none",
                    transform: active ? "scale(1.02)" : "scale(1)",
                  }}>
                  {active && (
                    <motion.span layoutId="tab-glow" className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(79,140,255,0.04)" }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }} />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={tabV} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>

            {/* ── PROJECTS ── */}
            {activeTab === "Projects" && (
              <EditorialSlider projects={displayProjects} onSelect={setSelectedProject} />
            )}

            {/* ── CERTIFICATES ── */}
            {activeTab === "Certificates" && (
              <div className="flex flex-col gap-8">
                <p className="text-sm text-center" style={{ color: "#64748b", fontFamily: "Montserrat, sans-serif" }}>
                  {certificates.length} certificates · hover to pause · click any to open gallery
                </p>

                {/* Marquee strip */}
                <div className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
                  <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
                  <div className="relative cursor-pointer" onClick={() => setCertIdx(0)}>
                    <InfiniteMarquee items={certMarqueeItems} />
                  </div>
                </div>

                {/* Grid */}
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {certificates.map((cert, i) => (
                    <motion.button key={cert.file}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.025 }}
                      onClick={() => setCertIdx(i)}
                      className="group relative overflow-hidden"
                      style={{ aspectRatio: "16/9", borderRadius: 14, border: "1px solid rgba(79,140,255,0.1)" }}
                      whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(79,140,255,0.2), 0 0 0 1.5px rgba(79,140,255,0.35)" }}>
                      <img src={`/certificates/${cert.file}`} alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(37,99,235,0.12)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        style={{ background: "rgba(6,13,36,0.75)", backdropFilter: "blur(4px)" }}>
                        <p className="text-[9px] font-mono truncate" style={{ color: "#93c5fd" }}>{cert.year} · {cert.title}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ── TECH STACK ── */}
            {activeTab === "Tech Stack" && (
              <div className="flex flex-col gap-8">
                <p className="text-sm text-center" style={{ color: "#64748b", fontFamily: "Montserrat, sans-serif" }}>
                  Tools & technologies I work with regularly
                </p>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {techStack.map((tool, i) => (
                    <motion.div key={tool.name}
                      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="group relative flex flex-col items-center gap-3 p-6 text-center cursor-default"
                      style={{
                        borderRadius: 22,
                        background: "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(79,140,255,0.1)",
                        boxShadow: "0 4px 20px rgba(79,140,255,0.05)",
                      }}
                      whileHover={{ scale: 1.05, y: -6, boxShadow: "0 12px 36px rgba(79,140,255,0.18), 0 0 0 1.5px rgba(79,140,255,0.3)" }}>
                      <img src={tool.logo} alt={tool.name}
                        className="size-14 object-contain transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                      <div>
                        <p className="text-sm font-bold leading-tight" style={{ color: "#0f172a", fontFamily: "Poppins, sans-serif" }}>{tool.name}</p>
                        <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "#64748b", fontFamily: "Montserrat, sans-serif" }}>{tool.desc}</p>
                      </div>
                      <span className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider"
                        style={{ background: "rgba(37,99,235,0.07)", color: "#3b82f6" }}>{tool.category}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── DOCUMENTATION ── */}
            {activeTab === "Documentation" && (
              <div className="flex flex-col gap-8">
                <p className="text-sm text-center" style={{ color: "#64748b", fontFamily: "Montserrat, sans-serif" }}>
                  Activity highlights & memorable moments
                </p>

                {/* Marquee */}
                <div className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
                  <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
                  <InfiniteMarquee items={docPhotos.map((d) => ({ src: `/docs/${d.file}`, label: d.caption }))} speed={0.4} />
                </div>

                {/* Grid with caption */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {docPhotos.map((doc, i) => (
                    <motion.div key={doc.file}
                      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="group flex flex-col gap-2.5">
                      <div className="relative overflow-hidden" style={{ borderRadius: 20, border: "1px solid rgba(79,140,255,0.1)" }}>
                        <img src={`/docs/${doc.file}`} alt={doc.caption}
                          className="w-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                          style={{ aspectRatio: "4/3" }} loading="lazy" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "rgba(79,140,255,0.06)" }} />
                      </div>
                      <p className="text-xs leading-snug px-1" style={{ color: "#475569", fontFamily: "Montserrat, sans-serif" }}>
                        {doc.caption}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertModal startIdx={certIdx} onClose={() => setCertIdx(null)} />
    </section>
  );
}

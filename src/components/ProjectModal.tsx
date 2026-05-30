import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMediaIndex(0);
  }, [project]);

  // Auto-loop through media
  useEffect(() => {
    if (!project || project.media.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setMediaIndex((i) => (i + 1) % project.media.length);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [project]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setMediaIndex((i) => (i + 1) % project.media.length);
      }
      if (e.key === "ArrowLeft") {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setMediaIndex((i) => (i - 1 + project.media.length) % project.media.length);
      }
    },
    [project, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  if (!project) return null;

  const current = project.media[mediaIndex];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "oklch(0.08 0.03 250 / 0.88)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col lg:flex-row"
            style={{
              background: "oklch(0.99 0.005 240)",
              boxShadow: "0 40px 120px -20px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.55 0.24 250 / 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full transition-colors"
              style={{ background: "oklch(0 0 0 / 0.12)", color: "oklch(0.8 0 0)" }}
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* Media panel - auto-looping */}
            {project.media.length > 0 && (
              <div className="relative lg:w-[58%] shrink-0 overflow-hidden"
                style={{ background: "oklch(0.08 0.03 250)", minHeight: 280 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mediaIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {current.type === "image" ? (
                      <img
                        src={current.src}
                        alt={`${project.title} ${mediaIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        key={current.src}
                        src={current.src}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                {project.media.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {project.media.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (intervalRef.current) clearInterval(intervalRef.current);
                          setMediaIndex(i);
                        }}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === mediaIndex ? 20 : 6,
                          height: 6,
                          background: i === mediaIndex
                            ? "oklch(0.55 0.24 250)"
                            : "oklch(1 0 0 / 0.35)",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Counter */}
                <div className="absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[10px]"
                  style={{ background: "oklch(0 0 0 / 0.4)", color: "oklch(0.8 0 0)" }}>
                  {mediaIndex + 1} / {project.media.length}
                </div>
              </div>
            )}

            {/* Info panel */}
            <div className="flex flex-col gap-5 overflow-y-auto p-7 lg:flex-1">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                    style={{ background: "oklch(0.55 0.24 250 / 0.1)", color: "oklch(0.45 0.22 250)", boxShadow: "inset 0 0 0 1px oklch(0.55 0.24 250 / 0.25)" }}>
                    {project.tag}
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: "oklch(0.55 0.08 250)", lineHeight: "2rem" }}>
                    {project.year}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
                  style={{ color: "oklch(0.15 0.05 250)" }}>
                  {project.title}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {project.longDescription.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.05 250)" }}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="rounded-2xl p-4 flex flex-col gap-2.5"
                style={{ background: "oklch(0.97 0.01 250)" }}>
                {project.details.map((d) => (
                  <div key={d.label} className="flex gap-3 text-sm">
                    <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider"
                      style={{ color: "oklch(0.55 0.15 250)" }}>
                      {d.label}
                    </span>
                    <span className="text-xs" style={{ color: "oklch(0.25 0.05 250)" }}>{d.value}</span>
                  </div>
                ))}
              </div>

              {project.externalLink && (
                <a
                  href={project.externalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03]"
                  style={{ background: "oklch(0.55 0.24 250)", color: "oklch(0.99 0.005 240)", boxShadow: "0 0 30px -8px oklch(0.55 0.24 250)" }}
                >
                  {project.externalLink.label}
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

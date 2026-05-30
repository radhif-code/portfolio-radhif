import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setMediaIndex(0);
    setImgError({});
  }, [project]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setMediaIndex((i) => Math.min(i + 1, project.media.length - 1));
      if (e.key === "ArrowLeft") setMediaIndex((i) => Math.max(i - 1, 0));
    },
    [project, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  if (!project) return null;

  const current = project.media[mediaIndex];
  const hasMedia = project.media.length > 0;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6"
          style={{ background: "oklch(0.08 0.03 250 / 0.85)", backdropFilter: "blur(16px)" }}
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-5xl rounded-3xl overflow-hidden"
            style={{
              background: "oklch(0.99 0.005 240)",
              boxShadow: "0 40px 120px -20px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.55 0.24 250 / 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full transition-colors hover:bg-black/10"
              aria-label="Close"
            >
              <X className="size-5" style={{ color: "oklch(0.35 0.05 250)" }} />
            </button>

            <div className="grid lg:grid-cols-[1fr_340px]">
              {/* Media panel */}
              {hasMedia && (
                <div className="relative flex flex-col" style={{ background: "oklch(0.1 0.03 250)" }}>
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mediaIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {current.type === "image" ? (
                          imgError[mediaIndex] ? (
                            <div className="flex flex-col items-center gap-2 text-center px-8"
                              style={{ color: "oklch(0.65 0.05 250)" }}>
                              <span className="font-mono text-xs">Image unavailable</span>
                            </div>
                          ) : (
                            <img
                              src={current.src}
                              alt={`${project.title} — ${mediaIndex + 1}`}
                              className="max-h-full max-w-full object-contain"
                              onError={() => setImgError((prev) => ({ ...prev, [mediaIndex]: true }))}
                            />
                          )
                        ) : (
                          <video
                            key={current.src}
                            src={current.src}
                            poster={"poster" in current ? current.poster : undefined}
                            controls
                            playsInline
                            className="max-h-full max-w-full"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Thumbnail strip */}
                  {project.media.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto p-3"
                      style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}>
                      <button
                        onClick={() => setMediaIndex((i) => Math.max(i - 1, 0))}
                        disabled={mediaIndex === 0}
                        className="shrink-0 grid size-7 place-items-center rounded-full transition-colors disabled:opacity-30"
                        style={{ background: "oklch(1 0 0 / 0.1)", color: "oklch(1 0 0)" }}
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      <div className="flex flex-1 gap-1.5 overflow-x-auto py-1">
                        {project.media.map((m, i) => (
                          <button
                            key={i}
                            onClick={() => setMediaIndex(i)}
                            className="relative shrink-0 overflow-hidden rounded-lg transition-all"
                            style={{
                              width: 48, height: 36,
                              outline: i === mediaIndex ? "2px solid oklch(0.55 0.24 250)" : "2px solid transparent",
                              outlineOffset: 1,
                            }}
                          >
                            {m.type === "image" ? (
                              <img src={m.src} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="grid h-full w-full place-items-center text-[10px]"
                                style={{ background: "oklch(0.2 0.04 250)", color: "oklch(0.7 0.05 250)" }}>
                                ▶
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setMediaIndex((i) => Math.min(i + 1, project.media.length - 1))}
                        disabled={mediaIndex === project.media.length - 1}
                        className="shrink-0 grid size-7 place-items-center rounded-full transition-colors disabled:opacity-30"
                        style={{ background: "oklch(1 0 0 / 0.1)", color: "oklch(1 0 0)" }}
                      >
                        <ChevronRight className="size-4" />
                      </button>
                      <span className="shrink-0 font-mono text-[10px]"
                        style={{ color: "oklch(0.55 0.05 250)" }}>
                        {mediaIndex + 1}/{project.media.length}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Info panel */}
              <div className="flex flex-col gap-6 overflow-y-auto p-7 lg:max-h-[calc(100vh-3rem)]">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ring-1"
                      style={{
                        background: "oklch(0.55 0.24 250 / 0.1)",
                        color: "oklch(0.45 0.22 250)",
                        boxShadow: "inset 0 0 0 1px oklch(0.55 0.24 250 / 0.25)"
                      }}>
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

                {/* Details table */}
                <div className="rounded-2xl p-4 flex flex-col gap-2.5"
                  style={{ background: "oklch(0.97 0.01 250)" }}>
                  {project.details.map((d) => (
                    <div key={d.label} className="flex gap-3 text-sm">
                      <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wider"
                        style={{ color: "oklch(0.55 0.15 250)" }}>
                        {d.label}
                      </span>
                      <span style={{ color: "oklch(0.25 0.05 250)" }}>{d.value}</span>
                    </div>
                  ))}
                </div>

                {project.externalLink && (
                  <a
                    href={project.externalLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03]"
                    style={{
                      background: "oklch(0.55 0.24 250)",
                      color: "oklch(0.99 0.005 240)",
                      boxShadow: "0 0 30px -8px oklch(0.55 0.24 250)"
                    }}
                  >
                    {project.externalLink.label}
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

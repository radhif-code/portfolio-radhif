import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { ProjectModal } from "./ProjectModal";

// Only show non-infuguard projects here (infuguard goes to Featured Build)
const displayProjects = projects.filter((p) => p.slug !== "infuguard");

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">/ 04 — Projects</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Selected work,<br /><span className="text-gradient italic">selected obsessions.</span>
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {displayProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <button
                onClick={() => setSelected(p)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl glass p-1 glow-border-hover text-left"
              >
                <div className="relative overflow-hidden rounded-[1.4rem]">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-neon-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neon ring-1 ring-neon/30">
                        {p.tag}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">{p.title}</h3>
                    <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">{p.desc}</p>
                  </div>
                  <div className="absolute right-5 top-5 grid size-10 place-items-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="size-4 text-neon" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { ParticleField } from "./ParticleField";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden noise">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 radial-glow" />
      <ParticleField />
      <div className="absolute left-1/2 top-1/2 -z-0 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="size-3.5 text-neon" />
          <span>Available for internships & collaborations</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient text-[clamp(2.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tighter"
        >
          RADHIF<br />
          <span className="font-light italic">ARYANT</span> AUROFIQ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          <span className="text-foreground">Graphic Designer</span>
          <span className="mx-3 text-neon">·</span>
          <span className="text-foreground">Content Creator</span>
          <span className="mx-3 text-neon">·</span>
          <span className="text-foreground">IoT Developer</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-background shadow-[0_0_40px_-8px_var(--neon)] transition-all hover:scale-[1.03]"
          >
            View Projects
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="/cv/Radhif-Aryant-Aurofiq-CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-semibold transition-all hover:bg-neon-soft hover:text-neon"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono tracking-widest">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-8 w-px bg-gradient-to-b from-neon to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

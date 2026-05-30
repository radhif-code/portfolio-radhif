import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#infuguard", label: "InfuGuard" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${scrolled ? "glass-strong" : ""}`}>
          <span className="size-2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
          <span className="font-display text-sm font-semibold tracking-wider">RADHIF.A</span>
        </a>

        <nav className={`hidden items-center gap-1 rounded-full px-2 py-2 md:flex ${scrolled ? "glass-strong" : "glass"}`}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-neon-soft hover:text-neon"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-neon px-5 py-2 text-xs font-semibold text-background shadow-[0_0_24px_-4px_var(--neon)] transition-all hover:scale-105 md:inline-block"
        >
          Let's talk
        </a>
      </div>
    </motion.header>
  );
}

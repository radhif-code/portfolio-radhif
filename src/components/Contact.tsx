import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const IgIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const LiIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GhIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const channels: { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string; value: string; href: string }[] = [
  { icon: IgIcon, label: "Instagram", value: "@radiipppp", href: "https://instagram.com/radiipppp" },
  { icon: LiIcon, label: "LinkedIn", value: "Radhif Aurofiq", href: "https://linkedin.com" },
  { icon: Mail as unknown as ComponentType<SVGProps<SVGSVGElement>>, label: "Email", value: "radhifaryantaurofiq@gmail.com", href: "mailto:radhifaryantaurofiq@gmail.com" },
  { icon: GhIcon, label: "GitHub", value: "@radhif", href: "https://github.com" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl glass p-10 glow-border sm:p-16"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">/ 06 — Contact</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Let's build<br />something <span className="text-gradient italic">remarkable.</span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Open to internships, freelance design, content collaboration, and IoT projects. Reach out through any channel — I reply fast.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex items-center justify-between rounded-2xl glass-strong px-5 py-4 transition-all hover:bg-neon-soft"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid size-10 place-items-center rounded-xl bg-neon-soft text-neon ring-1 ring-neon/30">
                      <c.icon className="size-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                      <div className="text-sm font-semibold">{c.value}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 Radhif Aryant Aurofiq · Crafted with intent.</div>
          <div className="font-mono uppercase tracking-widest">Surabaya, ID</div>
        </div>
      </div>
    </section>
  );
}

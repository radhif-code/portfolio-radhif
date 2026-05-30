import { motion } from "framer-motion";

const timeline = [
  { year: "2026", role: "Proposal Writer", org: "S2 Bisnis Digital, Universitas Negeri Surabaya" },
  { year: "2026", role: "Accreditation Team Leader", org: "S1 Bisnis Digital, Universitas Negeri Surabaya" },
  { year: "2025", role: "PKM-RSH Project Coordinator", org: "Pekan Ilmiah Mahasiswa Baru, FEB UNESA" },
  { year: "2025–26", role: "Design Team Coordinator", org: "Karang Taruna" },
  { year: "2025–26", role: "Content Creator & Online Shop Admin", org: "Khanza Underwear" },
  { year: "2023–24", role: "Yearbook Designer", org: "SMA Budi Utomo" },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">/ 03 — Experience</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Work &<br /><span className="text-gradient italic">organization timeline.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon via-neon/30 to-transparent md:left-1/2" />

          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative flex gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 size-3 -translate-x-1/2 rounded-full bg-neon shadow-[0_0_16px_var(--neon)] md:left-1/2 md:top-7" />
                <div className="hidden flex-1 md:block" />
                <div className="flex-1 pl-10 md:pl-0">
                  <div className="glass rounded-2xl p-6 glow-border-hover">
                    <div className="font-mono text-xs uppercase tracking-widest text-neon">{t.year}</div>
                    <h3 className="mt-2 font-display text-xl font-semibold">{t.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.org}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

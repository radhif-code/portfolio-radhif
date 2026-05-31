import { motion } from "framer-motion";
import portrait from "@/assets/radhif-portrait.png";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/i18n";

export function About() {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <section id="about" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="mb-16 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{t.tag}</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t.heading1}<br />{t.heading2}<br />
            <span className="text-gradient italic">{t.headingItalic}</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="glass relative overflow-hidden rounded-3xl p-1 glow-border">
            <div className="relative overflow-hidden rounded-[1.4rem]">
              <img src={portrait} alt="Radhif Aryant Aurofiq" className="aspect-[4/5] w-full object-cover transition-all duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon">{t.university}</div>
                <div className="mt-1 font-display text-xl font-semibold">{t.role}</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-between gap-8">
            <div className="glass rounded-3xl p-8 glow-border">
              <p className="text-lg leading-relaxed text-muted-foreground">{t.bio1}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.bio2}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {t.stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass rounded-2xl p-5 text-center glow-border-hover">
                  <div className="text-gradient font-display text-3xl font-bold sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

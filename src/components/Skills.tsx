import { motion } from "framer-motion";
import { Palette, Film, Megaphone, BarChart3, Cpu, FileText } from "lucide-react";
import photoshop from "@/assets/tools/photoshop.png";
import canva from "@/assets/tools/canva.jpg";
import capcut from "@/assets/tools/capcut.png";
import excel from "@/assets/tools/excel.png";
import spss from "@/assets/tools/spss.png";
import smartpls from "@/assets/tools/smartpls.png";
import arduino from "@/assets/tools/arduino.png";
import word from "@/assets/tools/word.png";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/i18n";

const icons = [Palette, Film, Megaphone, BarChart3, Cpu, FileText];
const toolSets = [
  [{ name: "Photoshop", logo: photoshop }, { name: "Canva", logo: canva }],
  [{ name: "CapCut", logo: capcut }],
  [{ name: "Canva", logo: canva }, { name: "CapCut", logo: capcut }],
  [{ name: "Excel", logo: excel }, { name: "SPSS", logo: spss }, { name: "SmartPLS", logo: smartpls }],
  [{ name: "Arduino IDE", logo: arduino }],
  [{ name: "MS Word", logo: word }],
];

export function Skills() {
  const { lang } = useLang();
  const t = translations[lang].skills;

  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{t.tag}</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t.heading1}<br /><span className="text-gradient italic">{t.headingItalic}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">{t.subheading}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-3xl glass p-7 glow-border-hover">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-neon/10 blur-3xl transition-all duration-500 group-hover:bg-neon/30" />
                <div className="relative flex h-full flex-col">
                  <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon-soft text-neon ring-1 ring-neon/30">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-auto pt-5 flex flex-wrap gap-3 items-center">
                    {toolSets[i].map((tool) => (
                      <img key={tool.name} src={tool.logo} alt={tool.name} title={tool.name}
                        className="size-10 object-contain rounded-xl transition-transform hover:-translate-y-0.5" loading="lazy" />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

type Tool = { name: string; logo: string };

const skills: {
  icon: typeof Palette;
  title: string;
  desc: string;
  tools: Tool[];
}[] = [
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Adobe Photoshop & Canva for promotional and digital content design.",
    tools: [
      { name: "Photoshop", logo: photoshop },
      { name: "Canva", logo: canva },
    ],
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "Promotional videos and digital content edited with CapCut.",
    tools: [{ name: "CapCut", logo: capcut }],
  },
  {
    icon: Megaphone,
    title: "Content Marketing",
    desc: "End-to-end product promotion across social platforms.",
    tools: [
      { name: "Canva", logo: canva },
      { name: "CapCut", logo: capcut },
    ],
  },
  {
    icon: BarChart3,
    title: "Data Processing",
    desc: "Statistical analysis with Excel, IBM SPSS & SmartPLS.",
    tools: [
      { name: "Excel", logo: excel },
      { name: "SPSS", logo: spss },
      { name: "SmartPLS", logo: smartpls },
    ],
  },
  {
    icon: Cpu,
    title: "IoT Development",
    desc: "ESP32 systems, sensors, real-time monitoring & Telegram bots.",
    tools: [{ name: "Arduino IDE", logo: arduino }],
  },
  {
    icon: FileText,
    title: "Research & Proposal",
    desc: "Structured, informative writing for PKM and academic proposals.",
    tools: [{ name: "MS Word", logo: word }],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">/ 02 — Capabilities</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              A toolkit refined across<br /><span className="text-gradient italic">six disciplines.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Each skill compounds the next — design informs content, content informs research, research informs the systems I build.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 glow-border-hover"
            >
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-neon/10 blur-3xl transition-all duration-500 group-hover:bg-neon/30" />
              <div className="relative flex h-full flex-col">
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon-soft text-neon ring-1 ring-neon/30">
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-auto pt-5 flex flex-wrap gap-2.5">
                  {s.tools.map((t) => (
                    <div
                      key={t.name}
                      title={t.name}
                      className="grid size-12 place-items-center rounded-xl border border-border bg-surface p-1.5 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <img
                        src={t.logo}
                        alt={t.name}
                        className="size-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

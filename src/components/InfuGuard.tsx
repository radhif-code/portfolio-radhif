import { motion } from "framer-motion";
import { Activity, Bell, Cpu, Gauge, Monitor, ShieldCheck } from "lucide-react";
import device from "@/assets/infuguard-device.jpg";

const tech = ["ESP32", "HX711", "Load Cell", "LCD I2C", "Telegram Bot", "Arduino IDE"];

const features = [
  { icon: Activity, title: "Real-time Monitoring", desc: "Continuous weight tracking of the infusion bag with sub-gram precision." },
  { icon: ShieldCheck, title: "Blockage Detection", desc: "Detects flow obstructions automatically and triggers immediate alerts." },
  { icon: Bell, title: "Telegram Notifications", desc: "Push critical events directly to nurses' phones through a Telegram bot." },
  { icon: Monitor, title: "LCD Display", desc: "Local I2C LCD shows live weight, status, and warnings at the bedside." },
];

export function InfuGuard() {
  return (
    <section id="infuguard" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">/ 05 — Featured Build</span>
          <h2 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Infu<span className="text-gradient italic">Guard</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A smart infusion monitoring system that helps hospital staff catch blockages and depleted bags before they become emergencies.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl glass p-1 glow-border"
          >
            <div className="relative overflow-hidden rounded-[1.4rem]">
              <img src={device} alt="InfuGuard prototype" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass flex flex-col justify-between rounded-3xl p-8 glow-border"
          >
            <div>
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon-soft text-neon ring-1 ring-neon/30">
                <Cpu className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">Technology Stack</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Hardware-first stack built on the ESP32 microcontroller, with load-cell measurement and dual-channel alerts.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-neon/30 bg-neon-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-neon"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass relative overflow-hidden rounded-2xl p-6 glow-border-hover"
            >
              <Gauge className="absolute -right-4 -top-4 size-20 text-neon/5" />
              <f.icon className="size-5 text-neon" />
              <h4 className="mt-4 font-display font-semibold">{f.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

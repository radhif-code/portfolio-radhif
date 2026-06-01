import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/i18n";

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

const WaIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);
const channels: { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string; value: string; href: string }[] = [
  { icon: WaIcon, label: "WhatsApp", value: "+62 812-3027-9810", href: "https://wa.me/6281230279810" },
  { icon: IgIcon, label: "Instagram", value: "@radiipppp", href: "https://instagram.com/radiipppp" },
  { icon: LiIcon, label: "LinkedIn", value: "Radhif Aurofiq", href: "https://www.linkedin.com/in/radhif-aurofiq-04177b407" },
  { icon: Mail as unknown as ComponentType<SVGProps<SVGSVGElement>>, label: "Email", value: "radhifaryantaurofiq@gmail.com", href: "mailto:radhifaryantaurofiq@gmail.com" },
  { icon: GhIcon, label: "GitHub", value: "@radhif", href: "https://github.com" },
];

export function Contact() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl glass p-10 glow-border sm:p-16">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{t.tag}</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              {t.heading1}<br />{t.heading2} <span className="text-gradient italic">{t.headingItalic}</span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">{t.subheading}</p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {channels.map((c, i) => (
                <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex items-center justify-between rounded-2xl glass-strong px-5 py-4 transition-all hover:bg-neon-soft">
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
          <div>{t.footer}</div>
          <div className="font-mono uppercase tracking-widest">{t.location}</div>
        </div>
      </div>
    </section>
  );
}

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { translations, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "id", flag: "🇮🇩", label: "ID" },
  { code: "ar", flag: "🇸🇦", label: "AR" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = translations[lang].nav;
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const links = [
    { href: "#about",    label: t.about },
    { href: "#skills",   label: t.skills },
    { href: "#experience", label: t.experience },
    { href: "#showcase", label: t.showcase },
    { href: "#contact",  label: t.contact },
  ];

  const currentLang = LANGS.find((l) => l.code === lang)!;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 gap-3">
        {/* Logo */}
        <a href="#top" className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${scrolled ? "glass-strong" : ""}`}>
          <span className="size-2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
          <span className="font-display text-sm font-semibold tracking-wider">RADHIF.A</span>
        </a>

        {/* Nav links */}
        <nav className={`hidden items-center gap-1 rounded-full px-2 py-2 md:flex ${scrolled ? "glass-strong" : "glass"}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-neon-soft hover:text-neon">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side: Lang + CTA */}
        <div className="flex items-center gap-2">
          {/* Language picker */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-2 text-xs font-semibold transition-all hover:bg-neon-soft hover:text-neon"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <span className="text-[8px] opacity-60">▼</span>
            </button>

            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 overflow-hidden rounded-2xl glass-strong shadow-lg z-50"
                style={{ minWidth: 110 }}
              >
                {LANGS.map((l) => (
                  <button key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium transition-all hover:bg-neon-soft hover:text-neon ${lang === l.code ? "text-neon bg-neon-soft" : "text-muted-foreground"}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.code === "en" ? "English" : l.code === "id" ? "Indonesia" : "العربية"}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* CTA */}
          <a href="#contact"
            className="hidden rounded-full bg-neon px-5 py-2 text-xs font-semibold text-background shadow-[0_0_24px_-4px_var(--neon)] transition-all hover:scale-105 md:inline-block">
            {t.cta}
          </a>
        </div>
      </div>
    </motion.header>
  );
}

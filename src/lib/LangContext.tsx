import { createContext, useContext, useState, type ReactNode } from "react";
import { type Lang } from "./i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, dir: "ltr" });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dir = lang === "ar" ? "rtl" : "ltr";

  const handleSet = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  return <Ctx.Provider value={{ lang, setLang: handleSet, dir }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

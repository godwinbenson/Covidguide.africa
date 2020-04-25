import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function useTranslator() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("");

  useEffect(() => setLang(i18n.language), [i18n.language]);

  const supportedLang = [
    "English",
    "Yoruba",
    // "Hausa",
    "Igbo"
    // "Pidgin"
  ].map(lg => ({ label: lg, value: lg.toLowerCase() }));

  const changeLang = lng => {
    i18n.changeLanguage(lng);
  };

  return {
    t,
    lang,
    changeLang,
    supportedLang
  };
}

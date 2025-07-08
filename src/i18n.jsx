import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

const savedLang = localStorage.getItem("lang");
if (savedLang) {
  i18n.changeLanguage(savedLang);
  document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
}

// console.log(en);

export default i18n;

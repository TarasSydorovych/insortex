// import { createInstance } from "i18next";
// import resourcesToBackend from "i18next-resources-to-backend";
// import { initReactI18next } from "react-i18next/initReactI18next";
// import { getOptions } from "./settings";

// const initI18next = async (lng, ns) => {
//   const i18nInstance = createInstance();
//   await i18nInstance
//     .use(initReactI18next)
//     .use(
//       resourcesToBackend((language, namespace) =>
//         import(`./locales/${language}/${namespace}.json`)
//       )
//     )
//     .init(getOptions(lng, ns));
//   return i18nInstance;
// };

// export async function useTranslation(lng, ns, options = {}) {
//   const i18nextInstance = await initI18next(lng, ns);
//   return {
//     t: i18nextInstance.getFixedT(
//       lng,
//       Array.isArray(ns) ? ns[0] : ns,
//       options.keyPrefix
//     ),
//     i18n: i18nextInstance,
//   };
// }
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector"; // Додаємо мовний детектор для браузера
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance();

  // Логування для визначення мови
  i18nInstance.on("languageChanged", (lng) => {
    console.log(`Мова змінилася на: ${lng}`);
  });

  await i18nInstance
    .use(LanguageDetector) // Використання мовного детектора
    .use(initReactI18next) // Інтеграція з React, але це також працює з Next.js
    .use(
      resourcesToBackend((language, namespace) =>
        import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));

  return i18nInstance;
};

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}

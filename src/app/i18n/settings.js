// export const fallbackLng = "ua";
// export const languages = [fallbackLng, "en", "pl", "ru"]; // Додаємо pl і ru
// export const defaultNS = "translation";

// export function getOptions(lng = fallbackLng, ns = defaultNS) {
//   return {
//     supportedLngs: languages,
//     fallbackLng,
//     lng,
//     fallbackNS: defaultNS,
//     defaultNS,
//     ns,
//   };
// }
export const fallbackLng = null;
export const languages = ["en", "ua", "pl", "ru"]; // Додаємо pl і ru
export const defaultNS = "translation";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    detection: {
      order: ["cookie", "localStorage", "navigator"], // Порядок пошуку мови
      caches: ["cookie"], // Зберігаємо мову в куках
      cookieMinutes: 10080, // Час життя куки (7 днів)
      lookupCookie: "i18next", // Ім'я куки
      checkWhitelist: true, // Перевіряємо, чи підтримується мова
    },
  };
}

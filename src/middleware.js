import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";

// Встановлюємо мови для бібліотеки accept-language
acceptLanguage.languages(languages);

// Конфігурація мідлвера
// export const config = {
//   matcher: "/((?!api|_next|static|favicon.ico|sitemap.xml).*)",
// };
// export const config = {
//   matcher: "/((?!api|_next|static|favicon.ico|sitemap.xml|admin).*)",
// };
export const config = {
  matcher: "/((?!api|_next|static|favicon.ico|sitemap.xml|admin|login).*)",
};
const cookieName = "i18next";

// Мідлвер для обробки запитів
export function middleware(req) {
  console.log("Middleware запущено"); // Діагностичне повідомлення

  const { pathname } = req.nextUrl;

  let lng;
  // Визначаємо мову запиту на основі куків або заголовків
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
    console.log("Мова визначена з куків:", lng); // Діагностичне повідомлення
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    console.log("Мова визначена з заголовків:", lng); // Діагностичне повідомлення
  }
  if (!lng) {
    lng = fallbackLng;
    console.log("Використовується мова за замовчуванням:", lng); // Діагностичне повідомлення
  }

  // Перевіряємо, чи потрібно редіректити кореневий шлях
  if (pathname === "/") {
    console.log("Кореневий шлях, редірект на /ua");
    return NextResponse.redirect(new URL("/ua", req.url));
  }

  // Перевірка наявності файлів, таких як index.php або інших подібних
  if (pathname.match(/\.(php|asp|aspx|jsp|cgi)$/)) {
    console.log("Зайшло в мідлвер php");
    return NextResponse.rewrite(new URL(`/ua/404`, req.url));
  }

  // Перевіряємо, чи запит відповідає будь-якому із визначених маршрутів
  const isMatched = pathname.match(/^\/(en|ua|pl|ru)(\/|$)/);
  if (!isMatched) {
    console.log("Невідповідний маршрут, перенаправляється на 404:", pathname);
    return NextResponse.rewrite(new URL(`/ua/404`, req.url));
  }
  // Додаємо підтримку маршруту для /email у різних мовних контекстах
  if (pathname.match(/^\/(en|ua|fr|it)\/email/)) {
    console.log("Обробка маршруту /email для мови:", pathname.split("/")[1]);
    return NextResponse.next();
  }
  // Обробка запитів, які відповідають визначеним маршрутам
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
      console.log("Встановлено мову з referer:", lngInReferer); // Діагностичне повідомлення
    }
    return response;
  }

  console.log("Завершення обробки запиту"); // Діагностичне повідомлення
  return NextResponse.next();
}

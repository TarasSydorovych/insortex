// pages/api/updateSitemap.js
import fs from "fs";
import path from "path";
import { transliterate } from "@/utils/transliterate";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { productName } = req.body; // Отримуємо назву продукту для транслітерації

    const sitemapPath = path.resolve(process.cwd(), "public", "sitemap.xml");

    // Завантажуємо існуючий `sitemap.xml`
    let sitemapContent = fs.readFileSync(sitemapPath, "utf8");

    // Генеруємо URL для кожної мовної версії
    const languages = ["ua", "en", "ru", "pl"];
    const urls = languages
      .map((lng) => {
        const transliteratedName = transliterate(productName[lng]);
        return `
        <url>
          <loc>https://insortex.com/${lng}/product/${transliteratedName}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("");

    // Вставляємо нові URL перед закриттям тегу </urlset>
    sitemapContent = sitemapContent.replace("</urlset>", `${urls}</urlset>`);

    // Записуємо оновлений файл назад
    fs.writeFileSync(sitemapPath, sitemapContent, "utf8");

    res.status(200).json({ message: "Sitemap updated successfully" });
  } else {
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}

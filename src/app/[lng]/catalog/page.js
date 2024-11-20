import Link from "next/link";
import styles from "../../components/catalog/catalog.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";
import { useTranslation } from "../../i18n";
import { AiOutlinePlus } from "react-icons/ai";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import OneProductWrap from "@/app/components/catalog/oneProductWrap";
import { GoogleAnalytics } from "@next/third-parties/google";

// Функція для отримання категорій з API
async function getCategories() {
  const res = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Не вдалося отримати категорії");
  }
  return res.json();
}

// Функція для отримання всіх продуктів
async function getAllProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Не вдалося отримати продукти");
  }
  return res.json();
}
// Генерація мета-тегів для кожної мови
const metadataByLanguage = {
  en: {
    title: "Insortex Equipment Catalog",
    description:
      "Browse through Insortex's equipment catalog. Discover a wide range of high-quality machinery for various industries, offering efficiency and reliability.",
  },
  ua: {
    title: "Каталог обладнання Insortex",
    description:
      "Ознайомтесь з каталогом обладнання Insortex. Відкрийте для себе широкий асортимент високоякісних машин для різних галузей, які забезпечують ефективність і надійність.",
  },
  ru: {
    title: "Каталог оборудования Insortex",
    description:
      "Ознакомьтесь с каталогом оборудования Insortex. Откройте для себя широкий ассортимент высококачественной техники для различных отраслей, обеспечивающей эффективность и надежность.",
  },
  pl: {
    title: "Katalog sprzętu Insortex",
    description:
      "Zobacz katalog sprzętu Insortex. Odkryj szeroką gamę wysokiej jakości maszyn dla różnych branż, zapewniających efektywność i niezawodność.",
  },
};

// Генерація мета-тегів для кожної сторінки
export async function generateMetadata({ params }) {
  const { lng } = params;
  const metadata = metadataByLanguage[lng] || metadataByLanguage.en;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}
export default async function CatalogPage({ params: { lng } }) {
  const categories = await getCategories();
  const products = await getAllProducts();
  const { t } = await useTranslation(lng);

  return (
    <div className={styles.wrapAllCat}>
      <GoogleAnalytics gaId="G-DJMSC241E7" />
      <Header t={t} lng={lng} />
      <div className={styles.catalogContainer}>
        <div className={styles.wrapSmallCatalog}>
          <aside className={styles.categorySidebar}>
            <h2 className={styles.categoryH2K}>{t("forCatalogCat")}</h2>
            <ul className={styles.ulList}>
              {categories.map((category) => (
                <li key={category._id} className={styles.listLi}>
                  <Link
                    href={`/${lng}/catalog/${transliterate(
                      category.name[lng]
                    )}`}
                    className={styles.listLi}
                  >
                    {category.name[lng]}{" "}
                    <AiOutlinePlus className={styles.staleIconPlus} />
                    {/* Виведення назви категорії на поточній мові */}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <main className={styles.productsMain}>
            <h2 className={styles.h1InBlogCatalog}>
              {" "}
              {t("forCatalogAllProd")}
            </h2>
            {products.length > 0 ? (
              <div className={styles.wrapProductsAll}>
                {products.map((product) => (
                  <OneProductWrap
                    product={product}
                    key={product._id}
                    lng={lng}
                  />
                ))}
              </div>
            ) : (
              <p>Немає доступних товарів.</p>
            )}
          </main>
        </div>
      </div>
      <Footer t={t} lng={lng} />
    </div>
  );
}

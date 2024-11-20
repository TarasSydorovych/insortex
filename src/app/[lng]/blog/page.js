import Link from "next/link";
import styles from "../../components/blog/works.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";
import { useTranslation } from "../../i18n";
import { AiOutlinePlus } from "react-icons/ai";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import OneWorkWrap from "@/app/components/works/oneWorkWrap";
import css from "styled-jsx/css";
import OneProductWrap from "@/app/components/blog/oneProductWrap";
import { GoogleAnalytics } from "@next/third-parties/google";
// Функція для отримання робіт з API
async function getWorks() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не вдалося отримати роботи");
  }
  return res.json();
}

export default async function WorksPage({ params: { lng } }) {
  const worksResponse = await getWorks();
  const works = worksResponse.data; // Отримуємо роботи з поля "data"
  const { t } = await useTranslation(lng);
  console.log("works", worksResponse);

  return (
    <div className={styles.wrapAllWorks}>
      <GoogleAnalytics gaId="G-DJMSC241E7" />
      <Header t={t} lng={lng} />

      <div className={styles.worksContainer}>
        <div className={styles.wrapSmallWorks}>
          <main className={styles.worksMain}>
            <h2 className={styles.h2ForAllWorks}>{t("ourWorksAllTitle")}</h2>
            {works.length > 0 ? (
              <div className={styles.wrapWorksAll}>
                {works.map((work) => (
                  <OneProductWrap product={work} key={work._id} lng={lng} />
                ))}
              </div>
            ) : (
              <p>Немає доступних робіт.</p>
            )}
          </main>
        </div>
      </div>
      <Footer t={t} lng={lng} />
    </div>
  );
}

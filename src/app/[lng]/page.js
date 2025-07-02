import styles from "./page.module.css";
import css from "../components/main/main.module.css";
import { useTranslation } from "../i18n";
import Image from "next/image";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "../components/standartComponents/header";
import "../components/font/FuturaPT/stylesheet.css";
import "../components/font/monrope/stylesheet.css";
import MainFirst from "../components/main/mainFirst";
import OurAdvantages from "../components/main/ourAdvantages";
import AboutMain from "../components/main/aboutMain";
import Certification from "../components/main/certification";
import OurWorks from "../components/main/ourWorks";
import OurCustomers from "../components/main/ourCustomers";
import SendSmallForm from "../components/sendSmallForm/sendSmallForm";
import Footer from "../components/standartComponents/footer";
import MapInsortex from "../components/main/mapInsortex";

import e4bis from "../img/e4bis.png";
import ListOfWorks from "../components/about/listOfWorks";
const metadataByLanguage = {
  en: {
    title: "Order Equipment | High-Quality Manufacturing Insortex",
    description:
      "We provide top-quality manufacturing equipment for all industries. Explore our products and place an order now.",
    canonical: "https://insortex.com/en", // Замінити на вашу реальну URL-адресу
  },
  ua: {
    title: "Замовити обладнання | Високоякісне виробництво Insortex",
    description:
      "Ми надаємо високоякісне виробниче обладнання для всіх галузей. Ознайомтесь з нашою продукцією та зробіть замовлення зараз.",
    canonical: "https://insortex.com/ua", // Замінити на вашу реальну URL-адресу
  },
  ru: {
    title: "Заказать оборудование | Высококачественное производство Insortex",
    description:
      "Мы предоставляем высококачественное производственное оборудование для всех отраслей. Ознакомьтесь с нашей продукцией и сделайте заказ сейчас.",
    canonical: "https://insortex.com/ru", // Замінити на вашу реальну URL-адресу
  },
  pl: {
    title: "Zamów sprzęt | Wysokiej jakości produkcja Insortex",
    description:
      "Oferujemy najwyższej jakości sprzęt produkcyjny dla wszystkich branż. Zobacz naszą ofertę i zamów teraz.",
    canonical: "https://insortex.com/pl", // Замінити на вашу реальну URL-адресу
  },
};

export async function generateMetadata({ params }) {
  const { lng } = params;
  const metadata = metadataByLanguage[lng] || metadataByLanguage.en;
  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: metadata.canonical,
    },
  };
}

const Home = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);

  const metadata = metadataByLanguage[lng] || metadataByLanguage.en;

  return (
    <>
      <main className={styles.main}>
        <GoogleAnalytics gaId="G-DJMSC241E7" />
        <Header t={t} lng={lng} />

        <MainFirst t={t} lng={lng} />
        <ListOfWorks t={t} lng={lng} />
        {/* <OurAdvantages t={t} lng={lng} /> */}
        <Certification t={t} lng={lng} />
        <SendSmallForm t={t.lng} />
        <OurWorks t={t} lng={lng} />
        <div className={css.wrapCustomers}>
          <h2 className={css.h1MainFirstAdw}>
            {" "}
            <span className={css.h1MainFirstSpan}>{t("ourSup")}</span>{" "}
            {t("ourSupTwo")}
          </h2>
          {/* <p className={css.pUorCustomers}>{t("ourSup")}</p> */}
          <OurCustomers />
        </div>
        <AboutMain t={t} lng={lng} />

        <MapInsortex t={t} lng={lng} />
        <SendSmallForm t={t.lng} lng={lng} />
        <div className={styles.banerEu}>
          {" "}
          <Image
            src={e4bis}
            alt="Insortex"
            className={styles.imageStyleeu} // Додаємо клас для стилізації, якщо потрібно
          />
        </div>
        <Footer t={t} lng={lng} />
      </main>
    </>
  );
};

export default Home;

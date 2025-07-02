import Header from "../../components/standartComponents/header";
import styles from "./page.module.css";
import css from "../../components/about/about.module.css";
import { useTranslation } from "../../i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import AboutFirst from "../../components/about/aboutFirst";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import SecondBlockAbout from "../../components/about/secondBlockAbout";
import OurCustomers from "../../components/main/ourCustomers";
import ListOfWorks from "../../components/about/listOfWorks";
import Footer from "../../components/standartComponents/footer";
import SendSmallForm from "../../components/sendSmallForm/sendSmallForm";
import DipomAndCer from "../../components/about/dipomAndCer";
import OurAdvantages from "../../components/main/ourAdvantages";

const metadataByLanguage = {
  en: {
    title: "About Us | Insortex - High-Quality Manufacturing Equipment",
    description:
      "Learn more about Insortex, a leader in manufacturing high-quality industrial equipment for various sectors. Explore our story, values, and our achievements.",
  },
  ua: {
    title: "Про нас | Insortex - Високоякісне виробниче обладнання",
    description:
      "Дізнайтесь більше про Insortex, лідера у виробництві високоякісного промислового обладнання для різних секторів. Ознайомтесь з нашою історією, цінностями та досягненнями.",
  },
  ru: {
    title:
      "О нас | Insortex - Высококачественное производственное оборудование",
    description:
      "Узнайте больше о компании Insortex, лидере в производстве высококачественного промышленного оборудования для различных отраслей. Изучите нашу историю, ценности и достижения.",
  },
  pl: {
    title: "O nas | Insortex - Wysokiej jakości sprzęt produkcyjny",
    description:
      "Dowiedz się więcej o Insortex, liderze w produkcji wysokiej jakości sprzętu przemysłowego dla różnych branż. Poznaj naszą historię, wartości i osiągnięcia.",
  },
};
export async function generateMetadata({ params }) {
  const { lng } = params;
  const metadata = metadataByLanguage[lng] || metadataByLanguage.en;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}
const About = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);

  return (
    <main className={styles.main}>
      <GoogleAnalytics gaId="G-DJMSC241E7" />
      <Header t={t} lng={lng} />
      <AboutFirst t={t} lng={lng} />
      <OurAdvantages t={t} lng={lng} />
      {/* <ListOfWorks t={t} lng={lng} /> */}
      <SecondBlockAbout t={t} lng={lng} />
      <div className={css.wrapOurQw}>
        {/* <p className={css.pUorCustomers}>{t("ourSup")}</p> */}
        <h2 className={css.h1MainFirstAdw}>
          {" "}
          <span className={css.h1MainFirstSpan}>{t("ourSup")}</span>{" "}
          {t("ourSupTwo")}
        </h2>
        <OurCustomers />
      </div>

      <SendSmallForm t={t.lng} lng={lng} />
      <DipomAndCer t={t} lng={lng} />
      <Footer t={t} lng={lng} />
    </main>
  );
};
export default About;

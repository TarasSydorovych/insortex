import Header from "@/app/components/standartComponents/header";
import styles from "./page.module.css";
import css from "../../components/about/about.module.css";
import { useTranslation } from "../../i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import AboutFirst from "../../components/about/aboutFirst";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import SecondBlockAbout from "@/app/components/about/secondBlockAbout";
import OurCustomers from "@/app/components/main/ourCustomers";
import ListOfWorks from "@/app/components/about/listOfWorks";
import Footer from "@/app/components/standartComponents/footer";
import SendSmallForm from "@/app/components/sendSmallForm/sendSmallForm";
import DipomAndCer from "@/app/components/about/dipomAndCer";
import FirstBlockContact from "@/app/components/contact/firstBlockContact";
const metadataByLanguage = {
  en: {
    title: "Contact Us | Insortex - Get in Touch for Quality Equipment",
    description:
      "Reach out to Insortex to inquire about our high-quality manufacturing equipment. Contact us for any questions or support regarding our products and services.",
  },
  ua: {
    title:
      "Контакти | Insortex - Зв'яжіться з нами для отримання якісного обладнання",
    description:
      "Зв'яжіться з Insortex для запитань або підтримки щодо нашого високоякісного виробничого обладнання. Ми завжди готові допомогти!",
  },
  ru: {
    title:
      "Контакты | Insortex - Свяжитесь с нами для получения качественного оборудования",
    description:
      "Свяжитесь с Insortex для получения информации о нашем высококачественном производственном оборудовании. Мы всегда готовы помочь!",
  },
  pl: {
    title:
      "Kontakt | Insortex - Skontaktuj się z nami w sprawie wysokiej jakości sprzętu",
    description:
      "Skontaktuj się z Insortex, aby dowiedzieć się więcej o naszym wysokiej jakości sprzęcie produkcyjnym. Jesteśmy gotowi odpowiedzieć na Twoje pytania i zapewnić wsparcie.",
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
      <FirstBlockContact t={t} lng={lng} />
      <Footer t={t} lng={lng} />
    </main>
  );
};
export default About;

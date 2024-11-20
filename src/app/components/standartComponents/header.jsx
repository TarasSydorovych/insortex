import css from "./standart.module.css";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import logoInsortex from "../../img/logoInsortex.png";
import Link from "next/link";
import LanguageSelectorRu from "./lenguageSelector/languageSelectorRu";
import LanguageSelectorEn from "./lenguageSelector/languageSelectorEn";
import LanguageSelectorPl from "./lenguageSelector/languageSelectorPl";
import LanguageSelectorUa from "./lenguageSelector/languageSelectorUa";
import newLogoIns from "../../img/logoInsortexNew-Clor.png";
import Navigations from "./navigations";
import NavigationsRu from "./navigationsRu";
import NavigationsEn from "./navigationsEn";
import NavigationsPl from "./navigationsPl";
const Header = ({ t, lng }) => {
  return (
    <header className={css.allHeaderWrap}>
      <div className={css.firtInHeader}>
        <div className={css.withYelowBlock}>
          <p className={css.slogan}>{t("sloganInHeader")}</p>
        </div>
        <div className={css.yelowBlockTop}>
          <p className={css.freeConsultation}>
            {t("freeConsultation")}:{" "}
            <a className={css.aInFreeCons} href="tel:+30675571375">
              +3(067) 577 13 75
            </a>
          </p>
          <div className={css.wrapIconsInHeader}>
            <a
              href="https://www.instagram.com/insortex.ua/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className={css.aInstagram} />
            </a>
            <a
              href="https://www.facebook.com/insortexcom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className={css.aInstagram} />
            </a>
            <a
              href="https://www.youtube.com/@Insortexagro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className={css.aInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div className={css.secondInHeader}>
        {" "}
        {/* <div className={css.wrapLogoW}>
          <Image src={logoInsortex} alt="Insortex Logo" className={css.logo} />
          <strong className={css.textStrongLogo}>INSORTEX</strong>
        </div> */}
        <Link href={"/"}>
          <Image src={newLogoIns} alt="Insortex Logo" className={css.logo} />
        </Link>
        {/* <nav className={css.navWrap}>
          <ul className={css.ulNavigation}>
            <li className={css.liNavigation}>{t("mainLink")}</li>
            <li className={css.liNavigation}>{t("productions")}</li>
            <li className={css.liNavigation}>{t("ourWorks")}</li>
            <li className={css.liNavigation}>{t("ourNews")}</li>
            <li className={css.liNavigation}>{t("aboutUs")}</li>
            <li className={css.liNavigation}>{t("contackLink")}</li>
          </ul>
        </nav> */}
        <nav className={css.navWrap}>
          {lng === "ua" && <Navigations />}
          {lng === "ru" && <NavigationsRu />}
          {lng === "en" && <NavigationsEn />}
          {lng === "pl" && <NavigationsPl />}
        </nav>
        <div className={css.lanSelectorWrapAll}>
          {" "}
          {lng === "ua" && <LanguageSelectorUa />}
          {lng === "ru" && <LanguageSelectorRu />}
          {lng === "en" && <LanguageSelectorEn />}
          {lng === "pl" && <LanguageSelectorPl />}
        </div>
      </div>
    </header>
  );
};
export default Header;

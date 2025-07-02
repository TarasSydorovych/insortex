import css from "./main.module.css";
import Image from "next/image";
import industen from "../../img/industen-about.png";
import twhno from "../../img/technology.png";
import Link from "next/link";
import firstI from "../../img/mainCold.jpg";
import mainVtwo from "../../img/mainVtwo.jpg";
const AboutMain = ({ t, lng }) => {
  return (
    <div className={css.aboutWrap}>
      <div className={css.smallAboutWrap}>
        <div className={css.firstWrapInAbout}>
          {/* <Image
            src={industen}
            alt="Insortex"
            className={css.imageStyle} // Додаємо клас для стилізації, якщо потрібно
          /> */}
          <Image
            src={firstI}
            alt="Insortex"
            className={css.firstImgForAbout} // Додаємо клас для стилізації, якщо потрібно
          />
          <Image
            src={mainVtwo}
            alt="Insortex"
            className={css.secondImgForAbout} // Додаємо клас для стилізації, якщо потрібно
          />
          <Image
            src={twhno}
            alt="Insortex"
            className={css.imageStyleAnimation} // Додаємо клас для стилізації, якщо потрібно
          />
          {/* <div className={css.yearExprt}>
            <p className={css.pInYears}>5+</p>
            <p className={css.pInYears}>{t("yearExp")}</p>
          </div>
          <div className={css.expertTeam}>
            <p className={css.pInYears}>24/7</p>
            <p className={css.pInYears}>{t("teamExpert")}</p>
          </div> */}
        </div>
        <div className={css.wrapSecondBlockAbout}>
          <p className={css.aboutUsTitle}>{t("aboutTitle")}</p>
          <p className={css.aboutUsSmallDesc}>{t("aboutBigDesc")}</p>
          <div className={css.wrapPWithIconAbout}>
            <div className={css.blackBlock}></div>
            <p className={css.aboutUsSmallDescOne}>{t("aboutFirstOnek")}</p>
          </div>
          <div className={css.wrapPWithIconAbout}>
            <div className={css.blackBlock}></div>
            <p className={css.aboutUsSmallDescOne}>{t("aboutSecondOnek")}</p>
          </div>
          <div className={css.wrapPWithIconAbout}>
            <div className={css.blackBlock}></div>
            <p className={css.aboutUsSmallDescOne}>{t("aboutThreOnek")}</p>
          </div>
          <Link href={`/${lng}/about`}>
            <div className={css.buttonDetails}>{t("buttonAboutK")}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AboutMain;

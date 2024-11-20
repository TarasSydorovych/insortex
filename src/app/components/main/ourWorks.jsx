import css from "./main.module.css";
import Image from "next/image";
import inspect from "../../img/inspections.png";
import klubnikaLine from "../../img/klubnikaLine.png";
import { IoArrowForwardOutline } from "react-icons/io5";
import gvintTransport from "../../img/gvintTransport.png";
import vibroSitp from "../../img/vibroSitp.png";
import polirovshikShitka from "../../img/inspect.png";
import transporterNaklon from "../../img/vijalka.png";
import firstGif from "../../img/togif.gif";
import shnecTest from "../../img/shneckTest.png";
import barbotag from "../../img/barbotag.jpg";
import barbotagGif from "../../img/barbotagGif.gif";
import kalibrator from "../../img/kalibrator.jpg";
import kalibratorGif from "../../img/kalibratorGif.gif";
import protirMash from "../../img/protirMash.jpg";
import protirMashGif from "../../img/protirMashGif.gif";
import vijalGif from "../../img/vijalGif.gif";
import inspectGif from "../../img/inspectGif.gif";
import Link from "next/link";

const OurWorks = ({ t, lng }) => {
  return (
    <div className={css.wrapOurWorks}>
      <div className={css.wrapNameInWorks}>
        <p className={css.ourWorksPort}>
          {t("forProductMain")}
          {/* {t("forProductMain")} */}
        </p>
        <Link href={`/${lng}/catalog`}>
          <p className={css.toCatalogWithArrow}>
            {t("goToCatalog")}
            <IoArrowForwardOutline className={css.oArrowForwardOutline} />
          </p>
        </Link>
      </div>
      <div className={css.wrapOurWorksOne}>
        <div className={css.wrapOneWork}>
          {" "}
          <div className={css.imageWrapper}>
            <Image
              src={shnecTest}
              alt="Шнековий транспортер"
              className={css.defaultImage}
            />
            <Image
              src={firstGif}
              alt="Шнековий транспортер GIF"
              className={css.hoverImage}
            />
          </div>
          <div className={css.wrappInProdFor}>
            <p className={css.nameOfProducts}>{t("productOneInMain")}</p>{" "}
            <IoArrowForwardOutline className={css.newwardOutline} />
          </div>
        </div>
        <div className={css.wrapOneWork}>
          <div className={css.imageWrapper}>
            <Image
              src={barbotag}
              alt="Барботажна мийка"
              className={css.defaultImage}
            />
            <Image
              src={barbotagGif}
              alt="Барботажна мийка"
              className={css.hoverImage}
            />
          </div>
          <div className={css.wrappInProdFor}>
            <p className={css.nameOfProducts}>{t("productTwoInMain")}</p>{" "}
            <IoArrowForwardOutline className={css.newwardOutline} />
          </div>
        </div>
        <div className={css.wrapOneWork}>
          <div className={css.imageWrapper}>
            <Image
              src={kalibrator}
              alt="Калібратор"
              className={css.defaultImage}
            />
            <Image
              src={kalibratorGif}
              alt="Калібратор"
              className={css.hoverImage}
            />
          </div>
          <div className={css.wrappInProdFor}>
            <p className={css.nameOfProducts}>{t("productThreInMain")}</p>{" "}
            <IoArrowForwardOutline className={css.newwardOutline} />
          </div>
        </div>
        {/* </div>
      <div className={css.wrapOurWorksOne}> */}
        <div className={css.wrapOneWork}>
          <div className={css.imageWrapper}>
            <Image
              src={protirMash}
              alt="Протиральна машина"
              className={css.defaultImage}
            />
            <Image
              src={protirMashGif}
              alt="Протиральна машина"
              className={css.hoverImage}
            />
          </div>
          <div className={css.wrappInProdFor}>
            <p className={css.nameOfProducts}>{t("productFourInMain")}</p>{" "}
            <IoArrowForwardOutline className={css.newwardOutline} />
          </div>
        </div>
        <div className={css.wrapOneWork}>
          {" "}
          <div className={css.imageWrapper}>
            <Image
              src={polirovshikShitka}
              alt="Інспекційний конвеєр"
              className={css.defaultImage}
            />
            <Image
              src={inspectGif}
              alt="Інспекційний конвеєр"
              className={css.hoverImage}
            />
          </div>
          <div className={css.wrappInProdFor}>
            <p className={css.nameOfProducts}>{t("productFiveInMain")}</p>{" "}
            <IoArrowForwardOutline className={css.newwardOutline} />
          </div>
        </div>
        <div className={css.wrapOneWork}>
          {" "}
          <div className={css.imageWrapper}>
            <Image
              src={transporterNaklon}
              alt="Вібровіялка"
              className={css.defaultImage}
            />
            <Image
              src={vijalGif}
              alt="Вібровіялка"
              className={css.hoverImage}
            />
          </div>
          <div className={css.wrappInProdFor}>
            <p className={css.nameOfProducts}>{t("productSixInMain")}</p>{" "}
            <IoArrowForwardOutline className={css.newwardOutline} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurWorks;
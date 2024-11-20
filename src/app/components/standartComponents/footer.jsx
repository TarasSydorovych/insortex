import css from "./standart.module.css";
import logoInsortex from "../../img/logoInsortex.png";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import FormInPidpus from "./formInPidpus";
import Link from "next/link";
import logoInsortexNewWhite from "../../img/logoInsortexNewWhite.png";
const Footer = ({ t, lng }) => {
  return (
    <footer className={css.wrapFooter}>
      <div className={css.firtBlockInFooter}>
        {/* <div className={css.wrapLogoW}>
          <Image src={logoInsortex} alt="Insortex Logo" className={css.logo} />
          <strong className={css.textStrongLogoFooter}>INSORTEX</strong>
        </div> */}
        <Link href={"/"}>
          <Image
            src={logoInsortexNewWhite}
            alt="Insortex Logo"
            className={css.logoFooter}
          />
        </Link>
        <div className={css.wrapNumberInFooter}>
          <FaPhoneAlt className={css.aPhoneAlt} />
          <a className={css.nubberInFooterP}>+3(067) 577 13 75</a>
        </div>
        <div className={css.wrapNumberInFooter}>
          <IoMdMail className={css.aPhoneAlt} />
          <a className={css.nubberInFooterP}>insortex@gmail.com</a>
        </div>
        <div className={css.wrapNumberInFooter}>
          <IoLocation className={css.aPhoneAlt} />
          <p className={css.nubberInFooterP}>
            Полтава, пров. Промисловий, 17/2
          </p>
        </div>
        <div className={css.wrapIconsInHeader}>
          <a
            href="https://www.instagram.com/insortex.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={css.aInstagramNem} />
          </a>
          <a
            href="https://www.facebook.com/insortexcom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className={css.aInstagramNem} />
          </a>
          <a
            href="https://www.youtube.com/@Insortexagro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className={css.aInstagramNem} />
          </a>
        </div>
      </div>
      <div className={css.firtBlockInFooter}>
        <p className={css.newPinFooter}>{t("agroRozvutok")}</p>
        <p className={css.ourGroupAll}>
          {t("subOurGroup")}
          {"  "}{" "}
          <a
            href="https://t.me/INSORTEX_AgroRozvytok"
            target="_blank"
            rel="noopener noreferrer"
            className={css.aFotDecoration}
          >
            {t("tgForSub")}
          </a>{" "}
          {t("orEmailSubcr")}
        </p>
        {/* <p className={css.ourGroupAll}>{t("orEmailSubcr")}</p> */}
        <FormInPidpus t={t.lng} />
      </div>
      <nav className={css.wrapSmalNavigation}>
        <p className={css.newPinFooter}>{t("navigationP")}</p>
        <ul className={css.ulListFooter}>
          <li className={css.liInFooter}>
            <Link href="/">{t("mainLink")}</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/productions">{t("productions")}</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/our-works">{t("ourWorks")}</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/news">{t("ourNews")}</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/about-us">{t("aboutUs")}</Link>
          </li>
          <li className={css.liInFooter}>
            <Link href="/contact">{t("contackLink")}</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
export default Footer;

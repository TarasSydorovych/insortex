import css from "./contact.module.css";
import { FaHome } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { GrPlan } from "react-icons/gr";

const LocalInform = ({ t }) => {
  return (
    <div className={css.localInformWrap}>
      <div className={css.wrapInformationsI}>
        <IoLocationSharp className={css.aHome} />
        <p className={css.pAdress}>{t("roztashuvania")}</p>
      </div>
      <p className={css.greyDesc}>{t("realAdres")}</p>
      <div className={css.wrapInformationsI}>
        <MdPhone className={css.aHome} />
        <p className={css.pAdress}>{t("phoneContact")}</p>
      </div>
      <p className={css.greyDesc}>+38 (067) 577 13 75</p>
      <div className={css.wrapInformationsI}>
        <MdEmail className={css.aHome} />
        <p className={css.pAdress}>Email</p>
      </div>
      <p className={css.greyDesc}>insortex@gmail.com</p>
      <div className={css.wrapInformationsI}>
        <GrPlan className={css.aHome} />
        <p className={css.pAdress}>{t("hourstContact")}</p>
      </div>
      <p className={css.greyDesc}>{t("pnPt")}: 9:00 – 18:00</p>
    </div>
  );
};
export default LocalInform;

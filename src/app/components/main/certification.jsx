import css from "./main.module.css";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import iso from "../../img/ISO.png";
import lider from "../../img/lidedsdsd.png";
import award from "../../img/businesawrdas.png";
import ce from "../../img/ce.png";
const Certification = ({ t, lng }) => {
  return (
    <div className={css.wrapcertification}>
      <p className={css.ourSertificatP}>{t("ourSertification")}</p>

      <div className={css.starWrap}>
        <FaStar className={css.starIcon} />
        <FaStar className={css.starIcon} />
        <FaStar className={css.starIcon} />
        <FaStar className={css.starIcon} />
        <FaStar className={css.starIcon} />
      </div>
      <div className={css.certIconWrap}>
        <Image src={iso} alt="Сертифікати insortex" className={css.sertImage} />
        <Image
          src={lider}
          alt="Сертифікати insortex"
          className={css.sertImage}
        />
        <Image
          src={award}
          alt="Сертифікати insortex"
          className={css.sertImage}
        />
        <Image src={ce} alt="Сертифікати insortex" className={css.sertImage} />
      </div>
    </div>
  );
};
export default Certification;

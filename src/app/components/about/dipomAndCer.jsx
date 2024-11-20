import css from "./about.module.css";
import Image from "next/image";
import icg from "../../img/ourDiploms/icg.jpg";
import asu from "../../img/ourDiploms/asu.jpg";
import znak from "../../img/ourDiploms/znak.jpg";
import mediagrupins from "../../img/ourDiploms/mediagrupins.jpg";
import pod from "../../img/ourDiploms/pod.jpg";
import incot from "../../img/ourDiploms/incot.jpg";
import rwexp from "../../img/ourDiploms/rwexp.jpg";
import zsu from "../../img/ourDiploms/zsu.jpg";
import FirstPhoto from "./diplomsPhoto/firstPhoto";
import SecondPhoto from "./diplomsPhoto/secondPhoto";
import AllDipWrap from "./diplomsPhoto/allDipWrap";
const DipomAndCer = ({ t, lng }) => {
  return (
    <div className={css.wrapDiplomsAll}>
      <p className={css.pInAurPoslug}>{t("uorDiplomsAndCertas")}</p>
      <div className={css.wrapBigDiploms}>
        <div className={css.oneDipWithText}>
          {" "}
          {/* <Image src={icg} alt="certificat" className={css.bigServt} /> */}
          <FirstPhoto />
          <p className={css.descriptionsDeploms}>{t("icgCertificatDesc")}</p>
        </div>
        <div className={css.oneDipWithText}>
          {" "}
          {/* <Image src={asu} alt="certificat" className={css.bigServt} /> */}
          <SecondPhoto />
          <p className={css.descriptionsDeploms}>{t("asuCerificatDesc")}</p>
        </div>
      </div>
      {/* <div className={css.wrapAllCertAndDip}>
        <Image src={znak} alt="certificat" className={css.smalSertiTy} />
        <Image
          src={mediagrupins}
          alt="certificat"
          className={css.smalSertiTy}
        />
        <Image src={pod} alt="certificat" className={css.smalSertiTy} />
        <Image src={incot} alt="certificat" className={css.smalSertiTy} />
        <Image src={rwexp} alt="certificat" className={css.smalSertiTy} />
        <Image src={zsu} alt="certificat" className={css.smalSertiTy} />
      </div> */}
      <AllDipWrap />
    </div>
  );
};
export default DipomAndCer;

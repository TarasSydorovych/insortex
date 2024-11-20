import css from "./main.module.css";
import mapInsortexQ from "../../img/mapInsortex.png";
import Image from "next/image";
const MapInsortex = ({ t, lng }) => {
  return (
    <div className={css.mapWrap}>
      <p className={css.pMapInMap}>
        {t("ourSupInWorld")}{" "}
        <span className={css.uorPudf}>{t("ourSupWordTwo")}</span>
      </p>
      <Image
        src={mapInsortexQ}
        alt="Сертифікати insortex"
        className={css.mapInsortexQ}
      />
    </div>
  );
};
export default MapInsortex;

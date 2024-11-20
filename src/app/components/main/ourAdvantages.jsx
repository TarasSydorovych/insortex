import css from "./main.module.css";
import { BsColumnsGap } from "react-icons/bs";
import { BsFillBarChartFill } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

const OurAdvantages = ({ t, lng }) => {
  return (
    <div className={css.wrapAdvantages}>
      <h2 className={css.h1MainFirstAdw}>
        {" "}
        <span className={css.h1MainFirstSpan}>{t("ourAdvantageH")}</span>{" "}
        {t("ourAdvantageHwe")}
      </h2>
      <div className={css.lineD}></div>
      <div className={css.smallWrapAdv}>
        <div className={css.oneBlockInAdv}>
          <p className={css.odwPinOneBlock}>
            <BsColumnsGap className={css.sColumnsGap} />
            {t("advOneTitle")}
          </p>
          <p className={css.odvDescription}>{t("advOneDesc")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.odwPinOneBlock}>
            <BsFillBarChartFill className={css.sColumnsGap} />
            {t("advTwoTitle")}
          </p>
          <p className={css.odvDescription}>{t("advTwoDesc")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.odwPinOneBlock}>
            <BsListCheck className={css.sColumnsGap} />
            {t("advThreTitle")}
          </p>
          <p className={css.odvDescription}>{t("advThreDesc")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.odwPinOneBlock}>
            <FaMoneyBillWave className={css.sColumnsGap} />
            {t("advFourTitle")}
          </p>
          <p className={css.odvDescription}>{t("advFourDesc")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.odwPinOneBlock}>
            <MdMoreTime className={css.sColumnsGap} />
            {t("advFiveTitle")}
          </p>
          <p className={css.odvDescription}>{t("advFiveDesc")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.odwPinOneBlock}>
            <RiTeamLine className={css.sColumnsGap} />
            {t("advSixTitle")}
          </p>
          <p className={css.odvDescription}>{t("advSixDesc")}</p>
        </div>
      </div>
    </div>
  );
};
export default OurAdvantages;

import ButtonWithPopup from "../main/buttonWithPopup";
import css from "./about.module.css";
const SecondBlockAbout = ({ t, lng }) => {
  return (
    <div className={css.secondBlockAbout}>
      <div className={css.wrapBlockFor}>
        <span className={css.realBig}>{t("aboutPageSTitle")}</span>

        <span className={css.realBigSmaller}>
          {t("aboutTheyearPageSTitle")}
        </span>
        <p className={css.secondBlockTitle}>{t("desctSecondBlockAbout")}</p>
        {/* <div className={css.buttonForPopUp}>{t("buttonCalculate")}</div> */}
        <ButtonWithPopup buttonText="Розрахувати вартість" t={t.lng} />
      </div>
    </div>
  );
};
export default SecondBlockAbout;

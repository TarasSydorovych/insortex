import ButtonWithPopup from "./buttonWithPopup";
import css from "./main.module.css";
import VideoM from "./videoM";

const MainFirst = ({ t, lng }) => {
  return (
    <div className={css.wrapMainFirst}>
      <VideoM />
      <div className={css.overlay}></div>
      <div className={css.textContainer}>
        <p className={css.pInFirtBlockMain}>{t("mainTextH1")}</p>
        <h1 className={css.h1MainFirst}>
          <span className={css.h1MainFirstSpan}>{t("perevagaOne")}</span>{" "}
          {t("pretAde")}
        </h1>
        <p className={css.pidPunctPMain}>{t("perevageTwo")}</p>
        <p className={css.pidPunctPMain}>{t("perevagaThre")}</p>
        <p className={css.pidPunctPMain}>{t("perevageFour")}</p>
        {/* <div className={css.buttonSendContact}>{t("buttonCalculate")}</div> */}
        <ButtonWithPopup buttonText="Розрахувати вартість" t={t.lng} />
      </div>
    </div>
  );
};

export default MainFirst;

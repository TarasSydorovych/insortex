import css from "./about.module.css";
const AboutFirst = ({ t, lng }) => {
  return (
    <div className={css.wrapAbout}>
      <p className={css.aboutInsortex}>
        {t("aboutProIns")}
        <br />
        <span className={css.insortexLd}>INSORTEX</span>
      </p>
      <p className={css.descriptionsAboutD}>
        <span className={css.inovationsLo}>{t("invationsAbout")}</span>{" "}
        {t("inovationsOneDesc")}
      </p>
    </div>
  );
};
export default AboutFirst;

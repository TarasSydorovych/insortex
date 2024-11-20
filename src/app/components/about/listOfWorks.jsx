import css from "./about.module.css";
const ListOfWorks = ({ t, lng }) => {
  return (
    <div className={css.wrapListAllWorks}>
      <p className={css.pInAurPoslug}>{t("napramDijzlnistAbout")}</p>
      <div className={css.listOfPoslug}>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("firtAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("firstAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("secondAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("secondAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("threAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("threAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("fourAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("fourAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("fiveAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("fiveAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("sixAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("sixAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("sevenAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("sevenAboutDescNap")}</p>
        </div>
        <div className={css.oneBlockInAdv}>
          <p className={css.namePererob}>{t("eightAboutNapTitle")}</p>
          <p className={css.descPererob}>{t("eightAboutDescNap")}</p>
        </div>
      </div>
    </div>
  );
};
export default ListOfWorks;

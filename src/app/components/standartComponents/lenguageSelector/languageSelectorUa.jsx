import Link from "next/link";
import css from "../standart.module.css";

const LanguageSelectorUa = () => {
  return (
    <div className={css.languageSelector}>
      <span className={css.nameLanguage}>UA</span>
      <div className={css.dropdownContent}>
        <Link href="/ua">UA</Link>
        <Link href="/ru">RU</Link>
        <Link href="/en">EN</Link>
        <Link href="/pl">PL</Link>
      </div>
    </div>
  );
};

export default LanguageSelectorUa;

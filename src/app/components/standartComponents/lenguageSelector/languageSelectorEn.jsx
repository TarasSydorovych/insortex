import Link from "next/link";
import css from "../standart.module.css";

const LanguageSelectorEn = () => {
  return (
    <div className={css.languageSelector}>
      <span>EN</span>
      <div className={css.dropdownContent}>
        <Link href="/ua">UA</Link>
        <Link href="/ru">RU</Link>
        <Link href="/en">EN</Link>
        <Link href="/pl">Pl</Link>
      </div>
    </div>
  );
};

export default LanguageSelectorEn;

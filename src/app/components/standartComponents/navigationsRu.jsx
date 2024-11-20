"use client"; // Використовуємо клієнтську частину
import css from "./standart.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md"; // Іконка для закриття меню
import { IoMdClose } from "react-icons/io";

const NavigationsRu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Визначення ширини екрану
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960); // Мобільна версія при ширині <= 768px
    };

    handleResize(); // Виклик при першому рендері
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Відкриття/закриття меню
  };

  return (
    <>
      {isMobile ? (
        <div className={css.mobileMenu}>
          <button onClick={toggleMenu} className={css.hamburgerButton}>
            {isMenuOpen ? <MdClose size={30} /> : <RxHamburgerMenu size={30} />}
          </button>
          {isMenuOpen && (
            <div className={css.fullScreenMenu}>
              <IoMdClose className={css.ioMdClose} onClick={toggleMenu} />
              <ul className={css.mobileNav}>
                <li>
                  <Link href={`/ru`} className={css.link} onClick={toggleMenu}>
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ru/catalog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Продукция
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ru/works`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Наши работы
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ru/blog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Блог
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ru/about`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ru/contact`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className={css.ulNavigation}>
          <li className={css.liNavigation}>
            <Link href={`/ru`} className={css.link}>
              Главная
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/ru/catalog`} className={css.link}>
              Продукция
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/ru/works`} className={css.link}>
              Наши работы
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/ru/blog`} className={css.link}>
              Блог
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/ru/about`} className={css.link}>
              О нас
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/ru/contact`} className={css.link}>
              Контакты
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavigationsRu;

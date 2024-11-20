"use client"; // Використовуємо клієнтську частину
import css from "./standart.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md"; // Іконка для закриття меню
import { IoMdClose } from "react-icons/io";

const NavigationsPl = () => {
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
                  <Link href={`/pl`} className={css.link} onClick={toggleMenu}>
                    Główna
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pl/catalog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Produkty
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pl/works`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Nasze prace
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pl/blog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pl/about`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    O nas
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/pl/contact`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className={css.ulNavigation}>
          <li className={css.liNavigation}>
            <Link href={`/pl`} className={css.link}>
              Główna
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/pl/catalog`} className={css.link}>
              Produkty
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/pl/works`} className={css.link}>
              Nasze prace
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/pl/blog`} className={css.link}>
              Blog
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/pl/about`} className={css.link}>
              O nas
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/pl/contact`} className={css.link}>
              Kontakt
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavigationsPl;

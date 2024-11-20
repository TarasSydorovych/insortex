"use client"; // Використовуємо клієнтську частину
import css from "./standart.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md"; // Іконка для закриття меню
import { IoMdClose } from "react-icons/io";

const NavigationsEn = () => {
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
                  <Link href={`/en`} className={css.link} onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/en/catalog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/en/works`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Our works
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/en/blog`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/en/about`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/en/contact`}
                    className={css.link}
                    onClick={toggleMenu}
                  >
                    Contacts
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className={css.ulNavigation}>
          <li className={css.liNavigation}>
            <Link href={`/en`} className={css.link}>
              Home
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/en/catalog`} className={css.link}>
              Products
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/en/works`} className={css.link}>
              Our works
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/en/blog`} className={css.link}>
              Blog
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/en/about`} className={css.link}>
              About us
            </Link>
          </li>
          <li className={css.liNavigation}>
            <Link href={`/en/contact`} className={css.link}>
              Contacts
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavigationsEn;

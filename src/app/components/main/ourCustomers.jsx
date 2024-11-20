"use client";
import { useEffect, useRef } from "react";
import css from "./main.module.css";
import Image from "next/image";

import firtOne1 from "../../img/partners/firts.png";
import firtOne2 from "../../img/partners/firts1.png";
import firtOne13 from "../../img/partners/firts2.png";
import firtOne14 from "../../img/partners/firts3.jpg";
import firtOne15 from "../../img/partners/firts4.jpg";
import firtOne16 from "../../img/partners/firts5.jpg";
import firtOne17 from "../../img/partners/firts6.jpg";
import firtOne18 from "../../img/partners/firts7.jpg";
import firtOne19 from "../../img/partners/firts8.jpg";
import firtOne111 from "../../img/partners/firts9.png";
import firtOne112 from "../../img/partners/firts10.png";
import firtOne113 from "../../img/partners/firtsQ1.png";
import firtOne114 from "../../img/partners/firtsQ2.png";
import firtOne115 from "../../img/partners/firtsQ3.png";
import firtOne116 from "../../img/partners/firtsQ4.png";
import firtOne117 from "../../img/partners/firtsQ5.jpeg";
import firtOne118 from "../../img/partners/firtsQ6.png";
import firtOne119 from "../../img/partners/firtsQ7.png";
import firtOne121 from "../../img/partners/firtsQ8.png";
import firtOne122 from "../../img/partners/firtsQ9.png";
import firtOne123 from "../../img/partners/firtsQ10.png";
import firtOne124 from "../../img/partners/firtsQW1.webp";
import firtOne125 from "../../img/partners/firtsQW2.jpg";
import firtOne126 from "../../img/partners/firtsQW3.png";
import firtOne127 from "../../img/partners/firtsQW4.jpg";
import firtOne128 from "../../img/partners/firtsQW5.png";
import firtOne129 from "../../img/partners/firtsQW6.webp";
import firtOne131 from "../../img/partners/firtsQW7.png";
import firtOne132 from "../../img/partners/firtsQW8.jpg";
import firtOne133 from "../../img/partners/firtsQW9.jpg";
import firtOne134 from "../../img/partners/firtsQW10.jpg";
import firtOne135 from "../../img/partners/firtsQW11.jpeg";
import firtOne136 from "../../img/partners/firtsQW12.png";

const images = [
  firtOne1,
  firtOne2,
  firtOne13,
  firtOne14,
  firtOne15,
  firtOne16,
  firtOne17,
  firtOne18,
  firtOne19,
  firtOne111,
  firtOne112,
  firtOne113,
  firtOne114,
  firtOne115,
  firtOne116,
  firtOne117,
  firtOne118,
  firtOne119,
  firtOne121,
  firtOne122,
  firtOne123,
  firtOne124,
  firtOne125,
  firtOne126,
  firtOne127,
  firtOne128,
  firtOne129,
  firtOne131,
  firtOne132,
  firtOne133,
  firtOne134,
  firtOne135,
  firtOne136,
];

const OurCustomers = () => {
  return (
    <div className={css.wrapTheWrapFotA}>
      <div className={css.wrapOurCustomers}>
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt="customer"
            className={css.ourCustom}
          />
        ))}
        {images.map((src, index) => (
          <Image
            key={index + images.length}
            src={src}
            alt="customer"
            className={css.ourCustom}
          />
        ))}
      </div>
    </div>
  );
};

export default OurCustomers;

// import css from "./contact.module.css";
// const Map = () => {
//   return (
//     <iframe
//       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1659.2693458075748!2d34.519800949207195!3d49.60364607113637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d828a3dc009b5f%3A0x44d837fb0df221d5!2zSU5TT1JURVggKNCG0J3QodCe0KDQotCV0JrQoSwg0JjQndCh0J7QoNCi0JXQmtChKQ!5e0!3m2!1sru!2sua!4v1730303353275!5m2!1sru!2sua"
//       width="50%"
//       height="450"
//       style={{ border: 0 }}
//       allowFullScreen=""
//       loading="lazy"
//       referrerPolicy="no-referrer-when-downgrade"
//     ></iframe>
//   );
// };
// export default Map;
"use client";
import { useState, useEffect } from "react";
import css from "./contact.module.css";

const Map = () => {
  // Створюємо state для зберігання ширини карти
  const [mapWidth, setMapWidth] = useState("50%");

  // Використовуємо useEffect для відслідковування зміни розміру вікна
  useEffect(() => {
    const handleResize = () => {
      // Перевіряємо розмір вікна і відповідно змінюємо ширину карти
      if (window.innerWidth >= 300 && window.innerWidth <= 960) {
        setMapWidth("90%"); // Якщо ширина екрану від 300 до 700, ширина карти 80%
      } else if (window.innerWidth > 700) {
        setMapWidth("50%"); // Якщо екран більше 700px, ставимо 100%
      } else {
        setMapWidth("50%"); // Інакше встановлюємо ширину на 50%
      }
    };

    // Додаємо обробник події для зміни розміру вікна
    window.addEventListener("resize", handleResize);

    // Викликаємо handleResize одразу після монтування компоненти, щоб задати правильну ширину
    handleResize();

    // Очищаємо обробник події при демонтажі компоненти
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1659.2693458075748!2d34.519800949207195!3d49.60364607113637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d828a3dc009b5f%3A0x44d837fb0df221d5!2zSU5TT1JURVggKNCG0J3QodCe0KDQotCV0JrQoSwg0JjQndCh0J7QoNCi0JXQmtChKQ!5e0!3m2!1sru!2sua!4v1730303353275!5m2!1sru!2sua"
      width={mapWidth} // використовуємо state для ширини
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default Map;

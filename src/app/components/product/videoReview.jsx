// "use client";

// import React from "react";
// import YouTube from "react-youtube"; // Імпортуємо бібліотеку
// import css from "./product.module.css"; // Імпортуйте свої стилі

// const VideoReview = ({ videoId }) => {
//   const onReady = (event) => {
//     // Додайте будь-яку логіку при підготовці відео
//   };

//   const onError = (event) => {
//     console.error("Error loading video:", event.data);
//   };

//   return (
//     <div className={css.videoReviewContainer}>
//       {videoId ? (
//         <YouTube
//           videoId={videoId}
//           onReady={onReady}
//           onError={onError}
//           opts={{
//             height: "500px",
//             width: "100%",
//             playerVars: {
//               // додаткові параметри плеєра
//               autoplay: 0,
//             },
//           }}
//         />
//       ) : (
//         <p>Відео недоступне.</p>
//       )}
//     </div>
//   );
// };

// export default VideoReview;
"use client";

import React, { useState, useEffect } from "react";
import YouTube from "react-youtube"; // Імпортуємо бібліотеку
import css from "./product.module.css"; // Імпортуйте свої стилі

const VideoReview = ({ videoId }) => {
  const [isMobile, setIsMobile] = useState(false); // Стан для перевірки мобільної версії
  const [isClient, setIsClient] = useState(false); // Стан для перевірки клієнтського рендерингу

  useEffect(() => {
    // Визначаємо, що компонент рендериться на клієнті
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550); // Якщо ширина <= 550, вважаємо екран мобільним
    };

    handleResize(); // Виклик при першому рендері
    window.addEventListener("resize", handleResize); // Відстеження зміни розміру вікна

    return () => window.removeEventListener("resize", handleResize); // Очищення слухача подій при демонтажі компонента
  }, []);

  const onError = (event) => {
    console.error("Error loading video:", event.data);
  };

  // Перевіряємо, чи компонент рендериться на клієнті перед рендерингом YouTube
  if (!isClient) {
    return null; // Нічого не рендеримо, поки компонент не завантажений на клієнті
  }

  return (
    <div className={css.videoReviewContainer}>
      {videoId ? (
        isMobile ? (
          <YouTube
            videoId={videoId}
            onError={onError}
            opts={{
              height: "200px", // Висота плеєра для мобільної версії
              width: "290px", // Ширина плеєра для мобільної версії
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        ) : (
          <YouTube
            videoId={videoId}
            onError={onError}
            opts={{
              height: "500px", // Висота плеєра для десктопної версії
              width: "100%", // Ширина плеєра для десктопної версії
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        )
      ) : (
        <p>Відео недоступне.</p>
      )}
    </div>
  );
};

export default VideoReview;

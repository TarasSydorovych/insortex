// import axios from "axios";
// import Header from "@/app/components/standartComponents/header";
// import Footer from "@/app/components/standartComponents/footer";
// import { useTranslation } from "@/app/i18n";
// import WorkSlider from "@/app/components/works/slider"; // Імпорт клієнтського слайдера
// import styles from "../../../components/works/works.module.css";
// import "../../../components/font/FuturaPT/stylesheet.css";
// import "../../../components/font/monrope/stylesheet.css";
// import css from "styled-jsx/css";
// import PictureBlock from "@/app/components/works/pictureBlock";
// import ButtonSendMess from "@/app/components/works/buttonSendMess";
// import Head from "next/head";
// // Функція для отримання конкретної роботи з API
// async function getWorkById(id) {
//   try {
//     const res = await axios.get(`http://localhost:3000/api/works`, {
//       params: { id }, // Передаємо id як параметр запиту
//     });

//     if (res.status !== 200 || !res.data.success) {
//       throw new Error("Помилка при отриманні роботи");
//     }

//     return res.data.data;
//   } catch (error) {
//     console.error(
//       "Помилка при отриманні роботи:",
//       error.response?.data || error.message
//     );
//     throw new Error("Не вдалося отримати роботу");
//   }
// }

// // Серверна компонента для відображення конкретної роботи
// export default async function WorkDetailPage({ params }) {
//   const { work, lng } = params; // Отримуємо параметри з URL
//   const { t } = await useTranslation(lng); // Отримуємо переклади для мови

//   if (!work) {
//     return <p>Сталася помилка: ID роботи не передано</p>;
//   }

//   // Отримуємо роботу з API на сервері
//   let workData;
//   try {
//     workData = await getWorkById(work);
//   } catch (error) {
//     return <p>Сталася помилка при завантаженні роботи: {error.message}</p>;
//   }

//   // Перевіряємо, чи існує work і чи є дані для вибраної мови
//   if (!workData || !workData.translations || !workData.translations[lng]) {
//     return <p>Дані для цієї роботи недоступні для вибраної мови.</p>;
//   }
//   console.log("workData", workData);

//   // Використовуємо HTML з довгого опису
//   const longDescHTML = workData.translations[lng]?.longDescription || "";
//   const seoTitle = workData.translations[lng]?.seotitle || "Назва не доступна";
//   const seoDescription =
//     workData.translations[lng]?.seodescription || "Опис не доступний";
//   return (
//     <div className={styles.workDetailPage}>
//       <Header t={t} lng={lng} />
//       <Head>
//         <title>{seoTitle}</title>
//         <meta name="description" content={seoDescription} />
//         <meta name="og:title" content={seoTitle} />
//         <meta name="og:description" content={seoDescription} />
//       </Head>
//       <div className={styles.wrapFirstBlock}>
//         {/* Використання компонента клієнтського слайдера */}
//         {workData.photos && workData.photos.length > 0 && (
//           <PictureBlock productData={workData} />
//         )}{" "}
//         <div className={styles.wrapHadnSmalDesc}>
//           <h1 className={styles.h1InWorks}>
//             {workData.translations[lng]?.title || "Назва не доступна"}
//           </h1>
//           <p className={styles.pInWorksSmall}>
//             {" "}
//             {workData.translations[lng]?.shortDescription || "Опис не доступна"}
//           </p>
//           <ButtonSendMess />
//         </div>
//       </div>
//       {workData.videoId && (
//         <div className={styles.video}>
//           <p className={styles.videoWorksP}>{t("videoView")}</p>
//           <iframe
//             width="560"
//             height="315"
//             src={`https://www.youtube.com/embed/${workData.videoId}`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="Відео"
//           ></iframe>
//         </div>
//       )}
//       <div className={styles.workContent}>
//         {/* Відображення HTML опису */}
//         <div
//           className={styles.longDescription}
//           dangerouslySetInnerHTML={{
//             __html: longDescHTML, // HTML вже оброблений на сервері
//           }}
//         />

//         {/* Відображення відео */}
//       </div>

//       <Footer t={t} lng={lng} />
//     </div>
//   );
// }

// // Генерація статичних шляхів для кожної роботи
// export async function generateStaticParams() {
//   try {
//     const res = await axios.get("http://localhost:3000/api/works");
//     const works = res.data.data;

//     return works.map((work) => ({
//       work: work._id,
//     }));
//   } catch (error) {
//     console.error(
//       "Помилка при генерації статичних шляхів:",
//       error.response?.data || error.message
//     );
//     return [];
//   }
// }
import axios from "axios";
import Header from "../../../components/standartComponents/header";
import Footer from "../../../components/standartComponents/footer";
import { useTranslation } from "../../../i18n";
import WorkSlider from "../../../components/works/slider"; // Імпорт клієнтського слайдера
import styles from "../../../components/works/works.module.css";
import "../../../components/font/FuturaPT/stylesheet.css";
import "../../../components/font/monrope/stylesheet.css";
import PictureBlock from "../../../components/works/pictureBlock";
import ButtonSendMess from "../../../components/works/buttonSendMess";
import VideoFor from "../../../components/works/videoFor";
import { GoogleAnalytics } from "@next/third-parties/google";
// Функція для отримання конкретної роботи з API
async function getWorkById(id) {
  try {
    const res = await axios.get(`http://localhost:3000/api/works`, {
      params: { id }, // Передаємо id як параметр запиту
    });

    if (res.status !== 200 || !res.data.success) {
      throw new Error("Помилка при отриманні роботи");
    }

    return res.data.data;
  } catch (error) {
    console.error(
      "Помилка при отриманні роботи:",
      error.response?.data || error.message
    );
    throw new Error("Не вдалося отримати роботу");
  }
}

// Генерація метаданих для сторінки
export async function generateMetadata({ params }) {
  const { work, lng } = params;

  // Отримуємо дані про роботу з API
  let workData;
  try {
    workData = await getWorkById(work);
  } catch (error) {
    console.error("Не вдалося отримати роботу для мета-тегів");
    return {
      title: "Сторінка не знайдена",
      description: "Сторінка не знайдена",
    };
  }

  const seoTitle = workData.translations[lng]?.seotitle || "Назва не доступна";
  const seoDescription =
    workData.translations[lng]?.seodescription || "Опис не доступний";

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `https://yourwebsite.com/${lng}/works/${work}`,
    },
  };
}

// Серверна компонента для відображення конкретної роботи
export default async function WorkDetailPage({ params }) {
  const { work, lng } = params; // Отримуємо параметри з URL
  const { t } = await useTranslation(lng); // Отримуємо переклади для мови

  if (!work) {
    return <p>Сталася помилка: ID роботи не передано</p>;
  }

  // Отримуємо роботу з API на сервері
  let workData;
  try {
    workData = await getWorkById(work);
  } catch (error) {
    return <p>Сталася помилка при завантаженні роботи: {error.message}</p>;
  }

  // Перевіряємо, чи існує work і чи є дані для вибраної мови
  if (!workData || !workData.translations || !workData.translations[lng]) {
    return <p>Дані для цієї роботи недоступні для вибраної мови.</p>;
  }

  // Використовуємо HTML з довгого опису
  const longDescHTML = workData.translations[lng]?.longDescription || "";

  return (
    <div className={styles.workDetailPage}>
      <GoogleAnalytics gaId="G-DJMSC241E7" />
      <Header t={t} lng={lng} />
      <div className={styles.wrapFirstBlock}>
        {/* Використання компонента клієнтського слайдера */}
        {workData.photos && workData.photos.length > 0 && (
          <PictureBlock productData={workData} />
        )}{" "}
        <div className={styles.wrapHadnSmalDesc}>
          <h1 className={styles.h1InWorks}>
            {workData.translations[lng]?.title || "Назва не доступна"}
          </h1>
          <p className={styles.pInWorksSmall}>
            {workData.translations[lng]?.shortDescription || "Опис не доступна"}
          </p>
          <ButtonSendMess />
        </div>
      </div>
      {workData.videoId && (
        <div className={styles.video}>
          <p className={styles.videoWorksP}>{t("videoView")}</p>
          <VideoFor workData={workData} />{" "}
        </div>
      )}
      <div className={styles.workContent}>
        {/* Відображення HTML опису */}
        <div
          className={styles.longDescription}
          dangerouslySetInnerHTML={{
            __html: longDescHTML, // HTML вже оброблений на сервері
          }}
        />
      </div>

      <Footer t={t} lng={lng} />
    </div>
  );
}

// Генерація статичних шляхів для кожної роботи
export async function generateStaticParams() {
  try {
    const res = await axios.get("http://localhost:3000/api/works");
    const works = res.data.data;

    return works.map((work) => ({
      work: work._id,
    }));
  } catch (error) {
    console.error(
      "Помилка при генерації статичних шляхів:",
      error.response?.data || error.message
    );
    return [];
  }
}

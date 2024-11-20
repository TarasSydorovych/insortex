// import Link from "next/link";
// import styles from "../../components/works/works.module.css";
// import { transliterate } from "@/utils/transliterate";
// import Header from "@/app/components/standartComponents/header";
// import Footer from "@/app/components/standartComponents/footer";
// import { useTranslation } from "../../i18n";
// import { AiOutlinePlus } from "react-icons/ai";
// import "../../components/font/FuturaPT/stylesheet.css";
// import "../../components/font/monrope/stylesheet.css";
// import OneWorkWrap from "@/app/components/works/oneWorkWrap";
// import css from "styled-jsx/css";
// import OneProductWrap from "@/app/components/works/oneProductWrap";

// // Функція для отримання робіт з API
// async function getWorks() {
//   const res = await fetch("http://localhost:3000/api/works", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Не вдалося отримати роботи");
//   }
//   return res.json();
// }
// export async function generateMetadata({ params: { lng } }) {
//   const { t } = await useTranslation(lng);

//   const seoTitles = {
//     ua: "Наші роботи | Insortex - Високоякісне обладнання для вашого бізнесу",
//     en: "Our Works | Insortex - High-Quality Equipment for Your Business",
//     ru: "Наши работы | Insortex - Высококачественное оборудование для вашего бизнеса",
//     pl: "Nasze prace | Insortex - Wysokiej jakości sprzęt dla Twojego biznesu",
//   };

//   const seoDescriptions = {
//     ua: "Ознайомтесь з нашими успішними проектами та рішеннями для різних галузей. Insortex пропонує надійне та ефективне обладнання для обробки матеріалів та промислових процесів.",
//     en: "Explore our successful projects and solutions for various industries. Insortex offers reliable and efficient equipment for material processing and industrial applications.",
//     ru: "Ознакомьтесь с нашими успешными проектами и решениями для различных отраслей. Insortex предлагает надежное и эффективное оборудование для обработки материалов и промышленных процессов.",
//     pl: "Zobacz nasze udane projekty i rozwiązania dla różnych branż. Insortex oferuje niezawodny i efektywny sprzęt do przetwarzania materiałów i procesów przemysłowych.",
//   };

//   return {
//     title: seoTitles[lng],
//     description: seoDescriptions[lng],
//   };
// }
// export default async function WorksPage({ params: { lng } }) {
//   const worksResponse = await getWorks();
//   const works = worksResponse.data; // Отримуємо роботи з поля "data"
//   const { t } = await useTranslation(lng);

//   return (
//     <div className={styles.wrapAllWorks}>
//       <Header t={t} lng={lng} />
//       <div className={styles.worksContainer}>
//         <div className={styles.wrapSmallWorks}>
//           <main className={styles.worksMain}>
//             <h2 className={styles.h2ForAllWorks}>{t("ourWorksAllTitle")}</h2>
//             {works.length > 0 ? (
//               <div className={styles.wrapWorksAll}>
//                 {works.map((work) => (
//                   <OneProductWrap product={work} key={work._id} lng={lng} />
//                 ))}
//               </div>
//             ) : (
//               <p>Немає доступних робіт.</p>
//             )}
//           </main>
//         </div>
//       </div>
//       <Footer t={t} lng={lng} />
//     </div>
//   );
// }
import Link from "next/link";
import styles from "../../components/works/works.module.css";
import { transliterate } from "@/utils/transliterate";
import Header from "@/app/components/standartComponents/header";
import Footer from "@/app/components/standartComponents/footer";
import { useTranslation } from "../../i18n";
import { AiOutlinePlus } from "react-icons/ai";
import "../../components/font/FuturaPT/stylesheet.css";
import "../../components/font/monrope/stylesheet.css";
import OneWorkWrap from "@/app/components/works/oneWorkWrap";
import css from "styled-jsx/css";
import OneProductWrap from "@/app/components/works/oneProductWrap";

// Функція для отримання робіт з API
async function getWorks() {
  const res = await fetch("http://localhost:3000/api/works", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не вдалося отримати роботи");
  }
  return res.json();
}

export async function generateMetadata({ params: { lng } }) {
  const seoTitles = {
    ua: "Наші роботи | Insortex - Високоякісне обладнання для вашого бізнесу",
    en: "Our Works | Insortex - High-Quality Equipment for Your Business",
    ru: "Наши работы | Insortex - Высококачественное оборудование для вашего бизнеса",
    pl: "Nasze prace | Insortex - Wysokiej jakości sprzęt dla Twojego biznesu",
  };

  const seoDescriptions = {
    ua: "Ознайомтесь з нашими успішними проектами та рішеннями для різних галузей. Insortex пропонує надійне та ефективне обладнання для обробки матеріалів та промислових процесів.",
    en: "Explore our successful projects and solutions for various industries. Insortex offers reliable and efficient equipment for material processing and industrial applications.",
    ru: "Ознакомьтесь с нашими успешными проектами и решениями для различных отраслей. Insortex предлагает надежное и эффективное оборудование для обработки материалов и промышленных процессов.",
    pl: "Zobacz nasze udane projekty i rozwiązania dla różnych branż. Insortex oferuje niezawodny i efektywny sprzęt do przetwarzania materiałów i procesów przemysłowych.",
  };

  return {
    title: seoTitles[lng],
    description: seoDescriptions[lng],
  };
}

export default async function WorksPage({ params: { lng } }) {
  // Отримуємо дані робіт безпосередньо в компоненті
  const worksResponse = await getWorks();
  const works = worksResponse.data;

  const { t } = await useTranslation(lng);

  return (
    <div className={styles.wrapAllWorks}>
      <Header t={t} lng={lng} />
      <div className={styles.worksContainer}>
        <div className={styles.wrapSmallWorks}>
          <main className={styles.worksMain}>
            <h2 className={styles.h2ForAllWorks}>{t("ourWorksAllTitle")}</h2>
            {works.length > 0 ? (
              <div className={styles.wrapWorksAll}>
                {works.map((work) => (
                  <OneProductWrap product={work} key={work._id} lng={lng} />
                ))}
              </div>
            ) : (
              <p>Немає доступних робіт.</p>
            )}
          </main>
        </div>
      </div>
      <Footer t={t} lng={lng} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { transliterate } from "../../../../utils/transliterate";
import css from "../../../components/product/product.module.css";
import { useTranslation } from "../../../i18n";
import Header from "../../../components/standartComponents/header";
import Footer from "../../../components/standartComponents/footer";
import { notFound } from "next/navigation";
import PictureBlock from "../../../components/product/pictureBlock";
import SecondBlockMain from "../../../components/product/secondBlockMain";
import "../../../components/font/FuturaPT/stylesheet.css";
import "../../../components/font/monrope/stylesheet.css";
import CharacteristicsList from "../../../components/product/characteristicsList";
import VideoReview from "../../../components/product/videoReview";
import SeoText from "../../../components/product/seoText";
import { GoogleAnalytics } from "@next/third-parties/google";

export async function generateMetadata({ params }) {
  const { lng, product } = params;
  console.log("Requested product slug:", product);

  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const allProducts = await res.json();

    // Транслитерація імені товару для пошуку
    const transliteratedProductName = transliterate(product);

    // Шукаємо товар за транслитерованим ім'ям
    const productData = allProducts.find(
      (p) => transliterate(p.name[lng]) === product
    );
    console.log("Transliterated product name:", transliteratedProductName);

    if (!productData) {
      console.error("Product not found:", product);
      throw new Error("Product not found");
    }

    // Перевірка наявності значень для SEO title та description
    const seoTitle =
      productData.seotitle && productData.seotitle[lng]
        ? productData.seotitle[lng]
        : "Product Page";
    const seoDescription =
      productData.seodescriptions && productData.seodescriptions[lng]
        ? productData.seodescriptions[lng]
        : "Product description not available.";

    return {
      title: seoTitle,
      description: seoDescription,
    };
  } catch (error) {
    console.error("Error fetching or finding product:", error);
    return {
      title: "Product not found",
      description: "The product you are looking for could not be found.",
    };
  }
}

// Це серверна компонента
const ProductPage = async ({ params }) => {
  const { lng, product } = params;
  const { t } = await useTranslation(lng);
  try {
    // Запит для отримання всіх продуктів
    const res = await fetch(`http://localhost:3000/api/products`, {
      cache: "no-store", // Не використовуємо кешування для завантаження актуальних даних
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const allProducts = await res.json();

    // Шукаємо товар за транслитерованим ім'ям
    const productData = allProducts.find(
      (p) => transliterate(p.name[lng]) === product
    );

    // Якщо товар не знайдено
    if (!productData) {
      notFound();
    }

    return (
      <div className={css.productPage}>
        <GoogleAnalytics gaId="G-DJMSC241E7" />
        <Header t={t} lng={lng} />
        <div className={css.allProdWrap}>
          <div className={css.wrapFirstBlock}>
            <PictureBlock productData={productData} />
            <SecondBlockMain t={t} lng={lng} productData={productData} />
          </div>
          {productData && productData.characteristics.length > 0 && (
            <CharacteristicsList productData={productData} t={t} lng={lng} />
          )}
          {productData && productData.videoUrl && (
            <p className={css.vieoVievP}>{t("videoView")}</p>
          )}
          {productData && productData.videoUrl && (
            <VideoReview videoId={productData.videoUrl} />
          )}
          {productData && productData.longDescription[lng] && (
            <SeoText productData={productData} t={t} lng={lng} />
          )}
        </div>
        {/* <div className={css.productInfo}>
          <h1 className={css.productTitle}>{productData.name[lng]}</h1>
          <p className={css.productShortDesc}>
            {productData.shortDescription[lng]}
          </p>

          <Image
            src={productData.images[0]}
            alt={productData.name[lng]}
            width={500}
            height={500}
            className={css.productImage}
          />

          <div className={css.productDetails}>
            <h2>Details:</h2>
            <p>{productData.longDescription[lng]}</p>
          </div>

          <div className={css.backLink}>
            <Link href={`/${lng}/catalog`}>← Back to Catalog</Link>
          </div>
        </div> */}
        <Footer t={t} lng={lng} />
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductPage;

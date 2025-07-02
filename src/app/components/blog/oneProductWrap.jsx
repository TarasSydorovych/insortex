import Link from "next/link";
import css from "../catalog/catalog.module.css";
import { IoArrowForwardOutline } from "react-icons/io5";
import { transliterate } from "../../../utils/transliterate";
import Image from "next/image";
const OneProductWrap = ({ product, lng }) => {
  return (
    <div className={css.wrapOneProducts}>
      <Link className={css.linKInSmallPro} href={`/${lng}/blog/${product._id}`}>
        {product && (
          <div className={css.imageWrapper}>
            <Image
              src={product.photos[0]} // Шлях до зображення або дефолтне зображення
              alt={product.translations[lng]?.title}
              className={css.productImage}
              fill
            />
          </div>
        )}

        <div className={css.wrapNameProdWithArrow}>
          <p className={css.pInNameProductnew}>
            {product.translations[lng]?.title}
          </p>
          <IoArrowForwardOutline className={css.newwardOutline} />
        </div>
      </Link>
    </div>
  );
};
export default OneProductWrap;

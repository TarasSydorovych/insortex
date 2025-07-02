import Link from "next/link";
import css from "./catalog.module.css";
import { IoArrowForwardOutline } from "react-icons/io5";
import { transliterate } from "@/utils/transliterate";
import Image from "next/image";
const OneProductWrap = ({ product, lng }) => {
  return (
    <Link href={`/${lng}/product/${transliterate(product.name[lng])}`}>
      <div className={css.wrapOneProducts}>
        {product && (
          <div className={css.imageWrapper}>
            <Image
              src={product.images[0]} // Шлях до зображення або дефолтне зображення
              alt={product.name[lng]}
              className={css.productImage}
              fill
            />
          </div>
        )}

        <div className={css.wrapNameProdWithArrow}>
          <p className={css.pInNameProduct}>{product.name[lng]}</p>
          <IoArrowForwardOutline className={css.newwardOutline} />
        </div>
      </div>{" "}
    </Link>
  );
};
export default OneProductWrap;

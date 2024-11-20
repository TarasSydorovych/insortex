"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "../about.module.css";
import znak from "../../../img/ourDiploms/znak.jpg";
import mediagrupins from "../../../img/ourDiploms/mediagrupins.jpg";
import pod from "../../../img/ourDiploms/pod.jpg";
import incot from "../../../img/ourDiploms/incot.jpg";
import rwexp from "../../../img/ourDiploms/rwexp.jpg";
import zsu from "../../../img/ourDiploms/zsu.jpg";

const AllDipWrap = () => {
  return (
    <PhotoProvider>
      <div className={css.wrapAllCertAndDip}>
        <PhotoView src={znak.src}>
          <Image
            src={znak}
            alt="certificat"
            className={css.smalSertiTy}
            style={{ cursor: "pointer" }}
          />
        </PhotoView>
        <PhotoView src={mediagrupins.src}>
          <Image
            src={mediagrupins}
            alt="certificat"
            className={css.smalSertiTy}
            style={{ cursor: "pointer" }}
          />
        </PhotoView>
        <PhotoView src={pod.src}>
          <Image
            src={pod}
            alt="certificat"
            className={css.smalSertiTy}
            style={{ cursor: "pointer" }}
          />
        </PhotoView>
        <PhotoView src={incot.src}>
          <Image
            src={incot}
            alt="certificat"
            className={css.smalSertiTy}
            style={{ cursor: "pointer" }}
          />
        </PhotoView>
        <PhotoView src={rwexp.src}>
          <Image
            src={rwexp}
            alt="certificat"
            className={css.smalSertiTy}
            style={{ cursor: "pointer" }}
          />
        </PhotoView>
        <PhotoView src={zsu.src}>
          <Image
            src={zsu}
            alt="certificat"
            className={css.smalSertiTy}
            style={{ cursor: "pointer" }}
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
};

export default AllDipWrap;

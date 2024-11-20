"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "../about.module.css";
import icg from "../../../img/ourDiploms/icg.jpg";

const FirstPhoto = () => {
  return (
    <PhotoProvider>
      <PhotoView src={icg.src}>
        <Image
          src={icg}
          alt="diplom"
          className={css.bigServt}
          style={{ cursor: "pointer" }}
        />
      </PhotoView>
    </PhotoProvider>
  );
};

export default FirstPhoto;

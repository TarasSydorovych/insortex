"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import css from "../about.module.css";
import asu from "../../../img/ourDiploms/asu.jpg";

const SecondPhoto = () => {
  return (
    <PhotoProvider>
      <PhotoView src={asu.src}>
        <Image
          src={asu}
          alt="diplom"
          className={css.bigServt}
          style={{ cursor: "pointer" }}
        />
      </PhotoView>
    </PhotoProvider>
  );
};

export default SecondPhoto;

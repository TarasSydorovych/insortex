"use client";
import css from "./main.module.css";
const VideoM = () => {
  return (
    <video autoPlay loop muted className={css.backgroundVideo}>
      <source src="/static/mainVideoInsortex.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
export default VideoM;

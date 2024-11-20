// import styles from "./works.module.css";
// const VideoFor = ({ workData }) => {
//   return (
//     <>
//       {" "}
//       <iframe
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/embed/${workData.videoId}`}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         title="Відео"
//       ></iframe>
//     </>
//   );
// };
// export default VideoFor;
import styles from "./works.module.css";

const VideoFor = ({ workData }) => {
  return (
    <>
      <div className={styles.videoWrapper}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${workData.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Відео"
        ></iframe>
      </div>
    </>
  );
};

export default VideoFor;

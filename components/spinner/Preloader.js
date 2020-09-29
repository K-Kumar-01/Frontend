import React from "react";
import styles from "./Preloader.module.css";

const Preloader = (props) => {
  return (
    <div>
      <div className={`${styles.loader}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span style={{ display: "none" }}>Loading ..</span>
      {props.message && (
        <p className={`styles.styledText text-center mt-2`}>
          <h3>{props.message}</h3>
        </p>
      )}
    </div>
  );
};

export default Preloader;

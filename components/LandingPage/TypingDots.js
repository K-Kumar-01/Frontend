import React from "react";

import styles from "./TypingDots.module.css";

const TypingDots = () => {
  return (
    <div className={`${styles.wave}`}>
      <span className={`${styles.dot}`}></span>
      <span className={`${styles.dot}`}></span>
      <span className={`${styles.dot}`}></span>
    </div>
  );
};

export default TypingDots;

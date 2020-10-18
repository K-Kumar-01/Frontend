import React from "react";
import { motion } from "framer-motion";
import styles from "./Page1.module.css";

const Page1 = () => {
  const variants = {
    hidden: {
      x: -80,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit:{
      opacity:0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }
  };

  return (
    <React.Fragment>
      <motion.div variants={variants} className={`container`}>
        <div className={styles.changedFont}>
          TITAN
          <br />
          READ
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Page1;

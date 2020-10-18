import React from "react";
import { motion } from "framer-motion";

const Page0 = () => {
  const childeVariants = {
    hidden: {
      // x: -200,
      opacity: 0,
    },
    visible: {
      x: [-200, 0, 0, 0],
      opacity: [0, 0.95, 1, 1],
      transition: {
        times: [0, 0.5, 0.7, 1],
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const childeVariants2 = {
    hidden: {
      y: 200,
      opacity: 0,
    },
    visible: {
      x: [0, 0, 50, 0],
      y: [100, 0, 0, 0],
      opacity: [0, 1, 1, 1],

      transition: {
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.5, 0.75, 1],
      },
    },
  };
  return (
    <React.Fragment>
      <motion.div
        style={{
          fontSize: "4rem",
          color: "white",
          fontFamily: `"Roboto", sans-serif`,
          fontWeight: "900",
        }}
        variants={childeVariants}
        transition={{ duration: 1 }}
      >
        TR
      </motion.div>
      <motion.div
        variants={childeVariants2}
        style={{ fontSize: "4rem", color: "white", verticalAlign: "middle" }}
      >
        .
      </motion.div>
    </React.Fragment>
  );
};

export default Page0;

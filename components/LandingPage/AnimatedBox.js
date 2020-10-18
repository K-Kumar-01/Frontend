import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const AnimatedBox = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{ duration: 1, ease: "easeOut" }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 300 },
        }}
      >
        {props.children}
      </motion.div>
    </div>
  );
};

export default AnimatedBox;

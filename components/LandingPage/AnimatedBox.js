import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const AnimatedBox = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.05 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: "50vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      variants={props.variants || variants}
      initial="hidden"
      className={`${props.class}`}
    >
      {props.children}
    </motion.div>
  );
};

export default AnimatedBox;

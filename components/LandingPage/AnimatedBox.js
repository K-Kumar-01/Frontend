import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const AnimatedBox = () => {
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
        style={{
          padding: 40,
          background: "blue",
          display: "inline-block",
          marginTop: 150,
          marginLeft: 40,
          marginBottom: 150,
          borderRadius: 5,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 300 },
        }}
      />
    </div>
  );
};

export default AnimatedBox;

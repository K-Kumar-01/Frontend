import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./About.module.css";

const About = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: [0, 0.5, 1],
        times: [0, 0.5, 1],
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: [0, 0.5, 1],
      times: [0, 0.5, 1],
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: [1, 0.5, 0],
        times: [0, 0.5, 1],
      };
    },
  };

  const data = [
    "oooooooooooooooo asdas ajsdka sfajs fnas fja sf as fhhja sfjiasb fnas j asfjabsfn asf asfn ashf ans fhas  f asfha sfa sfi asf asifb ",
    "aaaaaaaaaaaaaaaa We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) andthen wrap that within 0-2 to find our image ID in the array below. By passing anabsolute page index as the `motion` component's `key` prop, `AnimatePresence` willdetect it as an entirely new image. So you can infinitely paginate as few as 1 images.",
    "bbbbbbbbbbbbbbb Experimenting with distilling swipe offset and velocity into a single variable, so the less distance a user has swiped, the more velocity they need to register as a swipe Should accomodate longer swipes and short flicks without having binary checks o just distance thresholds and velocity > 0.",
  ];

  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <section className={styles.mainContainer}>
      <h2 className="heading text-center pt-5">ABOUT</h2>
      <div className={styles.parentContainer}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className={`${styles.newContainer}`}
            // src={images[page%3]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 200 },
              opacity: { duration: 1 },
              duration: 1,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {data[page % 3]}
          </motion.div>
        </AnimatePresence>
        <div className={`${styles.next}`} onClick={() => paginate(1)}>
          {"‣"}
        </div>
        <div className={`${styles.prev}`} onClick={() => paginate(-1)}>
          {"‣"}
        </div>
      </div>
    </section>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default About;

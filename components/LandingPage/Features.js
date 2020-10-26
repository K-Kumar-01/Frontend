import React, { useEffect } from "react";
import styles from "./Features.module.css";
import AnimatedBox from "./AnimatedBox";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { IconContext } from "react-icons";
import {
  FaLayerGroup,
  FaRobot,
  FaDesktop,
  FaMobileAlt,
  FaBookmark,
  FaHandPointUp,
  FaStar,
  FaBullseye,
  FaSearch,
  FaPenSquare,
  FaHeart,
} from "react-icons/fa";
import { DiResponsive } from "react-icons/di";
import { MdChat, MdFavorite, MdCollectionsBookmark } from "react-icons/md";

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.05 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  const variants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.5,
        when: "beforeChildren",
      },
    },
  };

  const childVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const FEATURESDATA = [
    {
      icon: (
        <IconContext.Provider value={{ size: "3rem" }}>
          <div>
            <FaLayerGroup />
          </div>
        </IconContext.Provider>
      ),
      description: "Articles organised in categories to make things effortless",
    },
    {
      icon: (
        <IconContext.Provider value={{ size: "3rem" }}>
          <div>
            <FaPenSquare />
          </div>
        </IconContext.Provider>
      ),
      description: "Request an article if you are unable to find what you want",
    },
    {
      icon: (
        <IconContext.Provider value={{ size: "3rem" }}>
          <div>
            <FaStar />
          </div>
        </IconContext.Provider>
      ),
      description: "Qaulity user generated content for good reading experience",
    },
    {
      icon: (
        <IconContext.Provider value={{ size: "3rem" }}>
          <div>
            <DiResponsive />
          </div>
        </IconContext.Provider>
      ),
      description: "Fully responsive and compatible on all devices",
    },
    {
      icon: (
        <IconContext.Provider value={{ size: "3rem" }}>
          <div>
            <FaHeart />
          </div>
        </IconContext.Provider>
      ),
      description:
        " Add any article to your Favourite Collections for later reading",
    },
    {
      icon: (
        <IconContext.Provider value={{ size: "3rem" }}>
          <div>
            <FaBullseye />
          </div>
        </IconContext.Provider>
      ),
      description: "Find and search articles with accurate results",
    },
  ];

  const renderFeatures = (data) =>
    data.map((d, i) => (
      <motion.div
        key={`feature-${i}`}
        variants={childVariants}
        className={`col-lg-4 col-md-6 col-12 mx-auto ${styles.feature}`}
      >
        <div className={`text-center`}>{d.icon}</div>
        <p className={`text-center`}>{d.description}</p>
      </motion.div>
    ));

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`container`}>
        <AnimatedBox>
          <h1 className={`heading text-center ${styles.heading} mb-5`}>
            Why Us
          </h1>
        </AnimatedBox>

        <motion.div
          ref={ref}
          animate={controls}
          variants={variants}
          initial="hidden"
          className={`row my-4`}
        >
          {renderFeatures(FEATURESDATA)}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;

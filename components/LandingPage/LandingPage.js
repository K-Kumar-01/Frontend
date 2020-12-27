import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Page0 from "./Page0";
import Page1 from "./Page1";
import Page2 from "./Page2";

const LandingPage = () => {
  const pageVariants = [
    {
      hidden: {
        y: "150vh",
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          when: "beforeChildren",
          duration: 1.5,
          ease: "easeInOut",
        },
      },
      exit: {
        x: "-100vw",
        opacity: 0,
        transition: {
          duration: 1,
        },
      },
    },
    {
      hidden: {
        x: -50,
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      },
    },
    {
      hidden: {
        y: "-200vh",
      },
      visible: {
        y: 0,
        transition: {
          duration: 1.5,
          when: "beforeChildren",
        },
      },
    },
  ];

  const commonStyle = {
    background: "black",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const pageStyles = [
    { ...commonStyle },
    {
      ...commonStyle,
      background: "white",
      fontSize: "4rem",
      justifyContent: "start",
    },
    {
      ...commonStyle,
      background: "#161616",
      display: "block",
      color: "white",
      minHeight: "10ov0vh",
      height: "auto",
    },
  ];

  const [page, setPage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 4500);

    setTimeout(() => {
      setPage(2);
    }, 6700);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={page}
        variants={pageVariants[page]}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={pageStyles[page]}
      >
        {page === 0 && <Page0 />}
        {page === 1 && <Page1 />}
        {page === 2 && <Page2 />}
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;

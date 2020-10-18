import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Page2 = () => {
  const rightEntranceVariants = {
    hidden: {
      x: 200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeIn",
      },
    },
  };

  const leftEntranceVariants = {
    hidden: {
      x: -200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeIn",
      },
    },
  };

  const rightVariants = {
    hidden: {
      x: 200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeIn",
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <React.Fragment>
      <header className="headerLP">
        <motion.div variants={leftEntranceVariants} className="logo">
          TR
        </motion.div>
        <motion.ul variants={rightEntranceVariants} className="items">
          <li className="item">
            <a href="">About</a>
          </li>
          <li className="item">
            <a href="">Why Us</a>
          </li>
          <li className="item">
            <a href="">Contact</a>
          </li>
        </motion.ul>
      </header>
      <div className={`mx-3 containerLP`}>
        <div className={`row`}>
          <motion.div
            variants={leftEntranceVariants}
            className={`col-lg-8 col-md-10 mx-auto col-12`}
          >
            <img
              className="header-img"
              src="https://images.unsplash.com/photo-1522211988038-6fcbb8c12c7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              alt=""
            />
          </motion.div>
          <motion.div
            variants={rightVariants}
            className={`col-lg-4 col-md-10 mx-auto col-12 right`}
          >
            <h1 className="heading">
              <motion.p variants={rightEntranceVariants}>TITAN </motion.p>
              <br />
              <motion.div variants={rightEntranceVariants}>READ</motion.div>
            </h1>
            <p className="sub-heading">
              <Link href={`/articles`}>
                <a>Get Started</a>
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page2;

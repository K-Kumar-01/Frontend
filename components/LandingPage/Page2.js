import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedBox from "./AnimatedBox";
import About from "./About";
import WhyUs from "./WhyUs";
import Features from "./Features";
import Contact from "./Contact";

const Page2 = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

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

  const leftVariants = {
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <React.Fragment>
      <main>
        <header className="headerLP">
          <motion.div variants={leftEntranceVariants} className="logo">
            TR
          </motion.div>
          <motion.ul variants={rightEntranceVariants} className="items">
            <li className="item">
              <a href="#about">About</a>
            </li>
            <li className="item">
              <a href="">Why Us</a>
            </li>
            <li className="item">
              <a href="#contact">Contact</a>
            </li>
          </motion.ul>
        </header>
        <div className={`mx-3 containerLP`}>
          <div className={`row`}>
            <motion.div
              variants={leftVariants}
              className={`col-lg-8 col-md-10 mx-auto col-12`}
            >
              <motion.img
                variants={leftEntranceVariants}
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
                <motion.span variants={rightEntranceVariants}>
                  TITAN{" "}
                </motion.span>
                <br />
                <motion.div variants={rightEntranceVariants}>READ</motion.div>
              </h1>
              <motion.p
                variants={rightEntranceVariants}
                className="sub-heading"
              >
                <Link href={`/signup`}>
                  <a>Get Started</a>
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </main>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ background: "white" }}
        >
          <a name="about">
            <WhyUs />
          </a>
          <a name="">
            <Features />
          </a>
          <a name="contact">
            <Contact />
          </a>
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default Page2;

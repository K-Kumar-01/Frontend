import React from "react";
import Link from "next/link";

import AnimatedBox from "./AnimatedBox";

import styles from "./FooterLandingPage.module.css";

const FooterLandingPage = () => {
  const variants = {
    hidden: {
      opacity: 0,
      x: "-10w",
      y: "10px",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <main style={{ background: "rgb(56,56,56)" }}>
      <div className={`container ${styles.footer} py-5`}>
        <AnimatedBox variants={variants}>
          <div className={`row`}>
            <div className={`col-12 col-md-4`}>
              <h2 className={`heading ${styles.logo}`}>
                T<span className={`${styles.colored}`}>R</span>
              </h2>
              <p className={`py-3`}>
                <a className={`${styles.link}`} href="#home">
                  Home
                </a>
                <Link href={`/articles`}>
                  <a className={`${styles.link}`}>Articles</a>
                </Link>
                <Link href={`/membership`}>
                  <a className={`${styles.link}`}>Pricing</a>
                </Link>
                <a className={`${styles.link}`} href="#about">
                  About
                </a>
                <a
                  className={`${styles.link} ${styles.nopipe}`}
                  href="#contact"
                >
                  Contact
                </a>
              </p>
              <p className={`${styles.copyright}`}>Titan Read © 2020</p>
            </div>
            <div className={`col-12 col-md-6 col-lg-4 ml-auto`}>
              <h2 className={`heading ${styles.heading}`}>About Titan Read</h2>
              <p className={`${styles.about} text-justify`}>
                Titan Read is where those ideas take shape, take off, and spark
                powerful information. We’re an open platform where readers come
                to find insightful and dynamic thinking. Here, expert and
                undiscovered voices alike dive into the heart of any topic and
                bring new ideas to the surface. Our purpose is to spread these
                ideas and deepen understanding of the world.
              </p>
            </div>
          </div>
        </AnimatedBox>
      </div>
    </main>
  );
};

export default FooterLandingPage;

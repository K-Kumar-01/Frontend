import React, { useState, useEffect } from "react";
import Link from "next/link";

import { authenticate, removeCookie } from "../helpers/auth";
import { COOKIE_NAME } from "../appConstants";

import styles from "./Footer.module.css";

const Footer = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authenticate(COOKIE_NAME));
  }, []);

  return (
    <footer className={`${styles.footer}`}>
      <div className="container py-5">
        <div className={`row`}>
          <div className={`col-12 col-md-4`}>
            <Link href={`/`}>
              <a className={`${styles.logoLink}`}>
                <h2 className={`heading ${styles.logo}`}>
                  T<span className={`${styles.colored}`}>R</span>
                </h2>
              </a>
            </Link>
            <p className={`py-3`}>
              <Link
                href={`${
                  loggedIn ? `/user/profile/${loggedIn.username}` : "/signup"
                }`}
              >
                <a className={`${styles.link}`}>
                  {loggedIn ? "Profile" : "Get Started"}
                </a>
              </Link>
              <Link
                href={`${
                  loggedIn ? `/user/edit/${loggedIn.username}` : "/signin"
                }`}
              >
                <a className={`${styles.link}`}>
                  {loggedIn ? "Dashboard" : "Already a member"}
                </a>
              </Link>
              <Link href={`/articles`}>
                <a className={`${styles.link}`}>Articles</a>
              </Link>
              <Link href={`/membership`}>
                <a className={`${styles.link} ${styles.nopipe}`}>Pricing</a>
              </Link>
            </p>
            <p className={`${styles.copyright}`}>Titan Read © 2020</p>
          </div>
          <div className={`col-12 col-md-6 col-lg-4 ml-auto`}>
            <h2 className={`heading ${styles.heading}`}>About Titan Read</h2>
            <p className={`${styles.about} text-justify`}>
              Titan Read is where those ideas take shape, take off, and spark
              powerful information. We’re an open platform where readers come to
              find insightful and dynamic thinking. Here, expert and
              undiscovered voices alike dive into the heart of any topic and
              bring new ideas to the surface. Our purpose is to spread these
              ideas and deepen understanding of the world.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

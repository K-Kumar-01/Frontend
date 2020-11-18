import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedBox from "./AnimatedBox";
import About from "./About";
import AboutUs from "./AboutUs";
import Features from "./Features";
import Contact from "./Contact";
import FooterLandingPage from "./FooterLandingPage";
import GoogleSignin from "../auth/Google/GoogleSignin";
import Chatbot from "./Chatbot";

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

  const renderModal = () => (
    <div
      className="modal fade"
      id="getStartedModal"
      tabIndex="-1"
      aria-labelledby="getStartedModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title heading getSModalHeading"
              id="getStartedModalLabel"
            >
              Join Titan Read or Sign in
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <GoogleSignin />
            <hr />
            <div className={`d-flex justify-content-center`}>
              <div>
                <button
                  onClick={() => $("#getStartedModal").modal("toggle")}
                  className={`registerLinksArea btn`}
                >
                  <Link href={`/signup`}>
                    <a className="registerLinks">Register here</a>
                  </Link>
                </button>
              </div>
              <div>
                <button
                  onClick={() => $("#getStartedModal").modal("toggle")}
                  className={`registerLinksArea btn`}
                >
                  <Link href={`/signin`}>
                    <a className="registerLinks">Signin here</a>
                  </Link>
                </button>
              </div>
            </div>
            <hr />
            <button
              className={`btn`}
              onClick={() => $("#getStartedModal").modal("toggle")}
            >
              <Link href={`/articles`}>
                <a className="articlesbtn">Articles</a>
              </Link>
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <main>
        {renderModal()}
        <a name="home">
          <header className="headerLP">
            <motion.div variants={leftEntranceVariants} className="logo">
              T<span>R</span>
            </motion.div>
            <motion.ul variants={rightEntranceVariants} className="items">
              <li className="item">
                <a href="#about">About</a>
              </li>
              <li className="item">
                <a href="#whyus">Why Us</a>
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
                  src={`https://res.cloudinary.com/dr6pkartq/image/upload/v1603729194/cxwzdta4biyxvsutpdji.jpg`}
                  alt={`Titan Read`}
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
                  <a data-toggle="modal" data-target="#getStartedModal">
                    Get Started
                  </a>
                </motion.p>
              </motion.div>
            </div>
          </div>
        </a>
      </main>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{ background: "white" }}
        >
          <Chatbot />
          <div id="about">
            <AboutUs />
          </div>
          <div id="whyus">
            <Features />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <FooterLandingPage />
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default Page2;

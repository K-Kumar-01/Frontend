import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import styles from "./Contact.module.css";
import AnimatedBox from "./AnimatedBox";

const Contact = () => {
  const MEMBERS = [
    {
      name: "Kushal Kumar",
      role: "Full stack",
      image_url: "",
      contact_email: "kushalkumar012000@gmail.com",
    },
    {
      name: "Atul Tyagi",
      role: "Backend and Design",
      image_url:
        "https://res.cloudinary.com/dr6pkartq/image/upload/v1602872162/IMG_20201014_123547_ooixvf.jpg",
      contact_email: "atul.tyagi.mat19@iitbhu.ac.in",
    },
    {
      name: "Lakshya Rathore",
      role: "Chatbot and Backend",
      image_url:
        "https://res.cloudinary.com/dr6pkartq/image/upload/v1602871860/nikhil_ssdtgr.jpg",
      contact_email: "nikhilrathore068@gmail.com",
    },
    {
      name: "Adarsh Mishra",
      role: "Design and Tester",
      image_url:
        "https://res.cloudinary.com/dr6pkartq/image/upload/v1603364040/WhatsApp_Image_2020-10-17_at_12.23.39_AM_d0q611.jpg",
      contact_email: "",
    },
  ];

  const parentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeIn",
        when: "beforeChildren",
      },
    },
  };

  const variants1 = {
    hidden: {
      opacity: 0,
      x: "-50vw",
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

  const variants2 = {
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

  const renderMembers = (data) =>
    data.map((d, i) => (
      <motion.div
        key={d.name + i}
        variants={i % 2 ? variants2 : variants1}
        className={`col-lg-5 col-md-6 col-12 mx-auto ${styles.memberContainer}`}
      >
        <div className={`${styles.member}`}>
          <div>
            <img
              className={`img img-fluid ${styles.memberImage}`}
              src={d.image_url}
              alt={d.name}
            />
          </div>
          <div>
            <h3 className={`text-capitalize ${styles.name}`}>{d.name}</h3>
            <div className={`${styles.role}`}>{d.role}</div>
            <div>
              <a href={`mailto:${d.contact_email}`}>{d.contact_email}</a>
            </div>
          </div>
        </div>
      </motion.div>
    ));

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`container`}>
        <AnimatedBox variants={parentVariants}>
          <h1 className={`heading text-center ${styles.heading} mb-5`}>
            Contact
          </h1>
        </AnimatedBox>
        <AnimatedBox variants={parentVariants} class={`row my-4 pl-4`}>
          {renderMembers(MEMBERS)}
        </AnimatedBox>
      </div>
    </div>
  );
};

export default Contact;

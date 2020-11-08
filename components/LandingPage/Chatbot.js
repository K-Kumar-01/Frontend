import { useState } from "react";
import { IconContext } from "react-icons";
import { FaRegComments } from "react-icons/fa";
import { motion } from "framer-motion";

import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const variants = {
    hidden: {
      x: "100vw",
      opacity: 0,
      transition: {
        duration: 0.75,
        ease: "easeIn",
        when: "afterChildren",
      },
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.75,
        when: "beforeChildren",
      },
    },
  };

  const variantsChat = {
    hidden: (sender = "Bot") => ({
      x: sender === "Bot" ? "-10%" : "10%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const closeVarints = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <main>
      <motion.section
        className={`${styles.chatbot}`}
        onClick={() => setIsOpen(true)}
      >
        <IconContext.Provider value={{ size: "2rem" }}>
          <FaRegComments />
        </IconContext.Provider>
      </motion.section>
    </main>
  );
};

export default Chatbot;

import { useState } from "react";
import { IconContext } from "react-icons";
import { FaRegComments, FaTimes } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
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
        ease: "easeOut",
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

  const MSGS = [
    { sender: "Bot", message: "Hi how are you" },
    { sender: "Me", message: "Hello" },
    { sender: "Bot", message: "Good to know" },
    { sender: "Me", message: "I am fine" },
    { sender: "Bot", message: "Hi how are you" },
    { sender: "Me", message: "Hello" },
    { sender: "Bot", message: "Good to know" },
    { sender: "Me", message: "I am fine" },
    { sender: "Bot", message: "Hi how are you" },
    { sender: "Me", message: "Hello" },
    { sender: "Bot", message: "Good to know" },
    { sender: "Me", message: "I am fine" },
  ];

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
      <motion.section
        initial={false}
        variants={variants}
        animate={isOpen ? "visible" : "hidden"}
        className={`${styles.chatbox}`}
      >
        <motion.div
          intial={false}
          variants={closeVarints}
          className={`${styles.closeBtn} ${styles.small}`}
          onClick={() => setIsOpen(false)}
        >
          <span className={`${styles.chatBotName} heading`}>
            Chat with Pixie
          </span>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <FaTimes />
          </IconContext.Provider>
        </motion.div>
        <div className={`${styles.large} ${styles.chatMsg}`}>
          {MSGS.map((d, i) => (
            <motion.div
              key={i}
              variants={variantsChat}
              initial={false}
              custom={d.sender}
              className={`${
                d.sender === "Bot" ? `${styles.mrAuto}` : `${styles.mlAuto}`
              } ${styles.chat}`}
            >
              {d.message}
            </motion.div>
          ))}
        </div>
        <motion.div className={`${styles.small} ${styles.msgInputArea}`}>
          <form
            className={`${styles.msgForm}`}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Hello");
            }}
          >
            <input
              type="text"
              placeholder="Your Message"
              className={`${styles.input}`}
            />
            <button
              type="submit"
              title="Send Message"
              className={`${styles.sendBtn}`}
            >
              <IconContext.Provider value={{ size: "1.5rem", color: "black" }}>
                <BiSend />
              </IconContext.Provider>
            </button>
          </form>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default Chatbot;

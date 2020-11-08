import { useState } from "react";
import { IconContext } from "react-icons";
import { FaRegComments, FaTimes } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { FcAssistant } from "react-icons/fc";
import { motion } from "framer-motion";

import styles from "./Chatbot.module.css";
import TypingDots from "./TypingDots";
import { sendMessageChatbot } from "../../actions/chatbot";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [botMsg, setBotMsg] = useState("");

  const PERSON = "ME",
    BOT = "Bot";

  const [convos, setConvos] = useState([]);

  const addMsgToConvos = (data) => {
    setConvos([...data, ...convos]);
  };

  const updateScroll = () => {
    let element = document.getElementById("chat-area");
    element.scrollTop = element.scrollHeight + 40;
  };

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
    hidden: (sender = BOT) => ({
      x: sender === BOT ? "-10%" : "10%",
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

  const callChatBot = async (data, messages) => {
    let response;
    try {
      response = await sendMessageChatbot(data);
      setLoading(false);
      if (!response.length || response.error) {
        messages.push({
          sender: BOT,
          message: "I could not find anything regarding this.",
        });
        addMsgToConvos(messages.reverse());
      } else {
        messages.push({ sender: BOT, message: response[0].text });
        addMsgToConvos(messages.reverse());
      }
    } catch (error) {
      setLoading(false);
      messages.push({ sender: BOT, message: "I am unable to solve this" });
      addMsgToConvos(messages.reverse());
    }
    updateScroll();
  };

  return (
    <main>
      <motion.section
        className={`${styles.chatbot}`}
        onClick={() => setIsOpen(true)}
        title="Chat with Pixie"
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
        <div className={`${styles.large} ${styles.chatMsg}`} id="chat-area">
          <motion.p
            className={`${styles.greeting}`}
            variants={closeVarints}
            initial={false}
          >
            Hello there, Welcome to Titan Read. My name is Pixie and I will
            assist you.{" "}
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcAssistant />
            </IconContext.Provider>
          </motion.p>

          <div className={`${styles.messages}`}>
            {loading && <TypingDots />}
            {convos.map((d, i) => (
              <motion.div
                key={i}
                variants={variantsChat}
                initial={false}
                custom={d.sender}
                className={`${
                  d.sender === BOT ? `${styles.mrAuto}` : `${styles.mlAuto}`
                } ${styles.chat}`}
              >
                {d.message}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          intial={false}
          variants={closeVarints}
          className={`${styles.small} ${styles.msgInputArea}`}
        >
          <form
            className={`${styles.msgForm}`}
            onSubmit={(e) => {
              e.preventDefault();
              if (msg.length > 0) {
                let convoMsgs = [{ sender: PERSON, message: msg }];
                addMsgToConvos(convoMsgs);
                let data = {
                  message: msg,
                  sender: PERSON,
                };
                setMsg("");
                updateScroll();
                setTimeout(() => {
                  setLoading(true);
                  updateScroll();
                  callChatBot(data, convoMsgs);
                }, 1000);
              }
            }}
          >
            <input
              type="text"
              placeholder="Your Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
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

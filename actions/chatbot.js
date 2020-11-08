import axios from "axios";
import { CHATBOT } from "../appConstants";

const basicErrorResponses = [
  "I was unable to understand the query",
  "I am unable to answer the question",
  "Sorry but i could not find a asnwer to your question",
];

export const sendMessageChatbot = async (data) => {
  let response;
  try {
    response = await axios.post(`${CHATBOT}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return {
      error:
        error.message ||
        basicErrorResponses[
          Math.floor(Math.random() * basicErrorResponses.length)
        ],
    };
  }
};

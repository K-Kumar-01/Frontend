import axios from "axios";
import { ARTICLE_CREATE, COOKIE_NAME, FETCH_ARTICLES } from "../appConstants";
import { getCookie } from "../helpers/auth";

export const createArticle = async (data) => {
  let token;
  token = getCookie(COOKIE_NAME);
  let response;
  try {
    response = await axios.post(`${ARTICLE_CREATE}`, data, {
      headers: { "Content-Type": "multipart/form-data", Authorization: token },
    });
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }

  return response;
};

export const getAllArticles = async () => {
  let response;
  try {
    response = await axios.get(`${FETCH_ARTICLES}`);
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
  return response.data;
};

import axios from "axios";
import {
  ARTICLE_CREATE,
  COOKIE_NAME,
  FETCH_ARTICLES,
  FETCH_CATEGORY_ARTICLES,
} from "../appConstants";
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

export const getArticlesByCategory = async (category) => {
  let response;
  try {
    response = await axios.get(`${FETCH_CATEGORY_ARTICLES(category)}`);
    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

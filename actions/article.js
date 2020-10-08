import axios from "axios";
import {
  ARTICLE_CREATE,
  COOKIE_NAME,
  FETCH_ARTICLES,
  FETCH_CATEGORY_ARTICLES,
  FETCH_PARTICULAR_ARTILCE,
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

export const getParticularArticle = async (slug, fetchType) => {
  let response;
  // added the header to fetch only article
  // no header will mean similar also fetched
  try {
    response = await axios.get(`${FETCH_PARTICULAR_ARTILCE(slug)}`, {
      headers: { fetchtype: fetchType || "NOT SINGLE" },
    });

    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

export const editParticularArticle = async (slug, data) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.patch(`${FETCH_PARTICULAR_ARTILCE(slug)}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
};

export const deleteParticularArticle = async (slug) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.delete(`${FETCH_PARTICULAR_ARTILCE(slug)}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

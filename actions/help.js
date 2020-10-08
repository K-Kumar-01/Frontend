import axios from "axios";
import {
  FETCH_HELP_ALL,
  COOKIE_NAME,
  CREATE_REQUEST,
  SINGLE_REQUEST,
  SUGGEST_ARTICLE_REQUEST,
  APPROVE_REQUEST,
} from "../appConstants";
import { getCookie } from "../helpers/auth";

export const getAllRequests = async () => {
  let response;

  try {
    response = await axios.get(`${FETCH_HELP_ALL}`);
    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

export const createRequest = async (data) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.post(`${CREATE_REQUEST}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const fetchSingleRequest = async (slug) => {
  let response;
  try {
    response = await axios.get(`${SINGLE_REQUEST(slug)}`);
    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

export const editSingleRequest = async (slug, data) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.patch(`${SINGLE_REQUEST(slug)}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const deleteSingleRequest = async (slug) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.delete(`${SINGLE_REQUEST(slug)}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const suggestArticleforRequest = async (slug, data) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.patch(`${SUGGEST_ARTICLE_REQUEST(slug)}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const approveArticleRequest = async (slug, data) => {
  let response, token;
  token = getCookie(COOKIE_NAME);
  try {
    response = await axios.patch(`${APPROVE_REQUEST(slug)}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

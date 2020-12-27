import axios from "axios";
import {
  BASE_URL,
  COOKIE_NAME,
  FETCH_FAVOURITES,
  ARTICLES_BY_SPECIFIC_USER,
  EMAIL_VERIFICATION,
  RECOVER_PASSWORD,
} from "../appConstants";
import { getCookie } from "../helpers/auth";

export const updateUser = async (username, data) => {
  let response;
  let token = getCookie(COOKIE_NAME);
  try {
    response = await axios.patch(`${BASE_URL}api/user/edit/${username}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const getUserDetails = async (username) => {
  let response;
  try {
    response = await axios.get(`${BASE_URL}api/user/profile/${username}`);
    return { response };
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

export const getFavourites = async (username, token) => {
  let response,
    headerOpts = {};
  if (token) {
    headerOpts.Authorization = token;
  }
  try {
    response = await axios.get(`${FETCH_FAVOURITES(username)}`, {
      headers: headerOpts,
    });
    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

export const getArticlesBySpecificUser = async (username) => {
  let response;
  try {
    response = await axios.get(`${ARTICLES_BY_SPECIFIC_USER(username)}`);
    return response.data;
  } catch (error) {
    return { error: error.response || { status: 500 } };
  }
};

export const sendVerifcationMail = async (username, token) => {
  let response;
  let headerOpts = {
    Authorization: token,
  };
  try {
    response = await axios.get(`${EMAIL_VERIFICATION(username)}`, {
      headers: headerOpts,
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const verifyMail = async (username, data, token) => {
  let response;
  let headerOpts = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    response = await axios.patch(`${EMAIL_VERIFICATION(username)}`, data, {
      headers: headerOpts,
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const forgotPasswordMail = async (username) => {
  let response;
  try {
    response = await axios.get(`${RECOVER_PASSWORD(username)}`);
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const resetPassword = async (username, data, token) => {
  let response;
  let headerOpts = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    response = await axios.patch(`${RECOVER_PASSWORD(username)}`, data, {
      headers: headerOpts,
    });
    return response.data;
  } catch (error) {
    return (error.response && error.response.data) || { error: error.message };
  }
};

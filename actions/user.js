import axios from "axios";
import { BASE_URL, COOKIE_NAME, FETCH_FAVOURITES } from "../appConstants";
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
    // console.log(error);
    // console.log(error.response || { data: { error: error.message } });
    return (error.response && error.response.data) || { error: error.message };
  }
};

export const getUserDetails = async (username) => {
  let response;
  try {
    response = await axios.get(`${BASE_URL}api/user/profile/${username}`);
    return { response };
  } catch (error) {
    // console.log(error.response);
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

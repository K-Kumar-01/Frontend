import axios from "axios";
import { FETCH_HELP_ALL } from "../appConstants";

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

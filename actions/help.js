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

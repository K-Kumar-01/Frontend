import axios from 'axios';
import { BASE_URL } from '../appConstants';

export const updateUser = async (username, data) => {
	let response;
	try {
		response = await axios.put(`${BASE_URL}api/user/edit/${username}`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
			
		});
	} catch (error) {
		console.log(error);
		return error.response;
	}
	console.log(response);
	return response;
};

export const getUserDetails = async (username) => {
	let response;
	try {
		response = await axios.get(`${BASE_URL}api/user/profile/${username}`);
		return { response };
	} catch (error) {
		// console.log(error.response);
		return { error: error.response };
	}
};

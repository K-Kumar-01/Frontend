import axios from 'axios';
import { SIGNIN, SIGNOUT, SIGNUP } from '../appConstants';

export const createUser = async (data) => {
	let response;
	try {
		response = await axios.post(`${SIGNUP}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		// console.log(response);
		return response.data;
	} catch (err) {
		// console.log(err);
		return (err.response && err.response.data) || err.message;
	}
};

export const loginUser = async (data) => {
	let response;
	let sendData;
	try {
		sendData = JSON.stringify(data);
		response = await axios.post(`${SIGNIN}`, sendData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (err) {
		return (err.response && err.response.data) || err.message;
	}
};

export const logoutUser = async () => {
	let response;
	try {
		response = await axios.get(`${SIGNOUT}`);
		return { response };
	} catch (error) {
		return { error: error.response };
	}
};

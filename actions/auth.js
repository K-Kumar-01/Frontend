import axios from 'axios';
import { SIGNOUT } from '../appConstants';

export const createUser = (data) => {
	return fetch(`http://localhost:8000/api/user/register/`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.error(err);
			return err.message;
		});
};

export const loginUser = (data) => {
	return fetch(`http://localhost:8000/api/user/login/`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.error(err);
			return err;
		});
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

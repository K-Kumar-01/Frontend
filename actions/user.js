import axios from 'axios';
import { BASE_URL } from '../appConstants';

export const updateUser = async (id, data) => {
	let response;
	try {
		response = await axios.put(`${BASE_URL}/api/user/${id}`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	} catch (error) {
		console.log(error);
		return { error: error.response };
	}
	return { response };
};

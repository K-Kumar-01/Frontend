import axios from 'axios';
import { ARTICLE_CREATE } from '../appConstants';

export const createArticle = async (data) => {
	let response;
	try {
		response = await axios.post(`${ARTICLE_CREATE}`, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	} catch (error) {
		throw new Error(error.response.data.message || error.message);
	}

	return response;
};

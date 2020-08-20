export const getCategoriees = async () => {
	let response, responseData;
	try {
		response = await fetch(`https://mighty-ravine-63394.herokuapp.com/api/categories`);
		responseData = await response.json();
		if (!response.ok) {
			throw new Error(responseData.error);
		} else {
			return responseData;
		}
	} catch (error) {
		return error;
	}
};

export const createUser = (data) => {
	return fetch(`https://mighty-ravine-63394.herokuapp.com/api/user/register/`, {
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

export const loginUser = (data) => {
	return fetch(`https://mighty-ravine-63394.herokuapp.com/api/user/login/`, {
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

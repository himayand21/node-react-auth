export const signupAPI = async ({
	email,
	password
}, apiRoute) => {
	const response = await fetch(`${apiRoute}/signup`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include'
	});
	if (response.status === 404) {
		throw ({
			message: 'Not found',
			key: 'not_found',
			status: 404
		});
	}
	const responseJSON = await response.json();
	if (responseJSON.error) {
		throw responseJSON.error;
	}
	return responseJSON;
}
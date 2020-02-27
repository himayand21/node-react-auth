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
	const responseJSON = await response.json();
	if (responseJSON.error) {
		throw responseJSON.error;
	}
	return responseJSON;
}
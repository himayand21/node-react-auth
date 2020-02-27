export const currentUserAPI = async (token, apiRoute) => {
	const response = await fetch(`${apiRoute}/current`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'authorization': `Bearer ${token}`
		},
		credentials: 'include'
	});
	const responseJSON = await response.json();
	if (responseJSON.error) {
		throw responseJSON.error;
	}
	return responseJSON;
}
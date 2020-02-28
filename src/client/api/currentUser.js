export const currentUserAPI = async (token, apiRoute) => {
	const response = await fetch(`${apiRoute}/current`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'authorization': `Bearer ${token}`
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
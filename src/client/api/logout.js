export const logoutAPI = async (
	token,
	allDeviceFlag,
	apiRoute
) => {
	const response = await fetch(`${apiRoute}/logout`, {
		method: 'POST',
		body: JSON.stringify({
			allDevices: allDeviceFlag
		}),
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
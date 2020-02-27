export const logoutAPI = async (
	token,
	allDeviceFlag,
	apiRoute
) => {
	console.log(allDeviceFlag);
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
	const responseJSON = await response.json();
	if (responseJSON.error) {
		throw responseJSON.error;
	}
	return responseJSON;
}
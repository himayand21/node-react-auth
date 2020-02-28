const jwt = require('jsonwebtoken');

function checkAuth(User) {
	return async function (req, res, next) {
		try {
			const header = req.header('Authorization');
			if (!header) {
				res.status(401).send({
					error: {
						status: 401,
						key: "missing_token",
						message: "You need an authorization token to access this information."
					}
				})
			} else {
				const token = header.split(' ')[1];
				const data = jwt.verify(token, process.env.JWT_KEY);
				const user = await User.findOne({ _id: data._id, 'tokens.token': token });
				if (!user) {
					res.status(401).send({
						error: {
							message: 'You are not authorized to access this information.',
							key: "token_mismatch",
							status: 401
						}
					});
				} else {
					req.user = {
						email: user.email,
						id: user._id
					};
					req.token = token;
					next();
				}
			}
		} catch (error) {
			res.status(500).send({
				error: {
					key: "server_error",
					message: "Some error occured.",
					status: 500
				}
			});
		}
	}
}

module.exports = checkAuth;
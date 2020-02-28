const jwt = require('jsonwebtoken');

function checkAuth(User) {
	return async function (req, res, next) {
		try {
			const header = req.header('Authorization');
			const token = header.split(' ')[1];
			const data = jwt.verify(token, process.env.JWT_KEY);
			const user = await User.findOne({ _id: data._id, 'tokens.token': token });
			if (!user) {
				throw ({
					message: 'You are not authorized to access this information.',
					key: "token_mismatch",
					status: 401
				});
			}
			req.user = {
				email: user.email,
				id: user._id
			};
			req.token = token;
			next();
		} catch (error) {
			if (error.key) {
				res.status(error.status).send({ error });
			} else {
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
}

module.exports = checkAuth;
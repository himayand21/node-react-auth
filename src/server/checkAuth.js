const jwt = require('jsonwebtoken');

function checkAuth(User) {
	return async function (req, res, next) {
		try {
			const header = req.header('Authorization');
			const token = header.split(' ')[1];
			const data = jwt.verify(token, process.env.JWT_KEY);
			const user = await User.findOne({ _id: data._id, 'tokens.token': token });
			if (!user) {
				throw new Error();
			}
			req.user = {
				email: user.email,
				id: user._id
			};
			req.token = token;
			next();
		} catch (error) {
			res.status(401).send({
				error: 'You are not authorized to access this information.'
			});
		}
	}
}

module.exports = checkAuth;
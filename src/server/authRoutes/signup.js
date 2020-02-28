const router = require("express").Router();
const auth = require("../checkAuth");

function signup(User) {
	return router.post("/signup", async (req, res, next) => {
		try {
			const { body } = req;
			const bodyKeys = Object.keys(body);

			if (!bodyKeys.includes('email') || !bodyKeys.includes('password')) {
				throw ({
					status: 400,
					message: "Missing email/password key in request.",
					key: "missing_email_password_key"
				})
			}

			const { email, password } = body;
			const user = new User({ email, password });

			const validationError = await user.validateUser();
			if (validationError) {
				throw ({
					status: 422,
					...validationError
				});
			} else {
				User.findOne({ email }, "email", async (err, existingUser) => {
					if (err) {
						throw err;
					}
					if (existingUser) {
						throw ({
							status: 409,
							message: "Email is already in use.",
							key: "email_in_use"
						});
					} else {
						const token = await user.generateAuthToken();
						await user.save();
						res.status(200).send({
							user: {
								email: user.email,
								id: user._id
							},
							token
						});
					}
				});
			}

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
	});
}

module.exports = signup;


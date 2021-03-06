const router = require("express").Router();

function signup(User) {
	return router.post("/signup", async (req, res, next) => {
		try {
			const { body } = req;
			const bodyKeys = Object.keys(body);

			if (!bodyKeys.includes('email') || !bodyKeys.includes('password')) {
				res.status(400).send({
					error: {
						status: 400,
						message: "Missing email/password key in request.",
						key: "missing_email_password_key"
					}
				})
			} else {
				const { email, password } = body;
				const user = new User({ email, password });

				const validationError = await user.validateUser();
				if (validationError) {
					res.status(422).send({
						error: {
							status: 422,
							...validationError
						}
					})
				} else {
					User.findOne({ email }, "email", async (err, existingUser) => {
						if (existingUser) {
							res.status(409).send({
								error: {
									status: 409,
									message: "Email is already in use.",
									key: "email_in_use"
								}
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
	});
}

module.exports = signup;


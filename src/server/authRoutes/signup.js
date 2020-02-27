const router = require("express").Router();
const auth = require("../checkAuth");

function signup(User) {
	return router.post("/signup", async (req, res, next) => {
		try {
			const {
				body: { email, password }
			} = req;

			const user = new User({ email, password });

			const validationError = await user.validateUser();
			if (validationError) {
				res.status(401).send({
					error: validationError
				})
			} else {
				User.findOne({ email }, "email", async (err, existingUser) => {
					if (existingUser) {
						res.status(403).send({
							error: "Email is already in use."
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
			res.status(400).send({
				error: "Some error occured"
			});
		}
	});
}

module.exports = signup;


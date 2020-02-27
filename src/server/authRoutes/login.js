const router = require("express").Router();

function login(model) {
	return router.post("/login", async (req, res, next) => {
		try {
			const {
				body: { email, password }
			} = req;

			const user = new User({ email, password });

			const validationError = await user.validateUser();
			if (validationError) {
				res.status(401).send({
					error: validationError
				});
			} else {
				model.findOne({ email }, "email password tokens", (err, validUser) => {
					if (err) {
						throw err;
					}
					if (!validUser) {
						res.status(401).send({
							error: "Login failed! Email is not registered."
						});
					} else {
						validUser.comparePassword(password, async (err, isMatch) => {
							if (!isMatch) {
								res.status(401).send({
									error: "Login failed! Password does not match."
								});
							} else {
								const token = await validUser.generateAuthToken();
								await validUser.save();
								res.status(200).send({
									user: {
										email: validUser.email,
										id: validUser._id,
									},
									token
								});
							}
						});
					}
				});
			}
		} catch (error) {
			res.status(400).send({
				error: "Some error occured."
			});
		}
	});
}

module.exports = login;



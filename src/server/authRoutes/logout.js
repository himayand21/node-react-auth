const router = require("express").Router();
const auth = require("../checkAuth");

function logout(model) {
	return router.post('/logout', auth(model), async (req, res) => {
		try {
			const {
				body: { allDevices },
				user,
				token
			} = req;

			model.findById(user.id, "tokens", async (err, loggedInUser) => {
				if (allDevices) {
					loggedInUser.tokens = [];
					await loggedInUser.save();
					res.status(200).send({
						message: "Logged out from all devices."
					});
				} else {
					loggedInUser.tokens = loggedInUser.tokens.filter((eachToken) => {
						return eachToken.token != token;
					})
					await loggedInUser.save();
					res.status(200).send({
						message: "Logged out from this device."
					});
				}
			});
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

module.exports = logout;
const router = require("express").Router();
const auth = require("../checkAuth");

function current(model) {
	return router.get("/current", auth(model), (req, res, next) => {
		console.log(JSON.stringify(req.rawHeaders, null, 2))
		res.status(200).send(req.user);
	});
}

module.exports = current;
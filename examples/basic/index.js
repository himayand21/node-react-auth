const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const server = require("../../src/server");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

const {
	createSchema,
	checkAuth,
	createAuth
} = server;

const app = express();

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true
});

const db = mongoose.connection;
const model = createSchema(db);

db.once("open", () => {
	console.log("Connected to MongoLab instance.");
}).on("error", error => console.log("Error connecting to MongoLab:", error));

app.listen(PORT, () => {
	console.log('Listening');
});

app.use(express.static(__dirname + "/build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', createAuth(model));
app.use('/some', checkAuth(model), (req, res, next) => {
	res.status(200).send({
		"auth": "success"
	})
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + "/build/index.html"))
});

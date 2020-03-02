const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

function createUserSchema(db) {
	const UserSchema = new Schema({
		email: {
			type: String
		},
		password: {
			type: String
		},
		tokens: [
			{
				token: {
					type: String
				}
			}
		]
	});

	UserSchema.pre("save", function save(next) {
		const user = this;
		if (!user.isModified("password")) {
			return next();
		}
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	});

	UserSchema.methods.comparePassword = function comparePassword(
		candidatePassword,
		cb
	) {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			cb(err, isMatch);
		});
	};

	UserSchema.methods.generateAuthToken = function generateAuthToken() {
		const user = this;
		const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
		user.tokens = user.tokens.concat({ token });
		return token;
	};

	UserSchema.methods.validateUser = function validateUser() {
		const user = this;
		const {
			email,
			password
		} = user;
		const {
			isEmpty,
			isEmail,
			isAlphanumeric,
			isLength
		} = validator;
		if (isEmpty(email) || isEmpty(password)) {
			return ({
				key: "missing_email_password",
				message: "You must provide an email and password."
			});
		}
		if (!isEmail(email)) {
			return ({
				key: "invalid_email",
				message: "Email address is invalid."
			});
		}
		if (!isLength(password, {
			min: 7,
			max: 16
		})) {
			return ({
				key: "unexpected_password_length",
				message: "Password must contain 7 to 16 characters."
			});
		}
		if (isAlphanumeric(password)) {
			return ({
				key: "missing_special_character",
				message: "Password must contain some special character."
			});
		}
	}
	const User = db.model('User', UserSchema);
	return User;
}

module.exports = createUserSchema;

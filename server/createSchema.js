"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var bcrypt = require("bcrypt-nodejs");

var jwt = require("jsonwebtoken");

var Schema = mongoose.Schema;

function createUserSchema(db) {
  var UserSchema = new Schema({
    email: {
      type: String
    },
    password: {
      type: String
    },
    tokens: [{
      token: {
        type: String
      }
    }]
  });
  UserSchema.pre("save", function save(next) {
    var user = this;

    if (!user.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  });

  UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      cb(err, isMatch);
    });
  };

  UserSchema.methods.generateAuthToken = function generateAuthToken() {
    var user = this;
    var token = jwt.sign({
      _id: user._id
    }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({
      token: token
    });
    return token;
  };

  UserSchema.methods.validateUser = function validateUser() {
    var user = this;
    var email = user.email,
        password = user.password;
    var isEmpty = validator.isEmpty,
        isEmail = validator.isEmail,
        isAlphanumeric = validator.isAlphanumeric,
        isLength = validator.isLength;

    if (isEmpty(email) || isEmpty(password)) {
      return "You must provide an email and password.";
    }

    if (!isEmail(email)) {
      return "Email address is invalid.";
    }

    if (!isLength(password, {
      min: 7,
      max: 16
    })) {
      return "Password must contain 7 to 16 characters.";
    }

    if (isAlphanumeric(password)) {
      return "Password must contain some special character.";
    }
  };

  var User = db.model('User', UserSchema);
  return User;
}

module.exports = createUserSchema;
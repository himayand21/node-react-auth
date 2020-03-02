"use strict";

var app = require('express');

var login = require('./login');

var logout = require('./logout');

var signup = require('./signup');

var current = require('./current');

function createAuth(model) {
  return [current(model), login(model), logout(model), signup(model)];
}

module.exports = createAuth;
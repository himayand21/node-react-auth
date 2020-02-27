"use strict";

require('@babel/polyfill');

var checkAuth = require('./checkAuth');

var createSchema = require('./createSchema');

var login = require('./authRoutes/login');

var logout = require('./authRoutes/logout');

var signup = require('./authRoutes/signup');

var current = require('./authRoutes/current');

module.exports = {
  checkAuth: checkAuth,
  createSchema: createSchema,
  login: login,
  logout: logout,
  signup: signup,
  current: current
};
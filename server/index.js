"use strict";

require('@babel/polyfill/noConflict');

var checkAuth = require('./checkAuth');

var createSchema = require('./createSchema');

var createAuth = require('./authRoutes');

module.exports = {
  checkAuth: checkAuth,
  createSchema: createSchema,
  createAuth: createAuth
};
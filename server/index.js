"use strict";

require('@babel/polyfill');

var auth = require('./auth');

var routes = require('./routes');

module.exports = {
  auth: auth,
  routes: routes
};
"use strict";

require('@babel/polyfill/noConflict');

var checkAuth = require('./checkAuth');

var createSchema = require('./createSchema'); // const login = require('./authRoutes/login');
// const logout = require('./authRoutes/logout');
// const signup = require('./authRoutes/signup');
// const current = require('./authRoutes/current');


var createAuth = require('./authRoutes'); // function createAuth(model) {
// 	return (
// 		app.use(current(model)),
// 		app.use(login(model)),
// 		app.use(logout(model)),
// 		app.use(signup(model))
// 	)
// }


module.exports = {
  checkAuth: checkAuth,
  createSchema: createSchema,
  createAuth: createAuth
};
require('@babel/polyfill');
const checkAuth = require('./checkAuth');
const createSchema = require('./createSchema');
const login = require('./authRoutes/login');
const logout = require('./authRoutes/logout');
const signup = require('./authRoutes/signup');
const current = require('./authRoutes/current');

module.exports = {
	checkAuth,
	createSchema,
	login,
	logout,
	signup,
	current
};
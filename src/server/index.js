require('@babel/polyfill/noConflict');

const checkAuth = require('./checkAuth');
const createSchema = require('./createSchema');
const createAuth = require('./authRoutes');

module.exports = {
	checkAuth,
	createSchema,
	createAuth
};
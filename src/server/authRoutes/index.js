const app = require('express');

const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const current = require('./current');

function createAuth(model) {
	return [
		current(model),
		login(model),
		logout(model),
		signup(model)
	]
}


module.exports = createAuth;
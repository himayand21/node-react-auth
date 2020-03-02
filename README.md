# node-react-auth
A helper library to ease jwt authentication for ```node-react``` applications.\
Almost all applications require an **authentication service** and at some point of time, it feels **repititive** to do the same thing over and over again.\
For applications using **Node-Express-MongoDB-React**, this library would help you create an authentication launchpad with minimum manual configurations.

## Installation
```$ npm install --save node-react-auth```

## Usage

### Step #1

The library expects ```JWT_KEY``` as an environment variable.\
Create a ```.env``` file and store the JSON web token like -

```JWT_KEY=ReplaceThisWithYourOwnJSONKey```

Add this file in ```.gitignore``` and configure your deployment server to host ```JWT_KEY``` as an environment variable.

##### Refer these docs if you are using Netlify or Heroku to host your website -
- [Heroku](https://devcenter.heroku.com/articles/config-vars)
- [Netlify](https://docs.netlify.com/configure-builds/environment-variables)


### Step #2

The library provides a few handlers for configuring your express server.

- **createSchema** - It creates the User Schema and returns back the model which we will be using afterwards.
- **checkAuth** - This middleware is a reusable function which can be used to ensure that the user is authorized.
- **createAuth** - This function generates ```"/signup"```, ```"/login"```, ```"/current"``` and ```"/logout"``` routes.

#### Show me the CODE
```
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = require("node-react-auth/server");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const {createSchema, checkAuth, createAuth} = server;

const app = express();
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
const model = createSchema(db);

app.listen(PORT, () => {
	console.log('Listening');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

*/
~ Generates /signup, /login, /current, /logout routes.
~ You can provide anything you want in the first parameter.
~ Just note it down since we would need that in the frontend side of things later.
*/
app.use('/user', createAuth(model));  

*/
~ An example of a protected route
~ Would return {"auth": "success"} only when the user is logged in.
*/
app.use('/some', checkAuth(model), (req, res, next) => {
	res.status(200).send({
		"auth": "success"
	})
});

```

### Step #3

Let's jump into the **React** side of things.\
The library provides a ```withAuth``` higher order component which injects a few helpful props into the component passed.

- **List of Props**

| Props | PropTypes | What does it do? |
| ------ | ------ | ----- |
| user | object | An ```user``` object would contain - ```email``` and ```id```. |
| loading | boolean | Would turn to ```true``` whenever an API is in progress. |
| token | string | The token generated upon successful authentication. |
| error | object | An error object would contain - ```key```, ```status``` and ```message```. |
| message | string | A message string for logging any operation. |
| signup | function | An api call to signup the user. |
| logout | function | An api call to logout the user. |
| login | function | An api call to login the user. |
| getCurrentUser | function | An api call to get information about the logged in user. |

- **Parameter Configuration**

| Functions | Parameters | Explanation |
| ------ | ------ | ----- |
| withAuth | Component | The Component into which the props would be injected. |
| | apiRoute | The root route where the auth routes are generated in express (in this case - ```/user```). |
| signup | body | ```{email: "test7@gmail.com", password: "secret@key"}``` |
| logout | token | The token sent back to frontend after successful authentication. |
| | allDeviceFlag | A flag, if sent as true, would remove all existing tokens for the user. |
| login | body | ```{email: "test7@gmail.com", password: "secret@key"}``` |
| getCurrentUser | token | The token sent back to frontend after successful authentication. |

**Show me the CODE**

```
import React, { Component } from 'react';
import { withAuth } from 'node-react-auth/client';

class App extends Component {
	state = {
		token: null,
		email: '',
		password: ''
	}
	static getDerivedStateFromProps(props) {
		return ({
			token: props.token
		})
	}
	handleSignup = () => {
		this.props.signup({
			email: this.state.email,
			password: this.state.password
		});
	}
	handleLogin = () => {
		this.props.login({
			email: this.state.email,
			password: this.state.password
		});
	}
	handleCurrentUser = () => {
		this.props.getCurrentUser(this.state.token);
	}
	handleLogout = () => {
		this.props.logout(this.state.token);
	}
	handleAllDeviceLogout = () => {
		this.props.logout(this.state.token, true);
	}

	render() {
		return (
			...your Login or Signup form component
		)
	}

};
export default withAuth(App, '/user');
```

## Example

Check this out - [Basic Authentication with node-react-auth](https://github.com/himayand21/node-react-auth/tree/master/examples/basic).

## Issues

If you find a bug, you can file an issue right [here](https://github.com/himayand21/node-react-auth/issues).

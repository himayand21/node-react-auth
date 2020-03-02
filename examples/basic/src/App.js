import React, { Component, Fragment } from 'react';

import { withAuth } from '../../../src/client';
import './App.css';

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
	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value
		});
	}
	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value
		});
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
			<div className="app-block">
				<div className="container">
					{this.state.token ? null :
						<Fragment>
							<div className="row">
								<div className="label">
									Email
								</div>
								<div className="value">
									<input onChange={this.handleEmailChange} />
								</div>
							</div>
							<div className="row">
								<div className="label">
									Password
								</div>
								<div className="value">
									<input onChange={this.handlePasswordChange} />
								</div>
							</div>
						</Fragment>
					}
					<div className="row">
						{this.state.token ?
							<Fragment>
								<button onClick={this.handleCurrentUser}>Current User</button>
								<button onClick={this.handleLogout}>Log out</button>
								<button onClick={this.handleAllDeviceLogout}>Log out from all devices</button>
							</Fragment> :
							<Fragment>
								<button onClick={this.handleSignup}>Sign up</button>
								<button onClick={this.handleLogin}>Log in</button>
							</Fragment>
						}
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="label">
							User
						</div>
						<div className="value">
							{JSON.stringify(this.props.user)}
						</div>
					</div>
					<div className="row">
						<div className="label">
							Token
						</div>
						<div className="value">
							{JSON.stringify(this.props.token)}
						</div>
					</div>
					<div className="row">
						<div className="label">
							Loading
						</div>
						<div className="value">
							{JSON.stringify(this.props.loading)}
						</div>
					</div>
					<div className="row">
						<div className="label">
							Message
						</div>
						<div className="value">
							{JSON.stringify(this.props.message)}
						</div>
					</div>
					<div className="row">
						<div className="label">
							Error
						</div>
						<div className="value">
							{JSON.stringify(this.props.error)}
						</div>
					</div>
				</div>
			</div>
		)
	}

};
export default withAuth(App, '/user');
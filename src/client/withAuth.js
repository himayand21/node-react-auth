import React, { Component } from "react";
import { loginAPI, logoutAPI, signupAPI, currentUserAPI } from "./api";

const initialState = {
	user: null,
	token: null,
	error: null,
	message: null,
	loading: false
};

function withAuth(WrappedComponent, apiRoute) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = initialState;
		}

		signup = async body => {
			try {
				this.setState({ loading: true });
				const { user, token } = await signupAPI(body, apiRoute);
				this.setState({
					user,
					token,
					message: "Signed up and logged in.",
					loading: false,
					error: null
				});
			} catch (error) {
				this.setState({
					...initialState,
					error
				});
			}
		};

		login = async body => {
			try {
				this.setState({ loading: true });
				const { user, token } = await loginAPI(body, apiRoute);
				this.setState({
					user,
					token,
					message: "Logged in.",
					loading: false,
					error: null
				});
			} catch (error) {
				this.setState({
					...initialState,
					error
				});
			}
		};

		logout = async (token, allDeviceFlag) => {
			try {
				this.setState({ loading: true });
				const { message } = await logoutAPI(token, allDeviceFlag, apiRoute);
				this.setState({
					message,
					token: null,
					user: null,
					loading: false,
					error: null
				});
			} catch (error) {
				this.setState({
					error,
					loading: false
				});
			}
		};

		getCurrentUser = async (token) => {
			try {
				this.setState({ loading: true });
				const user = await currentUserAPI(token, apiRoute);
				this.setState({
					user,
					message: "Fetched logged in user details.",
					token,
					error: null,
					loading: false
				});
			} catch (error) {
				this.setState({
					error,
					loading: false
				});
			}
		}

		render() {
			return (
				<WrappedComponent
					{...this.props}
					{...this.state}
					login={this.login}
					logout={this.logout}
					signup={this.signup}
					getCurrentUser={this.getCurrentUser}
				/>
			);
		}
	};
}

export default withAuth;

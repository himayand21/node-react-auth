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
				this.setState({ ...initialState, user, token, message: "Signed up and logged in." });
			} catch (error) {
				this.setState({ ...initialState, error });
			}
		};

		login = async body => {
			try {
				this.setState({ loading: true });
				const { user, token } = await loginAPI(body, apiRoute);
				this.setState({ ...initialState, user, token, message: "Logged in." });
			} catch (error) {
				this.setState({ ...initialState, error });
			}
		};

		logout = async (token, allDeviceFlag) => {
			try {
				this.setState({ loading: true });
				const { message } = await logoutAPI(token, allDeviceFlag, apiRoute);
				this.setState({ ...initialState, message });
			} catch (error) {
				this.setState({ ...initialState, error });
			}
		};

		getCurrentUser = async (token) => {
			try {
				this.setState({ loading: true });
				const { user } = await currentUserAPI(token, apiRoute);
				this.setState({ ...initialState, user, message: "Fetched logged in user details." });
			} catch (error) {
				this.setState({ ...initialState, error });
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

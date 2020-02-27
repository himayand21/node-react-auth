import React, { Component } from "react";
import { loginAPI, logoutAPI, signupAPI, currentUserAPI } from "./api";

const initialState = {
  user: null,
  token: null,
  error: null,
  message: null
};

function withAuth(WrappedComponent, apiRoute) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    signup = async body => {
      try {
        const { user, token } = await signupAPI(body, apiRoute);
        this.setState({ ...initialState, user, token });
      } catch (error) {
        this.setState({ ...initialState, error });
      }
    };

    login = async body => {
      try {
        const { user, token } = await loginAPI(body, apiRoute);
        this.setState({ ...initialState, user, token });
      } catch (error) {
        this.setState({ ...initialState, error });
      }
    };

    logout = async (token, allDeviceFlag) => {
      try {
        const { message } = await logoutAPI(token, allDeviceFlag, apiRoute);
        this.setState({ ...initialState, message });
      } catch (error) {
        this.setState({ ...initialState, error });
      }
    };

	getCurrentUser = async (token) => {
		try {
        const { user } = await currentUserAPI(token, apiRoute);
        this.setState({ ...initialState, user });
      } catch (error) {
        this.setState({ ...initialState, error });
      }
	}

    render() {
      const { user, error, token } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          login={this.login}
          logout={this.logout}
		  signup={this.signup}
		  getCurrentUser={this.getCurrentUser}
          user={user}
          error={error}
          token={token}
        />
      );
    }
  };
}

export default withAuth;

import React from 'react';

import LandingLayout from "@components/landingLayout";
import SignupWidget from "./signupWidget";
import LoginWidget from "./loginWidget";

import "./login.scss";

class Login extends React.Component {
  state = {
    showLogin: true,
  };

  //Redirects if user is authenticated
  componentDidMount() {
  }

  //Toggle between sign up or log in 
  toggle = () => {
    this.setState({
      showLogin: !this.state.showLogin,
    })
  }

  render () {
    const { showLogin } = this.state;

    return (
      <LandingLayout>
        
      </LandingLayout>
    )
  }
}

export default Login;
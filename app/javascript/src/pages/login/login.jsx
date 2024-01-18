import React from "react";

import LandingLayout from "@components/landingLayout";
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";

import { handleErrors, safeCredentials } from "../../utils/fetchHelper";

import "./login.scss"

class Login extends React.Component {
  state = {
    showLogin: true,
  }

  componentDidMount() {
    fetch("api/authenticated")
      .then(handleErrors)
      .then(data => {
        if (data.authenticated) {
          return location.assign("/patient_list")
        }
      })
      .catch(error => { console.log(error) })
  };

  login = (username, password, callback) => {
    fetch("api/sessions", safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          return location.assign("/patient_list")
        }
      })
      .catch(error => {
        callback(error);
      });
  };

  toggle = () => {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  };

  render() {
    const { showLogin } = this.state;

    return (
      <LandingLayout>
        <div className="container-fluid" id="login">
          <div className="row">
            <div className="col-12 widget-container d-flex align-items-center justify-content-center">
              <div className="border rounded p-4 m-4">
                <h1 className="text-center">
                  Hippotech
                </h1>
                { showLogin
                  ? <LoginWidget 
                      toggle={ this.toggle } 
                      login={ this.login }
                    />
                  : <SignUpWidget 
                      toggle={ this.toggle }
                      login={ this.login } 
                    />
                }
              </div>
            </div>
          </div>
        </div>
      </LandingLayout>
    )
  };
};

export default Login;
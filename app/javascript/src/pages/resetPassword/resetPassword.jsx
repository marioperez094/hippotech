import React from "react";

import LandingLayout from "@components/landingLayout";
import SignupForm from "@components/signupForm";
import LoadingRing from "@components/loadingRing";

import { handleErrors, safeCredentials } from "../../utils/fetchHelper";

import "@pages/login/login.scss"

class ResetPassword extends React.Component {
  state = {
    password: "",
    error: "",
    loading: true,
    user: null,
  };


  componentDidMount() {
    fetch("api/authenticated")
      .then(handleErrors)
      .then(data => {
        if (!data.authenticated) {
          return location.assign("/login");
        };

        this.setState({ loading: false, user: data.user });
      })
      .catch(error => console.log(error))
  };

  //Only allows password reset
  handleChange = (e) => {
    if (e.target.name !== "password") {
      return;
    }

    this.setState({
      password: e.target.value,
    });
  };

  newPassword = (e) => {
    const { password } = this.state;

    if (e) e.preventDefault();
    this.setState({
      error: "",
      loading: true,
    });

    fetch("/api/user/password_reset", safeCredentials({
      method: "PUT",
      body: JSON.stringify({
        password: password
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          location.assign("/patient_list")
        }
      })
  };

  render() {
    const { password, error, loading, user } = this.state;

    if (loading) {
      return (
        <LoadingRing />
      )
    }

    const { first_name, last_name, username, email } = user

    return (
      <LandingLayout>
        <div 
          className="container-fluid"
          id="login"
        >
          <div className="row">
            <div className="col-12 widget-container d-flex align-items-center justify-content-center">
              <div className="border rounded p-4 m-4">
                <h1 className="text-center">
                  Hippotech
                </h1>
                <h6 className="text-center">
                  Reset Password
                </h6>
                <p className="text-danger text-center">
                  { error }
                </p>
                <form 
                  className="py-4"
                  onSubmit={ this.newPassword }
                >
                  <div className="row">
                    <SignupForm
                      first_name={ first_name }
                      last_name={ last_name }
                      email={ email }
                      password={ password }
                      username={ username }
                      handleChange={ this.handleChange }
                    />
                    <div className="col-12 mt-3 text-end">
                      <button 
                        type="submit"
                        className="btn btn-primary btn-block btn-lg"
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> 
      </LandingLayout>
    )
  };
};

export default ResetPassword;
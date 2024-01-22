import React from "react";

import LoadingRing from "@components/loadingRing";
import SignupForm from "@components/signupForm";

import { handleErrors, safeCredentials } from "@utils/fetchHelper";
import { errorObject } from "@utils/utils";

class SignUpWidget extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
    error: "",
    loading: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signup = (e) => {
    const { first_name, last_name, email, password, username } = this.state;

    if (e) e.preventDefault();
    this.setState({
      error: "",
      loading: true,
    });

    fetch("/api/users", safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          username: username,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if(data.user) {
          this.login();
        };
      })
      .catch(error => {
        this.setState({
          error: errorObject(error),
          loading: false, 
        });
      });
  };

  login = () => {
    const { username, password } = this.state;
    this.setState({ error: "" });

    this.props.login(username, password, (errors) => {
      this.setState({
        error: errorObject(errors),
        loading: false
      })
    })
  }

  render() {
    const { first_name, last_name, email, password, username, error, loading } = this.state;

    return (
      <>
        { loading &&
          <LoadingRing />
        }
        <h6 className="text-center">
          Sign up
        </h6>
        <p className="text-danger text-center">
          { error }
        </p>
        <form 
          className="py-4" 
          onSubmit={ this.signup }
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
                Sign up
              </button>
            </div>
          </div>
        </form>
        <hr className="mt-0" />
        <p className="mb-0 text-center">
          Have an account? <a className="text-primary" onClick={ this.props.toggle }>
            Log in
          </a>
        </p>
      </>
    )
  }
};

export default SignUpWidget;

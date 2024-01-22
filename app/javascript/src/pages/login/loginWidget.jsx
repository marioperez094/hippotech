import React from "react";

import SpecialInput from "@components/specialInput";
import LoadingRing from "@components/loadingRing";

import { errorObject } from "@utils/utils";

class LoginWidget extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
    loading: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    if (e) e.preventDefault();
    
    const { username, password } = this.state;
    
    this.setState({
      error: "",
      loading: true
    });

    this.props.login(username, password, (errors) => {
      this.setState({ 
        error: errorObject(errors),
        loading: false
      })
    })
  };

  render() {
    const { username, password, error, loading } = this.state;

    return (
      <>
        { loading &&
          <LoadingRing />
        }
        <h6 className="text-center">Log in</h6>
        <p className="text-danger text-center">
          { error }
        </p>
        <form 
          className="pb-4" 
          onSubmit={ this.login }
        >
          <div className="form-group labeled-border col-12 mt-3">
            <SpecialInput 
              name="username" 
              value={ username } 
              handleChange={ this.handleChange } 
            />
          </div>
          <div className="form-group labeled-border col-12 mt-3">
            <SpecialInput
              name="password"
              value={ password }
              type="password"
              handleChange={this.handleChange}
            />
          </div>
          <div className="col-12 mt-3 text-end">
            <button 
              type="submit" 
              className="btn btn-primary btn-block btn-lg"
            >
              Log in
            </button>
          </div>
        </form>
        <hr className="mt-0" />
        <p className="mb-0 text-center">
          Make an account? <a className="text-primary" onClick={ this.props.toggle }>Sign Up</a>
        </p>
      </>
    )
  }
};

export default LoginWidget;
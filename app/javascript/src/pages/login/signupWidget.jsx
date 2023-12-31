import React from 'react';

import SpecialInput from '@components/specialInput/specialInput';
import LoadingRing from '@components/loadingRing/loadingRing';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { errorObject } from '@utils/utils';

class SignupWidget extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: '',
    error: '',
    loading: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
      loading: true,
    });

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.user) {
          return this.login();
        }
      })
      .catch(error => {
        this.setState({
          //Returns any errors to be visible to the front end
          error: errorObject(error),
          loading: false
        })
      })

  }

  login = () => {
    this.setState({error: ''});

    fetch('api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          return location.assign('/patient_list')
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log in.',
          loading: false
        })
      })
  };

  render () {
    const { first_name, last_name, email, password, username, error, loading } = this.state;

    return (
      <React.Fragment>
        {loading &&
          <LoadingRing />
        }
        <h6 className='text-center'>Sign up</h6>
        <p className='text-danger text-center'>{error}</p>
        <form className='py-4' onSubmit={this.signup}>
          <div className='row'>
            <div className='form-group labeled-border col-sm-6'>
              <label  htmlFor='first-name'>First Name</label>
              <input name='first_name' className='form-control form-control-lg rounded-left' id='first-name' value={first_name} onChange={this.handleChange} required/>
            </div>
            <div className='form-group labeled-border col-12 col-sm-6 mt-3 mt-sm-0'>
              <label htmlFor='last-name'>Last Name</label>
              <input name='last_name' className='form-control form-control-lg rounded-left' id='last-name' value={last_name} onChange={this.handleChange} required/>
            </div>
          </div>
          <SpecialInput name='username' value={username} handleChange={this.handleChange} />
          <div className='form-group labeled-border col-12 mt-3'>
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' className='form-control form-control-lg rounded' id='email' value={email} onChange={this.handleChange} required/>
          </div>
          <div className='form-group labeled-border col-12 mt-3'>
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' className='form-control form-control-lg rounded' id='password' onChange={this.handleChange} value={password} required/>
          </div>
          <div className='col-12 mt-3 text-end'>
          <button type='submit' className='btn btn-primary btn-block btn-lg'>Sign up</button>
        </div>
        </form>
        <hr className='mt-0' />
        <p className='mb-0 text-center'>Have an account? <a className='text-primary' onClick={this.props.toggle}>Log In</a></p>
      </React.Fragment>
    )
  }
}

export default SignupWidget
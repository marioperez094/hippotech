// loginWidget.jsx
import React from 'react';

import SpecialInput from '@components/specialInput/specialInput';
import LoadingRing from '@components/loadingRing/loadingRing';

import { safeCredentials, handleErrors } from '@utils/fetchHelper'
import { errorObject } from '@utils/utils';

class LoginWidget extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
    loading: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
      loading: true
    });

    fetch('/api/sessions', safeCredentials({
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
          error: JSON.parse(error.message),
          loading: false
        })
      })
  }

  render () {
    const {username, password, error, loading} = this.state;

    return (
      <React.Fragment>
        {loading &&
          <LoadingRing /> 
        }
        <h6 className='text-center'>Log in</h6>
        <p className='text-danger text-center'>{error}</p>
        <form className='pb-4' onSubmit={this.login}>
          <SpecialInput name='username' value={username} handleChange={this.handleChange} />
          <div className='form-group labeled-border col-12 mt-3'>
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' className='form-control form-control-lg rounded' id='password' value={password} onChange={this.handleChange} />
          </div>
        <div className='col-12 mt-3 text-end'>
          <button type='submit' className='btn btn-primary btn-block btn-lg'>Log in</button>
        </div>
        </form>
        <hr className='mt-0' />
        <p className='mb-0 text-center'>Make an account? <a className='text-primary' onClick={this.props.toggle}>Sign Up</a></p>
      </React.Fragment>
    )
  }
}

export default LoginWidget
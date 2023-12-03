// signupWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';

class SignupWidget extends React.Component {

  render () {
    return (
      <React.Fragment>
        <h6 className='text-center'>Sign up</h6>
        <form className='py-4'>
          <div className='row'>
            <div className='form-group labeled-border col-sm-6'>
              <label for='first-name'>First Name</label>
              <input className='form-control form-control-lg rounded-left' id='first-name' />
            </div>
            <div className='form-group labeled-border col-12 col-sm-6 mt-3 mt-sm-0'>
              <label for='last-name'>Last Name</label>
              <input className='form-control form-control-lg rounded-left' id='last-name' />
            </div>
          </div>
          <div className='form-group labeled-border col-12 mt-3'>
            <label for='email'>Email</label>
            <input type='text' className='form-control form-control-lg rounded' id='email' />
          </div>
          <div className='form-group labeled-border col-12 mt-3'>
            <label for='password'>Password</label>
            <input type='text' className='form-control form-control-lg rounded' id='password' />
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
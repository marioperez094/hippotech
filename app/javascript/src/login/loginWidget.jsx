// loginWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';

class LoginWidget extends React.Component {

  render () {
    return (
      <React.Fragment>
        <h6 className='text-center'>Log in</h6>
        <form className='py-4'>
          <div className='form-group labeled-border col-12'>
            <label for='email'>Email</label>
            <input type='text' className='form-control form-control-lg rounded' id='email' />
          </div>
          <div className='form-group labeled-border col-12 mt-3'>
            <label for='email'>Password</label>
            <input type='text' className='form-control form-control-lg rounded' id='email' />
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
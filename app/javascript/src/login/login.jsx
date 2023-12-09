import React from 'react';
import { handleErrors } from '@utils/fetchHelper';

import Navbar from '@components/landingNavbar';
import Footer from '@components/landingFooter';
import SignupWidget from './signupWidget';
import LoginWidget from './loginWidget';

import './login.scss'
import { getRequest } from '../utils/fetchRequests';

class Login extends React.Component {
  state = {
    showLogin: true,
  };

  //Redirects if user is authenticated
  componentDidMount() {
    getRequest('/api/authenticated', function(data) {
      if (data.authenticated) {
        location.assign('/patient_list')
      }
    })
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
      <>
        <Navbar />
          <div className='container-fluid' id='login'>
            <div className='row'>
              <div className='col-12 widget-container d-flex align-items-center justify-content-center'>
                <div className='border rounded p-4 m-4'>
                  <h1 className='text-center'>Hippotech </h1>
                  {showLogin
                    ? <LoginWidget toggle={this.toggle} />
                    : <SignupWidget toggle={this.toggle} />
                  }
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </>
    )
  }
}

export default Login;
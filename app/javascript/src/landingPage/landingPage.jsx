import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './navbar';
import Footer from './footer';

import './landingPage.scss';


class LandingPage extends React.Component {
  state = {

  }

  render() {
    return (
      <>
        <div id='landing-page'>
          <Navbar />
          <h1 className='py-3 ps-3 smaller-header d-lg-none'>Take care of what really matters</h1>
          <div id='hero'>
            <h1 className='ps-5 d-none d-lg-block'>Take care of what really matters</h1>
          </div>
          <div id='hero-cards'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center mx-auto d-lg-none hero-footer'>
                  <h5 className='text-white'>A solution for patient care</h5>
                </div>
                <div className='col-12 col-lg-6'>
                  <a href='/login'>
                  <div className='shadow p-3 m-5 rounded hero-card'>
                    <h2>Log in/Sign up</h2>
                    <h6>Log in to see a charting system with healthcare workers in mind.</h6>
                    <ul>
                      <li>Explore different features</li>
                      <li>Add your own patients</li>
                      <li>Input and modify vitals</li>
                      <li>Visualize data in different ways</li>
                    </ul>
                  </div>
                  </a>
                </div>
                <div className='col-12 col-lg-6'>
                  <a href='#'>
                  <div className='shadow p-3 m-5 rounded hero-card'>
                    <h2>Demo</h2>
                    <h6>Try it without an email.</h6>
                    <ul>
                      <li>Explore different features</li>
                      <li>Visualize data in different ways</li>
                    </ul>
                  </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 justify-content-center mx-auto d-none d-lg-flex hero-footer'>
            <h5 className='text-white'>A solution for patient care</h5>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default LandingPage;
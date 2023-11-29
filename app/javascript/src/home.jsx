// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import './home.scss'

class Home extends React.Component {
  state = {

  }

  render() {
    return (
      <>
        <header>
          <nav className='navbar navbar-light landing-page'>
            <div className='container-fluid'>
              <a className='navbar-brand' href='#'>Hippotech</a>
              <div className='d-flex'>
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>Log in</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h1 className='py-3 ps-5 smaller-header d-lg-none'>Take care of what really matters</h1>
          <div id='hero'>
            <h1 className='ps-5 d-none d-lg-block'>Take care of what really matters</h1>
          </div>
          <div id='hero-cards'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12 d-flex justify-content-center mx-auto d-lg-none hero-footer'>
                  <h5 className='text-white'>Try an easier solution</h5>
                </div>
                <div className='col-12 col-lg-6'>
                  <a href='#'>
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
                    <h6>Try the charting system, no email required.</h6>
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
            <h5 className='text-white'>Try an easier solution</h5>
          </div>
        </header>
      </>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
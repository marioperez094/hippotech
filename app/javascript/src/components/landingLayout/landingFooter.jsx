import React from "react";

import './layout.scss'

const Footer = () => {
  return (
    <footer className='container-fluid px-3 px-md-5'>
      <div className='row'>
        <div className='col-12 col-md-6 d-md-flex justify-content-center'>
          <div className='row'>
            <div className='col-12'>
              <h6>Other Solutions</h6>
            </div>
            <div className='col-12'>
              <a href='https://infusiontimer.github.io/'>Infusion Timer</a>
            </div>
            <div className='col-12'>
              <a href='#'>Nursing Task Tracker</a>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6 mt-3 mt-md-0 d-md-flex justify-content-center'>
          <div className='row'>
            <div className='col-12'>
              <h6>Personal links</h6>
            </div>
            <div className='col-12'>
              <a href='https://www.linkedin.com/in/mario-perez-412b7b273/'>Linked in</a>
            </div>
            <div className='col-12'>
              <a href='https://github.com/marioperez094'>GitHub</a>
            </div>
          </div>
        </div>
        <div className='col-12 mt-3'>
          <h6>Disclaimer</h6>
          <p>This is a test build and does not represent a finished product. Patients in this product do not reflect real people.</p>
        </div>
        <div className='col-12 mt-3 d-flex justify-content-center'>
          <p><small>&copy;2023 Hoppitech</small></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
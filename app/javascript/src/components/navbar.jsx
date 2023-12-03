import React, { useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import '../patientList/patientList.scss'

const Navbar = (props) => {
  const [username, setUsername] = useState('Mario Perez')
  return (
    <nav className='navbar navbar-expand-md navbar-light'>
      <div className='container-fluid'>
        <a className='navbar-brand d-none d-md-block' href='/patient_list'>H</a>
        <a className='d-md-none navbar-toggler navbar-brand' role='button' type='button' data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">H</a>

        <h5 className='mx-auto d-md-none'>{username}</h5>

        <form className='d-flex d-md-none'>
          <input className="form-control me-2" type="search" placeholder="Patient Name" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>


        
        <div className='collapse navbar-collapse' id='navbarNav'>
          <h5 className='mx-auto d-none d-md-flex'>{username}</h5>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item d-md-none'>
              <a className='nav-link active' aria-current='page' href='/patient_list'>Home</a>
            </li>
            <form className='me-3 d-none d-md-flex'>
              <input className="form-control me-2" type="search" placeholder="Patient Name" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='/patient_list'>Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
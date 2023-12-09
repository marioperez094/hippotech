import React, { useEffect, useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import LoadingRing from './loadingRing';


import { getRequest } from '../utils/fetchRequests';
import { handleErrors, safeCredentials } from '../utils/fetchHelper';

import '../patientList/patientList.scss'

const Navbar = (props) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('Demo Version')
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getRequest('/api/authenticated', function(data) {
      if (!data.authenticated) {
        return setLoading(false);
      }
      const user = data.user;
      setAuthenticated(true);
      setUsername(user.last_name + ', ' + user.first_name);
      return setLoading(false);
    })
  }, [])

  const logOut = () => {
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE'
    }))
      .then(handleErrors)
      .then(data => {
        if (!data.success) {
          return setLoading(false);
        }
        setAuthenticated(false);
        setUsername('Demo Version')
        setLoading(false);
      })
  }
  
  return (
    <>
      {loading &&
        <LoadingRing />
      }
      <nav className='navbar navbar-expand-md navbar-light'>
        <div className='container-fluid'>
          <a className='navbar-brand d-none d-md-block' href='/patient_list'>H</a>
          <a className='d-md-none navbar-toggler navbar-brand' role='button' type='button' data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">H</a>

          {/* User name for small screens */}
          <h5 className='ms-auto d-md-none'>{username}</h5>


        
          <div className='collapse navbar-collapse' id='navbarNav'>
            {/* User name for large screens */}
            <h5 className='mx-auto d-none d-md-flex'>{username}</h5>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item d-md-none'>
                <a className='nav-link' href='/patient_list'>Home</a>
              </li>
              {authenticated 
                ? <>
                    <li className='nav-item order-md-2'>
                      <a className='nav-link' href='/new_patient'>Admit A new Patient</a>
                    </li>
                    <li className='nav-item order-md-3'>  
                      <a className='nav-link' href='#' onClick={() => logOut()}>Log out</a>  
                    </li>
                  </>
                : <li className='nav-item order-md-3'>
                    <a className='nav-link' href='/login'>Log in</a>
                  </li>
                }
              <form className='me-3 d-flex search-box order-md-1'>
                <input className="form-control me-2 search-input" type="search" placeholder="Patient Name" aria-label="Search" />
                <button className="btn btn-outline-success search-btn" type="submit">Search</button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
};

export default Navbar;
import React from 'react';
import { ReactDOM } from 'react';

import './layout.scss'

const Navbar = () => {
  return (
    <nav className='navbar navbar-light landing-page'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>Hippotech</a>
        <div className='d-flex'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href='/login'>Log in</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
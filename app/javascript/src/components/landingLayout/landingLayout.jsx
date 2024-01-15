import React from "react";

import './landingLayout.scss'

function LandingLayout(props) {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Hippotech
          </a>
          <div className="d-flex">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Log in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
    </>
  )
};

export default LandingLayout;
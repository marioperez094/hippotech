import React, { useEffect, useState } from "react";

import LoadingRing from "@components/loadingRing";

import { safeCredentials, handleErrors } from "@utils/fetchHelper";

import "./navbar.scss";

function Navbar(props) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const user = username || "Demo Version";


  useEffect(() => {
    fetch("api/authenticated")
      .then(handleErrors)
      .then(data => {
        if (!data.authenticated) {
          return setLoading(false);
        };
        
        //redirects user if their password has not been changed in 3 months
        if (data.user.password_3_months_old) {
          return location.assign("/reset_password")
        };


        const user = data.user;
        setUsername(`${user.last_name} ${user.first_name}`);
        setLoading(false);
      })
  }, []);

  function logOut() {
    fetch("api/sessions", safeCredentials({
      method: "DELETE"
    }))
      .then(handleErrors)
      .then(data => {
        if (!data.success) return;

        setUsername(null);
        location.reload();
      })
  }

  return (
    <>
      { loading &&
        <LoadingRing />
      }

      <nav 
        className="navbar navbar-expand-md navbar-light"
        id="emr-nav"
      >
        <div className="container-fluid">
          
          {/* Medium to XLarge screen brand */}
          <a 
            className="navbar-brand d-none d-md-block" 
            href="/patient_list"
          >
            H
          </a>

          {/* XSmall to Small screen brand and toggler*/}
          <a 
            className="d-md-none navbar-toggler navbar-brand"
            role="button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            H
          </a>

          {/* Username for small screens */}
          <h5 className="ms-auto d-md-none">
            { user }
          </h5>

          <div 
            className="collapse navbar-collapse px-4 pb-3"
            id="navbarNav"
          >
            {/* Username for large screens */}
            <h5 className="mx-auto d-none d-md-flex">
              { user }
            </h5>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-md-none">
                <a 
                  className="nav-link"
                  href="/patient-list"
                >
                  Home
                </a>
              </li>
              { username
                ? <LoggedInMenu
                    logOut={ logOut }
                  />
                : <li className="nav-item order-md-3">
                    <a 
                      className="nav-link"
                      href="/login"
                    >
                      Log in
                    </a>
                  </li>
              }
              { props.children }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
};

export default Navbar;

function LoggedInMenu(props) {
  const { logOut } = props;

  return (
    <>
      <li className="nav-item order-md-2">
        <a 
          className="nav-link"
          href="/new_patient"
        >
          Admit A New Patient
        </a>
      </li>
      <li className="nav-item order-md-3">
        <a
          className="nav-link"
          href="#"
          onClick={ () => logOut() }
        >
          Log out
        </a>
      </li>
    </>
  )
};
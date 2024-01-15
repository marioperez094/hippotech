import React from "react";

import "./landingPage.scss"

function Hero() {
  return (
    <>
      <h1 className="py-3 ps-3 smaller-header d-lg-none">
        Take care of what really matters.
      </h1>
      <main>
        <div id="hero">
          <h1 className="ps-5 d-none d-lg-block">
            Take care of what really matters.
          </h1>
        </div>
        <div className="container-fluid">
          <div className="row gx-0">
            <div className="col-12 d-lg-none hero-footer">
              <h5 className="text-white text-center">
                A solution for patient care
              </h5>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Hero;
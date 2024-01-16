import React from "react";

import HeroCard from "./heroCard";

import "./landingPage.scss"

function Hero() {
  const logInHeroCard = {
    link: "/login",
    title: "Log in/Sign up",
    description: "Log in to see a charting system with healthcare workers in mind.",
    listItems: [
      "Explore different features",
      "Add your own patients",
      "Input and modify vitals",
      "Visualize data in custom graphs",
      "See patient information in an organized and colorful way"
    ]
  };

  const demoHeroCard = {
    link: "/patient_list",
    title: "Demo",
    description: "Try it without an email.",
    listItems: [
      "Explore different features",
      "Visualize data in custom graphs",
      "See patient information in an organized and colorful way"
    ]
  };

  const patientSolution = 
  <>
  </>

  return (
    <>
      <h1 className="py-3 ps-3 smaller-header d-lg-none">
        Take care of what really matters.
      </h1>
      <main>
        <div id="hero">
          {/* Shows up on large screens only */}
          <h1 className="ps-5 d-none d-lg-block">
            Take care of what really matters.
          </h1>
        </div>
        <div id="hero-cards">
          <div className="container-fluid">
            <div className="row gx-0">
              <div className="col-12 d-lg-none hero-footer">
                <h5 className="text-white text-center">
                  A solution for patient care
                </h5>
              </div>
              <HeroCard
                heroCardContent={logInHeroCard}
              />
              <HeroCard
                heroCardContent={demoHeroCard}
              />
            </div>
          </div>
        </div> 
        <div className='col-12 justify-content-center mx-auto d-none d-lg-flex hero-footer'>
          {/* Shows up on small screens only */}
          <h5 className='text-white'>A solution for patient care</h5>
        </div>
      </main>
    </>
  )
};

export default Hero;
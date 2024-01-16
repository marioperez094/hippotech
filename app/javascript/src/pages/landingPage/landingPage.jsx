import React from "react";
import LandingLayout from "@components/landingLayout";
import Hero from "./hero";

import './landingPage.scss'

function LandingPage() {
  return (
    <div id="landing-page">
      <LandingLayout>
        <Hero />
        <article>
          <div className="container-fluid">
            <div className="row my-3">
              <div className="offset-md-2 col-12 col-md-3 order-2 order-md-1 d-flex justify-content-center align-items-center mt-2 mt-md-0">
                <div>
                  <h4 className="text-center">
                    Personalize your patient list
                  </h4>
                  <p>Easily change the data you see on your patient list. Without entering a patient chart you can get a wealth of information.</p>
                </div>
              </div>
              <div className="col-12 col-md-6 order-1 order-md-2">
                <div className="aspectRatio" id="patientListCrop" />
              </div>
            </div>
            <div className='row my-3'>
              <div className='col-12 col-md-6 offset-md-1'>
                <div className="aspectRatio"  id='vitalCrop' />
              </div>
              <div className='col-12 col-md-3 d-flex justify-content-center align-items-center mt-2 mt-md-0'>
                <div className="ps-3">
                  <h4 className="text-center">Easily Add Your Own Data</h4>
                  <p>From adding patients to inputting vitals, this solution is easy to use.</p>
                </div>
              </div>
            </div>
            <div className='row my-3'>
              <div className='offset-md-2 col-12 col-md-3 order-2 order-md-1 d-flex justify-content-center align-items-center mt-2 mt-md-0'>
                <div>
                  <h4 className='text-center'>Visualize Patient Information</h4>
                  <p>Easily patient vitals to see improvement or potential patient decline. Information is put into easy to understand graphs to get a better picture of the patient.</p>
                </div>
              </div>
              <div className='col-12 col-md-6 order-1 order-md-2'>
                <div className="aspectRatio" id='iograph' />
              </div>
            </div>
          </div>
        </article>
      </LandingLayout>
    </div>
  )
};

export default LandingPage;
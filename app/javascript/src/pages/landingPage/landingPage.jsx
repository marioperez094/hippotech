import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '@components/landingLayout/landingNavbar';
import Footer from '@components/landingLayout/landingFooter';

import './landingPage.scss';


class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div id='landing-page'>
          <Navbar />
          <h1 className='py-3 ps-3 smaller-header d-lg-none'>
            Take care of what really matters
          </h1>
          <main>
            <div id='hero'>
              <h1 className='ps-5 d-none d-lg-block'>Take care of what really matters</h1>
            </div>
            <div id='hero-cards'>
              <div className='container-fluid'>
                <div className='row gx-0'>
                  <div className='col-12 d-lg-none hero-footer'>
                    <h5 className='text-white text-center'>A solution for patient care</h5>
                  </div>
                  <div className='col-12 col-lg-6'>
                    <a href='/login'>
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
                  <a href='/patient_list'>
                    <div className='shadow p-3 m-5 rounded hero-card'>
                      <h2>Demo</h2>
                      <h6>Try it without an email.</h6>
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
              <h5 className='text-white'>A solution for patient care</h5>
            </div>
          </main>
          <article>
            <div className='container-fluid'>
              <div className='row my-3'>
                <div className='offset-md-2 col-12 col-md-3 order-2 order-md-1 d-flex justify-content-center align-items-center'>
                  <div>
                    <h4 className='text-center'>Personalize Your Patient List</h4>
                    <p>Easily change the information you see on your patient list. Without having to enter a patient chart you get a wealth of data.</p>
                  </div>
                </div>
                <div className='col-12 col-md-6 order-1 order-md-2'>
                  <div className="aspectRatio" id='patientListCrop'>
                  </div>
                </div>
              </div>
              <div className='row my-3'>
                <div className='col-12 col-md-3 order-2 order-md-2 d-flex justify-content-center align-items-center'>
                  <div>
                    <h4>Easily Add Your Own Data</h4>
                    <p>From adding patients to inputting vitals, this solution is easy to use.</p>
                  </div>
                </div>
                <div className='col-12 col-md-6 order-1 order-md-1'>
                  <div className="aspectRatio"  id='vitalCrop'>
                  </div>
                </div>
              </div>
              <div className='row my-3'>
                <div className='offset-md-2 col-12 col-md-3 order-2 order-md-1 d-flex justify-content-center align-items-center'>
                  <div>
                    <h4 className='text-center'>Visualize Patient Information</h4>
                    <p>Easily patient vitals to see improvement or potential patient decline. Information is put into easy to understand graphs to get a better picture of the patient.</p>
                  </div>
                </div>
                <div className='col-12 col-md-6 order-1 order-md-2'>
                  <div className="aspectRatio" id='iograph'>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <Footer />
        </div>
      </>
    )
  }
}

export default LandingPage;
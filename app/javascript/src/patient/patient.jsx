import React from "react";
import Navbar from "../components/navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom/cjs/react-router-dom.min";

import PatientBanner from "./patientBanner";
import Sidebar from "./sidebar";
import PatientSummary from "./patientSummary";
import IntakeOutput from "./intakeOutput";
import Flowsheet from "./flowsheet";

class Patient extends React.Component {
  state = {
    patient: {
      id: 1,
      fName: 'John',
      lName: 'Feta',
      gender: 'Male',
      dOB: '12/6/2023',
      age: 62,
      allergies: [{
        name: 'Penicillin',
        type: 'Severe', 
        symptom: 'Anaphylaxis'
      },
      {
        name: 'Vancomycin',
        type: 'Moderate', 
        symptom: 'Hives'
      },
      {
        name: 'Metformin',
        type: 'Mild', 
        symptom: 'Stomach Ache'
      }],
      code: 'Full Code',
      diet: 'Regular',
      diagnosis: 'Shortness of breath',
      history: ['Diabetes', 'Hypertension', 'Chronic Obstructive Pulmonary Disease'],
      admission: '12/06/2023',
      phone: '(123)-456-7890',
      contact: {
        name: 'Jane Feta',
        relationship: 'Spouse',
        number: '(987)-654-3210'
      },
      image: '/packs/media/images/anton-8q-U8X1zkvI-unsplash-27accd97.jpg',
      intake: [{date: '2023-12-06 18:00', milliliters: 200}, {date: '2023-12-06 16:00', milliliters: 100}, {date: '2023-12-06 17:00', milliliters: 100}],
      output: [{date: '2023-12-06 18:00', milliliters: 200}, {date: '2023-12-06 16:00', milliliters: 100}, {date: '2023-12-06 18:00', milliliters: 200}],
    },
    loading: false,
  }

  render() {
    const {patient, loading} = this.state;
    return (
      <Router>
        <Navbar />
        <main>
          <PatientBanner patient={patient} />
          <div className="container-fluid" id='patient-page'>
            <div className="row gx-0">
              <div className="col-12 col-md-2">
                <Sidebar id={patient.id}/>
              </div>
              <div className="col-12 col-md-10 patient-container">
                <Switch>
                  <Route exact path={`/patient/${patient.id}`}>
                    <PatientSummary
                      patient={patient}
                      loading={loading}
                    />
                  </Route>
                  <Route exact path={`/patient/${patient.id}/I&Os`}>
                    <IntakeOutput patient={patient} />
                  </Route>
                  <Route exact path={`/patient/${patient.id}/flowsheet`}>
                    <Flowsheet />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </Router>
    )
  }
}

export default Patient;
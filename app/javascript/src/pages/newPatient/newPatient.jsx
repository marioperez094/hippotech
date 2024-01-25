import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom/cjs/react-router-dom.min";

import Navbar from "@components/navbar";
import PatientSearch from "./patientSearch";
import PatientFormWithNavigation from "./patientForm";
import AdmissionForm from "./admissionForm";

import "./newPatient.scss"

class NewPatient extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className="container-fluid" id="patient-form">
          <div className="row">
            <Switch>
              <Route exact path="/new_patient">
                <PatientSearch />
              </Route>
              <Route exact path="/new_patient/form">
                <PatientFormWithNavigation />
              </Route>
              <Route path="/new_patient/admit" component={ AdmissionForm } />
            </Switch>
          </div>
        </div>
      </Router>
    )
  };
};

export default NewPatient;
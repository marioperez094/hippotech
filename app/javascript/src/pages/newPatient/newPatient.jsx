import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom/cjs/react-router-dom.min";

import Navbar from "@components/navbar";
import PatientSearch from "./patientSearch";

class NewPatient extends React.Component {
  state = {

  };

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
            </Switch>
          </div>
        </div>
      </Router>
    )
  };
};

export default NewPatient;
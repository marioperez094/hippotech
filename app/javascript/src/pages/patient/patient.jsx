import React from "react";
import Navbar from "@components/navbar/navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom/cjs/react-router-dom.min";

import PatientBanner from "./patientBanner";
import Sidebar from "./sidebar";
import PatientSummary from "./patientSummary";
import IntakeOutput from "./intakeOutput";
import VitalChart from "./vitalChart";
import Discharge from './discharge'
import LoadingRing from "@components/loadingRing/loadingRing";
import Flowsheet from "@components/flowsheet/flowSheet";

import { utcConvert } from "@utils/utils";
import { handleErrors } from "@utils/fetchHelper";

class Patient extends React.Component {
  state = {
    admission: {},
    patient: {},
    allergies: 'NKDA',
    histories: 'No Past Medical History', 
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/admissions/${this.props.admission_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({ 
          admission: data.admission,
          patient: data.admission.patient,
          allergies: data.admission.patient.allergies,
          histories: data.admission.patient.histories,
        }, () => {this.dateOfBirthUTC()})
      })
  }

  //Converts time to UTC to prevent incorrect date
  dateOfBirthUTC = () => {
    let patient = {...this.state.patient}
    patient.date_of_birth = utcConvert(patient.date_of_birth)

    this.setState({ patient, loading: false })

  }

  render() {
    const {admission, patient, allergies, histories, loading} = this.state;

    if (loading) {
      return (
        <LoadingRing />
      );
    };

    return (
      <Router>
        <Navbar display={'d-none'}/>
        <main>
          <PatientBanner admission={admission} patient={patient} allergies={allergies} />
          <div className="container-fluid" id='patient-page'>
            <div className="row gx-0">
              <div className="col-12 col-md-2">
                <Sidebar id={admission.id}/>
              </div>
              <div className="col-12 col-md-10 patient-container">
                <Switch>
                  <Route exact path={`/patient/${admission.id}`}>
                    <PatientSummary
                      admission={admission}
                      patient={patient}
                      allergies={allergies}
                      histories={histories}
                      loading={loading}
                    />
                  </Route>
                  <Route exact path={`/patient/${admission.id}/I&Os`}>
                    <IntakeOutput patient={patient} />
                  </Route>
                  <Route exact path={`/patient/${admission.id}/flowsheet`}>
                    <Flowsheet patient={patient}/>
                  </Route>
                  <Route exact path={`/patient/${admission.id}/temp`}>
                    <VitalChart />
                  </Route>
                  <Route exact path={`/patient/${admission.id}/discharge`}>
                    <Discharge patient={patient} admission={admission} />
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
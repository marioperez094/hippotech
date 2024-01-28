import React, { useState } from "react";

import PatientCard from "./patientCard";

import { handleErrors } from "@utils/fetchHelper";

class AdmissionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patient: null,
      currentlyAdmitted: false,
    };

    this.fetchPatient = this.fetchPatient.bind(this);
  };

  componentDidMount() {
    this.fetchPatient();
  };

  fetchPatient() {
    const params = new URLSearchParams(this.props.location.search);

    fetch(`/api/patients/${params.get("patientID")}`)
      .then(handleErrors)
      .then(data => {
        this.setState({ 
          patient: data.patient
        })
      })
      .catch(errors => {
        console.log(errors)
      })
  }

  render() {
    const { patient } = this.state;

    return(
      <>
        { patient &&
          <div className="col-8 shadow p-3 my-5 bg-body rounded">
            <h3 className="text-success text-center">Admitting Patient</h3>
            <PatientCard patient={ patient } />
          </div>
        }
      </>
    )
  };
};

export default AdmissionForm;
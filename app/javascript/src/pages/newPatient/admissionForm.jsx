import React from "react";

import PatientCard from "./patientCard";
import AdmissionFormSteps from "./admissionFormSteps";
import LoadingRing from "@components/loadingRing"

import { handleErrors } from "@utils/fetchHelper";

class AdmissionForm extends React.Component {

  state = {
    patient: null,
    currentlyAdmitted: false,
    admissionStep: 0,
  };

  componentDidMount() {
    this.fetchPatient();
  };

  fetchPatient = () => {
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
  };



  changeFormState = (step) => {
    let admissionStep = this.state.admissionStep;

    admissionStep = admissionStep + (step * 1);
    if (admissionStep <= 0) {
      admissionStep = 0;
    }
    else if (admissionStep >= 2) {
      admissionStep = 2;
    };

    this.setState({
      admissionStep
    });
  };

  render() {
    const { patient, admissionStep } = this.state;

    //Admission titles for multi-form
    const admissionTitles = ["Personal Information", "Emergency Contact", "Current Visit"];

    if (!patient) {
      return <LoadingRing />
    };

    if (patient.is_admitted) {
      return (
        <h3 className="text-center text-danger my-3">
          Patient is currently admitted. Please discharge prior to re-admitting.
        </h3>
      )
    };

    return(
      <>
        <h3>{ admissionTitles[admissionStep] }</h3>
        { patient &&
          <div className="col-8 shadow p-3 my-5 bg-body rounded">
            <h3 className="text-success text-center">
              Admitting Patient
            </h3>
            <PatientCard patient={ patient } />
          </div>
        }
        <AdmissionFormSteps 
          admissionStep={ admissionStep }
          changeFormState={ this.changeFormState }
          id={ patient.id }
        />
      </>
    )
  };
};

export default AdmissionForm;
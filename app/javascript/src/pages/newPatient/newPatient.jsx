import React from "react";

import Navbar from '@components/navbar/navbar';
import PatientSearch from "./patientSearch";
import NewPatientForm from "./newPatientForm";
import NewAdmissionForm from "./newAdmissionForm";

import { handleErrors } from '@utils/fetchHelper';
import { errorObject } from '@utils/utils'

import './newPatient.scss'

class NewPatient extends React.Component {
  state = {
    search: '',
    patient: null,
    error: null,
    admission: {
      code: '',
      diet: '',
      diagnosis: '',
      admission: '',
      phone: '',
      emergencyName: '',
      emergencyRelationship: '', 
      emergencyNumber: '',
    },
    allergies: [],
    history: [],
    formState: 0,
  }

  changeFormState = (state) => {
    this.setState({ formState: state })
  }

  changeSearchInput = (e) => {
    this.setState({ search: e.target.value })
  }

  searchPatient = (e) => {
    if (e) { e.preventDefault() }

    fetch(`/api/patients/${this.state.search}`)
      .then(handleErrors)
      .then(data => 
        this.setState({ 
          patient: data.patient, 
          error: null 
        }))
      .catch(error => {
        this.setState({
          error: errorObject(error),
          patient: null
        })
      })
  }

  addPatient = (patientInfo) => {
    this.setState({ patient: patientInfo })
  }

  render() {
    const { search, error, patient, formState } = this.state;

    return (
      <>
        <Navbar />
        <div className="container-fluid" id='patientForm'>
          <div className="row">
            {formState === 0 &&
              <PatientSearch 
                changeFormState={this.changeFormState}
                changeSearchInput={this.changeSearchInput}
                searchPatient={this.searchPatient}
                search={search}
                error={error}
                patient={patient}
              />
            }
            {formState === 1 &&
              <NewPatientForm 
                addPatient={this.addPatient}
                changeFormState={this.changeFormState}
              />
            }
            {formState === 2 &&
              <NewAdmissionForm 
                patient={patient}
                changeFormState={this.changeFormState}
              />
            }
          </div>
        </div>
      </>
    )
  }
};

export default NewPatient;
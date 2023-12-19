import React from "react";

import Navbar from '@components/navbar/navbar';
import PatientForm from './patientForm';

import './newPatient.scss'

class NewPatient extends React.Component {
  state = {
    patient: {
      fName: '',
      lName: '', 
      gender: '',
      dOB: '',
      age: '', 
      allergies: [],
      code: '',
      diet: '',
      diagnosis: '',
      history: [],
      admission: '',
      phone: '',
      emergencyName: '',
      emergencyRelationship: '', 
      emergencyNumber: '',
      image: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      patient: {
        ...this.state.patient,
        [e.target.name]: e.target.value
      }
    }, () => {console.log(this.state.patient)})
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container-fluid" id='patientForm'>
          <div className="row">
            <PatientForm patient={this.state.patient} handleChange={this.handleChange} />
          </div>
        </div>
      </>
    )
  }
};

export default NewPatient;
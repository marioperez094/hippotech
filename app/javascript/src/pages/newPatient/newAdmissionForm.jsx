import React from "react";

import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class NewAdmissionForm extends React.Component {
  state = {
    admission: {
      phone_number: '',
      address: '',
      occupation: '',
      emergency_contact: '',
      emergency_relationship: '',
      emergency_phone: '',
      diagnosis: '',
      code_status: 'Full',
      diet: 'Regular',
    },
    currentlyAdmitted: false,
    admissionState: 0,
    error: null,
  }

  componentDidMount () {
    fetch(`/api/patients/${this.props.patientID}/admissions`)
      .then(handleErrors)
      .then(data => {
        const currentlyAdmitted = data.admissions.filter((admission) => {
          return !admission.discharge
        });

        if (currentlyAdmitted.length > 0) {
          return this.setState({ currentlyAdmitted: true })
        }
      })
  }
  changeAdmissionInput = (e) => {
    this.setState({
      admission: {
        ...this.state.admission,
        [e.target.name]: e.target.value
      }
    }, () => console.log(this.state.admission))
  }

  changeAdmissionState = (state) => {
    this.setState({ admissionState: state })
  }

  submitAdmission = (e) => {
    if (e) { e.preventDefault() };

    let admission = {...this.state.admission};
    admission.patient_id = this.props.patientID

    fetch(`/api/admissions`, safeCredentials({
      method: 'POST',
      body: JSON.stringify(admission)
    }))
      .then(handleErrors)
      .then(data => {
        const admission = data.admission
        this.setState({ error: '' })
        return location.assign(`/patient/${admission.id}}/allergies`)
      })
      .catch(error => this.setState({ error: 'Could not submit admission' }))

  }

  render () {
    const arrayTitle = ['Personal Information', 'Emergency Contact', 'Current Visit']
    const { admissionState, error, currentlyAdmitted, admission } = this.state;
    const { phone_number, address, occupation, emergency_contact, emergency_relationship, emergency_phone, diagnosis, code_status, diet } = admission;

    if (currentlyAdmitted) {
      return (
        <h3 className="text-center">Patient is currently admitted, if new admission please discharge prior to re-admitting</h3>
      )
    }

    return (
      <>
        <h3>{arrayTitle[this.state.admissionState]}</h3>
        <form className="col-11 shadow p-3 my-5 bg-body rounded" onSubmit={this.submitAdmission}>
          {error && <p className="text-danger text-center">{error}</p>}
          {admissionState === 0 &&
            <>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input className="form-control" name="phone_number" value={phone_number} type="number" onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input className="form-control" name="address" value={address} onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Occupation</label>
                <input className="form-control" name="occupation" value={occupation} onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="text-end">
                <button type="button" className="btn btn-outline-secondary" onClick={() => {this.changeAdmissionState(1)}}>Next</button>
              </div>
            </> 
          }
          {admissionState === 1 &&
            <>
              <div className="mb-3">
                <label className="form-label">Emergency Contact Name</label>
                <input className="form-control" name="emergency_contact" value={emergency_contact} onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Relationship to Patient</label>
                <input className="form-control" name="emergency_relationship" value={emergency_relationship} onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Emergency Contact Number</label>
                <input className="form-control" name="emergency_phone" value={emergency_phone} type="number" onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="d-flex justify-content-evenly align-items-end">
                <button type="button" className="btn btn-light me-auto" onClick={() => {this.changeAdmissionState(0)}}>Back</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => {this.changeAdmissionState(2)}}>Next</button>
              </div>
            </> 
          }
          {admissionState === 2 &&
            <>
              <div className="mb-3">
                <label className="form-label">Admission Diagnosis</label>
                <input className="form-control" name="diagnosis" value={diagnosis} onChange={this.changeAdmissionInput} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Code Status</label>
                <select className="form-control" name='code_status' onChange={this.changeAdmissionInput} value={code_status}>
                  <option value='Full'>Full</option>
                  <option value='DNR'>Do Not Resuscitate</option>
                  <option value='DNI'>Do Not Intubate</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Diet</label>
                <select className="form-control" name='diet' onChange={this.changeAdmissionInput} value={diet}>
                  <option value='Regular'>Regular</option>
                  <option value='Cardiac'>Cardiac</option>
                  <option value='Diabetic'>Diabetic</option>
                  <option value='NPO'>Nothing By Mouth</option>
                </select>
              </div>
              <div className="d-flex justify-content-evenly align-items-end">
                <button type="button" className="btn btn-light me-auto" onClick={() => {this.changeAdmissionState(1)}}>Back</button>
                <button type="submit" className="btn btn-outline-secondary">Admit Patient</button>
              </div>
            </> 
          }
        </form>
      </>
    )
  }
};

export default NewAdmissionForm;

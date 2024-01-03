import React from "react";

import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';

class NewPatientForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    bio_sex: 'male',
    date_of_birth: '',
    image: null, 
    error: null,
  }

  changePatientInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changePatientFiles = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  submitPatient = (e) => {
    if (e) { e.preventDefault() }

    const { first_name, last_name, bio_sex, date_of_birth, image, } = this.state;

    let formData = new FormData();

    if (image) {
      formData.set('patient[image]', image);
    }

    formData.set('patient[first_name]', first_name);
    formData.set('patient[last_name]', last_name);
    formData.set('patient[bio_sex]', bio_sex);
    formData.set('patient[date_of_birth]', date_of_birth);
    
    fetch('/api/patients', safeCredentialsFormData({
      method: 'POST',
      body: formData
    }))
      .then(handleErrors)
      .then(data => {
        if (data.patient) {
          this.props.addPatient(data.patient)
          return this.props.changeFormState(2)
        }
      })
      .catch(error => this.setState({error: 'Could not add patient'}))
  }

  render () {
    const {changeFormState} = this.props;
    const {first_name, last_name, bio_sex, date_of_birth, error} = this.state;

    return (
      <>
        <h3>Patient Demographics</h3>
        <form className="col-11 shadow p-3 my-5 bg-body rounded" onSubmit={this.submitPatient}>
          {error && <p className="text-center text-warning">{error}</p>}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input className="form-control" name="first_name" value={first_name} onChange={this.changePatientInput} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input className="form-control" name="last_name" value={last_name} onChange={this.changePatientInput} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input className="form-control" name="date_of_birth" type="date" value={date_of_birth} onChange={this.changePatientInput} required/>
          </div>
          <div className="mb-3">
            <label className="form-label">Biological Sex</label>
            <select className="form-control" name='bio_sex' onChange={this.changePatientInput} value={bio_sex}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Patient Image</label>
            <input className="form-control" type="file" name="image" accept="image/*" onChange={this.changePatientFiles}/>
          </div>
          <div className="d-flex justify-content-evenly align-items-end">
            <button type="button" className="btn btn-outline-secondary" onClick={() => {changeFormState(0)}}>Back</button>
            <button type="submit" className="btn btn-success">Add Patient</button>
          </div>
        </form>
      </>
    )
  }
};

export default NewPatientForm;
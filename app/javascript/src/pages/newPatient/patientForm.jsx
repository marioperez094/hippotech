import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ErrorText from "@components/errorText";
import PatientInput from "./patientInput";

import { safeCredentialsFormData, handleErrors } from "@utils/fetchHelper";
import { errorObject } from "@utils/utils";

class PatientForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    bio_sex: "male",
    date_of_birth: "",
    image: null,
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changePatientFile = (e) => {
    this.setState({
      image: e.target.files[0]
    });
  };

  submitPatient = (e) => {
    if (e) e.preventDefault();

    const { first_name, last_name, bio_sex, date_of_birth, image } = this.state;

    let formData = new FormData();

    if (image) {
      formData.set("patient[image]", image);
    };

    formData.set("patient[first_name]", first_name);
    formData.set("patient[last_name]", last_name);
    formData.set("patient[bio_sex]", bio_sex);
    formData.set("patient[date_of_birth]", date_of_birth);

    fetch("/api/patients", safeCredentialsFormData({
      method: "POST",
      body: formData
    }))
      .then(handleErrors)
      .then(data => {
        if (data.patient) {
          this.props.pushHistory(`/new_patient/admit?patientID=${ data.patient.id }`);
        };
      })
      .catch(error => {
        this.setState({
          error: errorObject(error)
        });
      });
  };

  render() {
    const { first_name, last_name, bio_sex, date_of_birth, error } = this.state;

    return (
      <>
        <h3>Patient Demographics</h3>
        <form 
          className="col-11 shadow p-3 my-5 bg-body rounded"
          onSubmit={ this.submitPatient }
        >
          { error && <ErrorText error={ error } /> }
          <PatientInput
            name="first_name"
            handleChange={ this.handleChange }
            value={ first_name }
            required={ true }
          />
          <PatientInput
            name="last_name"
            handleChange={ this.handleChange }
            value={ last_name }
            required={ true }
          />
          <PatientInput
            name="date_of_birth"
            handleChange={ this.handleChange }
            value={ date_of_birth }
            required={ true }
            type="date"
          />
          <div className="mb-3">
            <label 
              htmlFor="bio-sex"
              className="form-label"
            >
              Biological Sex
            </label>
            <select
              name="bio_sex"
              value={ bio_sex }
              className="form-control"
              onChange={ this.handleChange }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="image"
              className="form-label"
            >
              Patient Image
            </label>
            <input
              className="form-control"
              type="file"
              name="image"
              accept="image/*"
              onChange={ this.changePatientFile }
            />
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <Link
              className="btn btn-outline-secondary"
              to="/new_patient"
            >
              Back
            </Link>
            <button
              type="submit"
              className="btn btn-success"
            >
              Add Patient
            </button>
          </div>
        </form>
      </>
    )
  };
};

function PatientFormWithNavigation() {
  const history = useHistory();

  function pushHistory(link) {
    history.push(link);
  };

  return (
    <PatientForm pushHistory={ pushHistory } />
  )
};

export default PatientFormWithNavigation;
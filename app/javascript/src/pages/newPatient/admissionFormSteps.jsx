import React from "react";

import PatientInput from "./patientInput";
import ErrorText from "@components/errorText";

import { safeCredentials, handleErrors } from "@utils/fetchHelper";
import { errorObject } from "@utils/utils";

class AdmissionFormSteps extends React.Component {
  state = {
    admission: {
      phone_number: "",
      address: "",
      occupation: "",
      admission_diagnosis: "",
      code_status: "Full",
      diet: "",
      emergency_contact_name: "",
      relationship_to_patient: "",
      emergency_contact_number: "",
    },
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      admission: {
        ...this.state.admission,
        [e.target.name]: e.target.value,
      }
    }, () => console.log(this.state.admission));
  };

  submitAdmission = (e) => {
    if (e) e.preventDefault();

    let admission = { ...this.state.admission };
    admission.patient_id = this.props.id

    fetch("/api/admissions", safeCredentials({
      method: "POST",
      body: JSON.stringify(admission)
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data)
      })
      .catch(error => this.setState({
        error: errorObject(error)
      }))
  }

  render() {
    const { admission, error } = this.state;
    const { admissionStep, changeFormState } = this.props;
    const admissionForms = [
      <FormOne 
        handleChange={ this.handleChange } 
        admission={ admission } 
      />,
      <FormTwo
        handleChange={ this.handleChange }
        admission={ admission }
      />, 
      <FormThree
        handleChange={ this.handleChange }
        admission={ admission }
      />,
    ]

    return (
      <form 
        className="col-11 shadow p-3 bg-body rounded"
        onSubmit={ this.submitAdmission }
      >
        { error && <ErrorText error={ error } />}
        { admissionForms[admissionStep] }
        <div className="d-flex justify-content-end">
          { admissionStep > 0 &&
            <button
              className="btn btn-light me-3"
              onClick={ () => changeFormState(-1) }
              type="button"
            >
              Back
            </button>
          }
          { admissionStep < 2 &&
            <button
              className="btn btn-outline-secondary text-end"
              onClick={ () => changeFormState(1) }
              type="button"
            >
              Next
            </button>
          }
          { admissionStep === 2 &&
            <button
              className="btn btn-outline-dark"
              type="submit"
            >
              Submit
            </button>
          }
        </div>
      </form>
    )
  }
};

export default AdmissionFormSteps;

function FormOne(props) {
  const { handleChange, admission } = props;
  const { phone_number, address, occupation } = admission;
  return (
    <>
      <PatientInput
        name="phone_number"
        handleChange={ handleChange }
        value={ phone_number }
        type="number"
      />
      <PatientInput
        name="address"
        handleChange={ handleChange }
        value={ address }
      />
      <PatientInput
        name="occupation"
        handleChange={ handleChange }
        value={ occupation }
      />
    </>
  )
};

function FormTwo(props) {
  const { handleChange, admission } = props;
  const { emergency_contact_name, relationship_to_patient, emergency_contact_number } = admission;
  return (
    <>
      <PatientInput
        name="emergency_contact_name"
        handleChange={ handleChange }
        value={ emergency_contact_name }
      />
      <PatientInput
        name="relationship_to_patient"
        handleChange={ handleChange }
        value={ relationship_to_patient }
      />
      <PatientInput
        name="emergency_contact_number"
        handleChange={ handleChange }
        value={ emergency_contact_number }
        type="number"
      />
    </>
  )
};

function FormThree(props) {
  const { handleChange, admission } = props;
  const { admission_diagnosis, code_status, diet } = admission;
  return (
    <>
      <PatientInput
        name="admission_diagnosis"
        handleChange={ handleChange }
        value={ admission_diagnosis }
      />
      <div className="mb-3">
        <label 
          className="form-label" 
          htmlFor="code_status"
        >
          Code Status
        </label>
        <select 
          className="form-control" 
          name="code_status" 
          onChange={ handleChange } 
          value={code_status}
          id="code_status"
        >
          <option value="Full">Full</option>
          <option value="DNR">Do Not Resuscitate</option>
          <option value="DNI">Do Not Intubate</option>
        </select>
      </div>
      <PatientInput
        name="diet"
        handleChange={ handleChange }
        value={ diet }
      />
    </>
  )
};
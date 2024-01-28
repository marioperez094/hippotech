import React from "react";

import { removeUnderscores } from "@utils/utils";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ErrorText from "@components/errorText"

import { handleErrors } from "@utils/fetchHelper";
import { errorObject } from "@utils/utils"
import PatientSelector from "./patientSelector";

class PatientSearch extends React.Component {
  state = {
    searchRow: "id",
    search: "",
    error: null,
    patients: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  searchPatient = (e) => {
    if (e) e.preventDefault();

    const { search, searchRow } = this.state;

    fetch(`api/patients/search/${ searchRow }/${ search }`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({ 
          patients: data.patients,
          error: "" 
        })
      })
      .catch(error => this.setState({ 
        error: errorObject(error),
        search: "",
        patients: "",
      }))
  };

  render() {
    const { searchRow, search, error, patients } = this.state;

    return (
      <>
        <div className="col-12">
          <h3>Search for Previous Patient</h3>
          <p>If patient has a prior admission, please search for patients. If no prior admission is found, please add a new patient to the system.</p>
        </div>
        <form className="col-12 col-md-9 col-xl-5 shadow p-3 my-5 bg-body" onSubmit={ this.searchPatient } id="patient-search">
          { error && <ErrorText error={error} /> }
          <div className="row gx-0">
            <div className="form-group col-3">
              <select
                className="form-control"
                name="searchRow"
                value={ searchRow }
                onChange={ this.handleChange }
              >
                <option value="id">ID</option>
                <option value="last_name">Last Name</option>
                <option value="first_name">First Name</option>
                <option value="date_of_birth">Date of Birth</option>
              </select>
            </div>
            <div className="form-group col-4">
              <input
                className="form-control"
                name="search"
                placeholder={`Patient ${ removeUnderscores(searchRow) }`}
                value={ search }
                onChange={ this.handleChange }
              />
            </div>
            <div className="form-group text-center col-2">
              <button
                className="btn btn-success"
                type="submit"
              >
                Search
              </button>
            </div>
            <div className="form-group col-3">
              <Link
                className="btn btn-warning"
                type="button"
                to="/new_patient/form"
              >
                New Patient
              </Link>
            </div>
          </div>
        </form>
        { patients &&
          patients.map((patient) => {
            return ( 
              <PatientSelector 
                key={ patient.id }
                patient={ patient } 
              />
            )
          })
        }
      </>
    )
  };
};

export default PatientSearch;
import React from "react";

import { removeUnderscores } from "@utils/utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class PatientSearch extends React.Component {
  state = {
    searchKey: "id",
    search: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { searchKey, search } = this.state;

    return (
      <>
        <div className="col-12">
          <h3>Search for Previous Patient</h3>
          <p>If patient has a prior admission, please search for patients. If no prior admission is found, please add a new patient to the system.</p>
        </div>
        <form className="col-12 col-md-9 col-xl-5 shadow p-3 my-5 bg-body" onSubmit={ this.searchPatient } id="patient-search">
          <div className="row gx-0">
            <div className="form-group col-3">
              <select
                className="form-control"
                name="searchKey"
                value={ searchKey }
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
                placeholder={`Patient ${ removeUnderscores(searchKey) }`}
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
      </>
    )
  };
};

export default PatientSearch;
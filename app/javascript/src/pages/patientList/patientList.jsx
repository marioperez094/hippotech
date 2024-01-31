import React from "react";

import Navbar from "@components/navbar";
import SearchBar from "@components/searchBar";
import SorterButton from "./sorterButton";
import LoadingRing from "@components/loadingRing";
import PatientWidget from "./patientWidget";

import { handleErrors } from "@utils/fetchHelper";

import "./patientList.scss"
import OptionSelect from "./optionSelect";

class PatientList extends React.Component {
  state = {
    admissions: [],
    options: {
      1: "admission_diagnosis",
      2: "diet"
    },
    category: "ID",
    search: "",
    loading: true,
  };

  componentDidMount() {
    fetch("/api/admissions/search/current_admissions")
      .then(handleErrors)
      .then(data => this.setState({
        admissions: data.admissions,
        loading: false
      }))
      .catch(errors => this.setState({
        loading: false
      }))
  };

  changeOption = (e) => {
    this.setState({ options: {
      ...this.state.options,
      [e.target.name]: e.target.value
    }});
  };
  
  render() {
    const { admissions, category, options, loading } = this.state;

    if (loading) {
      return (
        <LoadingRing />
      )
    }

    return (
      <>
        <Navbar>
          <SearchBar />
        </Navbar>
        <main>
          <div className="container-fluid" id="patient-list">
            <div className="row">
              <div className="col-12">
                <table className="table table-responsive patient-list">
                  <thead className="list-header">
                    <tr>
                      <SorterButton 
                        title="ID"
                        category={ category } 
                      />
                      <SorterButton
                        title="Patient"
                        category={ category }
                      />
                      <OptionSelect
                        option={ options[1] }
                        name={ 1 }
                        changeOption={ this.changeOption }
                      />
                      <OptionSelect
                        option={ options[2] }
                        name={2}
                        changeOption={this.changeOption}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    { admissions.length > 0
                      ? admissions.map((admission) => {
                        const { patient } = admission;

                        return (
                          <PatientWidget
                            key={ admission.id }
                            admission={ admission }
                            options={ options }
                            patient={ patient }
                          />
                        )
                      })
                      : <tr><th>No patients found.</th></tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  };

};

export default PatientList;
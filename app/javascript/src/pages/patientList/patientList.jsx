import React from "react";

import Navbar from "@components/navbar";
import SearchBar from "@components/navbar/searchBar";
import SorterButton from "./sorterButton";

import { handleErrors } from "@utils/fetchHelper";

import "./patientList.scss"
import OptionSelect from "./optionSelect";

class PatientList extends React.Component {
  state = {
    admissions: [],
    options: {
      1: "diagnosis",
      2: "diet"
    },
    category: "ID",
    search: "",
    loading: true,
  };

  componentDidMount() {
    fetch("/api/admissions")
      .then(handleErrors)
      .then(data => this.setState({
        admissions: data.admissions
      }, () => console.log(this.state.admissions)))
      .catch(errors => console.log(errors))
  }
  
  render() {
    const { category, options } = this.state;

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
                      />
                      <OptionSelect
                        option={ options[2] }
                        name={ 2 }
                      />
                    </tr>
                  </thead>
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
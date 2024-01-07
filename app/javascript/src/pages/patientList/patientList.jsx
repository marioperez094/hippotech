import React from "react";

import Navbar from '@components/navbar/navbar'
import PatientWidget from "./patientWidget";
import OptionSelect from "./optionSelect";
import LoadingRing from '@components/loadingRing/loadingRing'

import { handleErrors } from "@utils/fetchHelper";

class PatientList extends React.Component {
  state = {
    admissions: [],
    filteredAdmissions: [],
    options: {
      1: 'diagnosis',
      2: 'diet'
    },
    category: '',
    search: '',
    loading: true,
  };

  componentDidMount() {
    this.fetchAdmissions();
  };

  fetchAdmissions = () => {
    fetch('/api/admissions')
      .then(handleErrors)
      .then(data => {

        /*A patient can have multiple admissions and discharges, only current admissions will show up on the list*/
        const admissions = data.admissions.filter((admission) => {
          return !admission.discharge
        })

        this.setState({ 
          admissions,
          filteredAdmissions: admissions,
          loading: false 
        });
      });
  };

  //Changes what information is displayed on list
  changeOption = (e) => {
    this.setState({ options: {
      ...this.state.options,
      [e.target.name]: e.target.value
    }})
  }

  searchAction = (e) => {
    if (e) { e.preventDefault() }

    const { admissions, search } = this.state;
    let filteredAdmissions = admissions.filter((admission) => {
      return admission.patient.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1
    })

    this.setState({ filteredAdmissions, search: '' })

  };

  searchText = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  sortByID = () => {
    const filteredAdmissions = this.state.admissions.sort((a, b) => {
      return a.patient.id - b.patient.id
    })

    this.setState({ filteredAdmissions, category: 'id' })
  }

  sortByLastName = () => {
    const filteredAdmissions = this.state.admissions.sort((a, b) => {
      return a.patient.last_name < b.patient.last_name ? -1 : 1
    })

    this.setState({ filteredAdmissions, category: 'last_name' })
  }

  render() {
    const { category, options, loading, search, filteredAdmissions } = this.state;

    if (loading) {
      return (
        <LoadingRing />
      );
    };

    return (
      <>
        <Navbar search={search} searchText={this.searchText} searchAction={this.searchAction} />
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <table className="table table-responsive patient-list">
                  <thead className="list-header">
                    <tr>
                      <th scope="col">
                        <a onClick={this.sortByID}>
                          ID 
                          <small className={`${category === 'id' ? 'active-arrow' : 'inactive-arrow'}`}>^</small>
                        </a>
                      </th>
                      <th scope="col">
                        <a onClick={this.sortByLastName}>
                          Patient 
                          <small className={`${category === 'last_name' ? 'active-arrow' : 'inactive-arrow'}`}>^
                          </small>
                        </a>
                      </th>
                      <th scope="col">
                        <OptionSelect key={1} option={options[1]} num={1} changeOption={this.changeOption} />
                      </th>
                      <th className="d-none d-md-table-cell" scope="col">
                        <OptionSelect key={2} option={options[2]} num={2} changeOption={this.changeOption}/>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredAdmissions.length > 0
                    ? filteredAdmissions.map((admission) => {
                      const { patient, allergies, histories } = admission;

                      return (
                        <PatientWidget 
                          key={admission.id} 
                          admission={admission}
                          options={options}
                          patient={patient}
                          allergies={allergies}
                          histories={histories}
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
    );
  };
};

export default PatientList;
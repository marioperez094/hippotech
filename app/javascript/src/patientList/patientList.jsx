import React from "react";

import Navbar from '../components/navbar'
import PatientWidget from "./patientWidget";
import OptionSelect from "./optionSelect";

import { handleErrors } from "../utils/fetchHelper";

class PatientList extends React.Component {
  state = {
    admissions: [],
    options: {
      1: 'diagnosis',
      2: 'diet'
    },
    category: '',
  }

  componentDidMount() {
    fetch('/api/admissions')
      .then(handleErrors)
      .then(data => {
        console.log(data)
        const admissions = data.admissions.filter((admission) => { return !admission.discharge })
        this.setState({
          admissions
        })
      })
  }

  sortByID = () => {
    this.setState({ patients: this.state.patients.sort((a, b) => {return a.id - b.id}), category: 'id' });
  }

  sortByLastName = () => {
    this.setState({ patients: this.state.patients.sort((a, b) => { return a.lName < b.lName ? -1 : 1 }), category: 'lName' });
  }

  changeOption = (e) => {
    this.setState({ options: {...this.state.options, [e.target.name]: e.target.value}})
  }

  render() {
    const {admissions, category, options} = this.state;
    return (
      <>
        <Navbar />
        <main>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <table className="table table-responsive patient-list">
                  <thead className="list-header">
                    <tr>
                      <th scope="col">
                        <a onClick={() => this.sortByID()}>
                          ID 
                          <small className={`${category === 'id' ? 'active-arrow' : 'inactive-arrow'}`}>^</small>
                        </a>
                      </th>
                      <th scope="col">
                        <a onClick={() => this.sortByLastName()}>
                          Patient 
                          <small className={`${category === 'lName' ? 'active-arrow' : 'inactive-arrow'}`}>^
                          </small>
                        </a>
                      </th>
                      <th scope="col">
                        <OptionSelect option={options[1]} num={1} changeOption={this.changeOption} />
                      </th>
                      <th className="d-none d-md-table-cell" scope="col">
                        <OptionSelect option={options[2]} num={2} changeOption={this.changeOption}/>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissions.length > 0
                      ? admissions.map((admission) => {
                        return (
                          <PatientWidget 
                            key={admission.patient.patient_id} 
                            admission={admission} 
                            options={options}
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
  }
}

export default PatientList;
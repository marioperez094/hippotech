import React from "react";

import Navbar from '../components/navbar'
import PatientWidget from "./patientWidget";
import OptionSelect from "./optionSelect";

class PatientList extends React.Component {
  state = {
    patients: [{
      id: 1,
      fName: 'John',
      lName: 'Feta',
      gender: 'Male',
      age: 62,
      code: 'Full Code',
      diet: 'Regular',
      diagnosis: 'Shortness of breath',
      admission: '12/06/2023',
    },
    {
      id: 3,
      fName: 'Sam',
      lName: 'Goota',
      gender: 'Male',
      age: 62,
      code: 'DNR',
      diet: 'Diabetic',
      diagnosis: 'Shortness of breath',
      admission: '12/06/2023',
    },
    {
      id: 2,
      fName: 'Jane',
      lName: 'Cheddar',
      gender: 'Female',
      age: 62,
      code: 'Full Code',
      diet: 'Cardiac',
      diagnosis: 'Congestive Heart Failure',
      admission: '12/02/2023',
    }],
    options: {
      1: 'diagnosis',
      2: 'admission'
    },
    category: '',
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
    const {patients, category, options} = this.state;
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
                    {patients.length > 0
                      ? patients.map((patient) => {
                        return (
                          <PatientWidget 
                            key={patient.id} 
                            patient={patient} 
                            options={options}
                          />
                        )
                      })
                      : <p>No patients found.</p> 
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
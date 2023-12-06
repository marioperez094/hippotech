import React from "react";

import Navbar from '../components/navbar'
import PatientWidget from "./patientWidget";
import { sort } from "webpack/lib/dependencies/DependencyReference";

class PatientList extends React.Component {
  state = {
    patients: [{
      id: 1,
      fName: 'John',
      lName: 'Feta',
      gender: 'Male',
      age: 62,
      diagnosis: 'Shortness of breath',
      admission: '12/06/2023',
    },
    {
      id: 3,
      fName: 'Sam',
      lName: 'Goota',
      gender: 'Male',
      age: 62,
      diagnosis: 'Shortness of breath',
      admission: '12/06/2023',
    },
    {
      id: 2,
      fName: 'Jane',
      lName: 'Cheddar',
      gender: 'Female',
      age: 62,
      diagnosis: 'Congestive Heart Failure',
      admission: '12/02/2023',
    }],
    category: 'id',
  }

  sortByID() {
    this.setState({ patients: this.state.patients.sort((a, b) => {return a.id - b.id}), category: 'id'})
  }

  sortByLastName() {
    console.log(this.state.patients.sort((a, b) => { return a.lName < b.lName ? -1 : 1 }))
    this.setState({ patients: this.state.patients.sort((a, b) => { return a.lName < b.lName ? -1 : 1 }), category: 'lName'})
  }

  render() {
    const {patients, category} = this.state;
    return (
      <>
        <Navbar />
        <main>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-1'></div>
              <div className='col-11'>
                <table className="table table-responsive">
                  <thead className="list-header">
                    <tr>
                      <th scope="col"><a onClick={() => this.sortByID()}>ID {category === 'id' ? 'v' : '>'}</a></th>
                      <th scope="col"><a onClick={() => this.sortByLastName()}>Patient {category === 'lName' ? 'v' : '>'}</a></th>
                      <th className="d-none d-md-table-cell" scope="col">Diagnosis</th>
                      <th className="d-none d-md-table-cell" scope="col">Length of Stay</th>
                      <th className="d-md-none">LOS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length > 0
                      ? patients.map((patient) => {
                        return <PatientWidget key={patient.id} patient={patient} />
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
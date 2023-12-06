import React from "react";

import Navbar from '../components/navbar'
import PatientWidget from "./patientWidget";

class PatientList extends React.Component {
  render() {
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
                      <th scope="col">ID</th>
                      <th scope="col">Patient</th>
                      <th className="d-none d-md-table-cell" scope="col">Diagnosis</th>
                      <th className="d-none d-md-table-cell" scope="col">Length of Stay</th>
                      <th className="d-md-none">LOS</th>
                    </tr>
                  </thead>
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
                  <PatientWidget />
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
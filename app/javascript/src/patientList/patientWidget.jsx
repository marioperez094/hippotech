import React from 'react';

import '../patientList/patientList.scss'

class PatientWidget extends React.Component {
  state = {
    patient: {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      age: 62,
      diagnosis: 'Shortness of breath',
      admission: '12/06/2023',
    }
  }
  render() {
    const { patient } = this.state;
    const { id, name, gender, age, diagnosis, admission } = patient;

    return (
      <tbody>
        <tr>
          <th scope='row'>{id}</th>
          <td className='row'>
            <div className='col-12'>
              {name}
            </div>
            <div className='col-12'>
              {age} | {gender}
            </div>
          </td>
          <td className='d-none d-md-table-cell'>{diagnosis}</td>
          <td>{admission}</td>
        </tr>
      </tbody>
    )
  }
}

export default PatientWidget;
import React from 'react';

import '../patientList/patientList.scss'

const PatientWidget = (props) => {

  const { patient, options } = props;
  const { id, fName, lName, gender, age } = patient;

  const redirect = () => {
    location.assign(`/patient/${id}`)
  }

  return (
    <tr onClick={() => redirect()}>
      <th scope='row'>{id}</th>
      <td className='row'>
        <div className='col-12'>
          {lName}, {fName}
        </div>
        <div className='col-12'>
          {age} | {gender}
        </div>
      </td>
      <td>{patient[options[1]]}</td>
      <td className='d-none d-md-table-cell'>{patient[options[2]]}</td>
    </tr>
  )
}

export default PatientWidget;
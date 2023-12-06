import React from 'react';

import '../patientList/patientList.scss'

const PatientWidget = (props) => {

  const { patient } = props;
  const { id, fName, lName, gender, age, diagnosis, admission } = patient;

  return (
    <tr>
      <th scope='row'>{id}</th>
      <td className='row'>
        <div className='col-12'>
          {lName}, {fName}
        </div>
        <div className='col-12'>
          {age} | {gender}
        </div>
      </td>
      <td className='d-none d-md-table-cell'>{diagnosis}</td>
      <td>{admission}</td>
    </tr>
  )
}

export default PatientWidget;
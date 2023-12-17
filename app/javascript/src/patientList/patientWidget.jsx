import React from 'react';

import '../patientList/patientList.scss'
import { differenceInYears } from '../utils/utils'

const PatientWidget = (props) => {

  const { admission, options } = props;
  const { patient } = admission;
  const { id, first_name, last_name, date_of_birth, bio_sex } = patient;

  const redirect = () => {
    location.assign(`/patient/${id}`)
  }

  return (
    <tr onClick={() => redirect()}>
      <th scope='row'>{id}</th>
      <td className='row'>
        <div className='col-12'>
          {last_name}, {first_name}
        </div>
        <div className='col-12'>
          {differenceInYears(date_of_birth)} | {bio_sex}
        </div>
      </td>
      <td>{JSON.stringify(admission[options[1]])}</td>
      <td className='d-none d-md-table-cell'>{admission[options[2]]}</td>
    </tr>
  )
}

export default PatientWidget;
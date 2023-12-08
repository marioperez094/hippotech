import React from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom";

const InputTableRow = (props) => {
  const {title, vitals, inputName, blank, inputChange} = props;

  return (
    <tr>
      <th scope='row'><Link to='/patient/1/temp'>{title}</Link></th>
      {vitals.length > 0 &&
        vitals.map((vital) => { return (
          <td><input name={inputName} className='form-control' value={vital[inputName]} disabled /></td>
        )})
      }
      <td><input name={inputName} className='form-control' value={blank} onChange={(e) => inputChange(e)}/></td>
    </tr>
  )
}

export default InputTableRow;
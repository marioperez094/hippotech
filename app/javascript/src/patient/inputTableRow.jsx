import React from 'react';

const InputTableRow = (props) => {
  const {title, vitals, inputName, blank} = props;

  return (
    <tr>
      <th scope='row'>{title}</th>
      {vitals.length > 0 &&
        vitals.map((vital) => { return (
          <td><input name={inputName} type='number' className='form-control' value={vital[inputName]} disabled /></td>
        )})
      }
      <td><input name={inputName} type='number' className='form-control' value={blank} /></td>
    </tr>
  )
}

export default InputTableRow;
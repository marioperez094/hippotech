import React from "react";

const OptionSelect = (props) => {
  const {option, changeOption, num} = props;
  return (
    <select name={num} value={option} onChange={(e) => changeOption(e)}>
      <option value={'diagnosis'}>Diagnosis</option>
      <option value={'admission'}>Admission Date</option>
      <option value={'diet'}>Diet</option>
      <option value={'code'}>Code Status</option>
    </select>
  )
}

export default OptionSelect;
import React from "react";

const OptionSelect = (props) => {
  const {option, changeOption, num} = props;
  return (
    <select name={num} value={option} onChange={(e) => changeOption(e)}>
      <option value={'diagnosis'}>Diagnosis</option>
      <option value={'diet'}>Diet</option>
      <option value={'codeStatus'}>Code Status</option>
      <option value={'allergies'}>Allergies</option>
      <option value={'histories'}>Past Medical History</option>
    </select>
  )
}

export default OptionSelect;
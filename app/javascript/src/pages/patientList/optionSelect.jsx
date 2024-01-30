import React from "react";

function OptionSelect(props) {
  const { option, name } = props;

  return (
    <th 
      scope="col"
    >
      <select
        className="form-control text-center"
        name={name}
        value={option}
      >
        <option value="admission_diagnosis">
          Diagnosis
        </option>
        <option value="diet">
          Diet
        </option>
        <option value="code_status">
          Code Status
        </option>
        <option value="allergies">
          Allergies
        </option>
        <option value="histories">
          Past Medical History
        </option>
      </select>
    </th>
  )
};

export default OptionSelect;
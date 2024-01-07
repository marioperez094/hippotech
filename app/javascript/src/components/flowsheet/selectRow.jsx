import React from "react";

import { capitalize } from "@utils/utils";

const SelectRow = (props) => {
  const { value, name, options,  disabled, changeNewVital } = props;

  return (
    <div className="vital">
      <select className="form-control" value={value} name={name} onChange={(e) => changeNewVital(e)} readOnly={disabled}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>{capitalize(option)}</option>
          )
        })}
      </select>
    </div>
  )
};

export default SelectRow;
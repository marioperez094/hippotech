import React from "react";

import { capitalize, removeUnderscores } from "@utils/utils";

function PatientInput(props) {
  const { name, handleChange, value, type } = props;

  //Takes away underscores in the name
  const nameTag = removeUnderscores(name)


  return (
    <div className="mb-3">
      <label 
        htmlFor={ name }
        className="form-label"
      >
        { capitalize(nameTag) }
      </label>
      <input
        name={ name }
        type={ type ? type : "text" }
        className="form-control form-control-lg rounded"
        id={ name }
        value={ value }
        onChange={ (e) => handleChange(e) }
        required
      />
    </div>
  )
};

export default PatientInput;
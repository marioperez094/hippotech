import React from "react";

import "./specialInput.scss";
import { capitalize, removeUnderscores } from "../../utils/utils";

function SpecialInput(props) {
  const { name, handleChange, value, type } = props;
  
  //Takes away underscores in the name
  const nameTag = removeUnderscores(name)


  return (
    <>
      <label htmlFor={ nameTag }>
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
    </>
  )
};

export default SpecialInput;
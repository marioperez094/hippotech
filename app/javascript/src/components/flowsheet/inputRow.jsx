import React from "react";

const InputRow = (props) => {
  const { value, name, disabled, changeNewVital } = props;

  return (
    <div className="vital">
      <input 
        className="form-control"
        name={name}
        value={ value } 
        readOnly={ disabled }
        onChange={(e) => changeNewVital(e)}
      />
    </div>
  )
};

export default InputRow;
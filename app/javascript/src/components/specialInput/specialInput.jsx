import React from "react";

import './specialInput.scss'

const SpecialInput = (props) => {
  const { name, handleChange, value } = props;
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="form-group labeled-border col-12 mt-3">
      <label htmlFor={name}>{capitalName}</label>
      <input name={name} type='text' className="form-control form-control-lg rounded" id={name} value={value} onChange={(e) => handleChange(e)} />
    </div>
  )

};

export default SpecialInput;
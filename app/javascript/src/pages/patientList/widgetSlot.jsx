import React from "react";

import './patientList.scss'

const WidgetSlot = (props) => {
  return (
    <span className="widget-text">{props[props.options[props.number]]}</span>
  )
};

export default WidgetSlot
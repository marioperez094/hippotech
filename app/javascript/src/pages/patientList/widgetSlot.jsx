import React from "react";

function WidgetSlot(props) {
  return (
    <span className="widget-text">
      { props[props.options[props.name]] }
    </span>
  )
};

export default WidgetSlot;
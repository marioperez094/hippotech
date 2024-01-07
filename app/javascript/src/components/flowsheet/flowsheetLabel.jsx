import React from "react";

const FlowsheetLabel = (props) => {
  const { title } = props;

  return (
    <div className="vital label-header d-flex align-items-center" id='flowsheet-labels'>
      <p><b>{ title }</b></p>
    </div>
  )
};

export default FlowsheetLabel;
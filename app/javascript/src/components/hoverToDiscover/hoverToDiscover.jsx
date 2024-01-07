import React from "react";

import './hoverToDiscover.scss'

const HoverToDiscover = (props) => {
  const { hoverText } = props;

  return (
    <div className="hover-to-discover">
      {props.children}
      <div className="hover-text-box rounded shadow p-3">
        <p>{hoverText}</p>
      </div>
    </div>
  )
};

export default HoverToDiscover;
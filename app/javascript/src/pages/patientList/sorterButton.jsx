import React from "react";

function SorterButton(props) {
  const { title, category } = props;

  return (
    <th 
      scope="col"
      className="text-center"
    >
      <button
        className="btn"
      >
        { title }
        <small
          className={
            `${category === title
              ? "active-category"
              : "inactive-category"
            }`
          }
        >
          ^
        </small>
      </button>
    </th>
  )
};

export default SorterButton;
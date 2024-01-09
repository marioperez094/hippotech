import React from "react";

const DateSelector = (props) => {
  const { date, changeDate } = props;

  return (
    <div className="col-12 col-md-6 d-flex justify-content-center order-md-2 p-2 p-md-3">
      <button 
        className="btn d-inline"
        onClick={() => changeDate(-1)}
      >
        {'<'}
      </button>
      <h3>{date}</h3>
      <button 
        className="btn d-inline"
        onClick={() => changeDate(1)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default DateSelector;
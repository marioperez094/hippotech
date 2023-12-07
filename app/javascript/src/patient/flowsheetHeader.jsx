import React from "react";

const FlowsheetHeader = (props) => {
  const {date} = props;
  return (
    <>
      <th className="text-center" scope='col'>
        <p>{date[0]}/{date[1]}/{date[2]}</p>
        <p>{date[3]}:{date[4] < 10 ? '0' + date[4] : date[4]}</p>
      </th>
    </>
  )
}

export default FlowsheetHeader;
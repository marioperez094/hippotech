import React from "react";

import { dateFormat } from '@utils/utils'

const FlowsheetHeader = (props) => {
  const { date } = props;
  return (
    <>
      <th scope="col">
        <input className="form-control" value={dateFormat(date)[0]} disabled />
        <input className="form-control" value={dateFormat(date)[1]} disabled />
      </th>
    </>
  )
};

export default FlowsheetHeader;
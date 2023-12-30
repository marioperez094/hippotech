import React from "react";

import { dateFormat } from '@utils/utils'

import './flowsheet.scss'
import FlowsheetHeader from "./flowsheetHeader";
import InputTableRow from "../../pages/patient/inputTableRow";

const FlowsheetTable = (props) => {
  const { vitals } = props;
  return (
    <div className="row">
      <div className="col-6 col-lg-3">
        <div className="temperature">
          <p><b>Temperature</b></p>
        </div>
        <div className="temp-source">
          <p><b>Temperature Source</b></p>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="temperature">
          <input className="form-control" value={vitals[0].temperature} />
        </div>
      </div>
    </div>
  )
};

export default FlowsheetTable;
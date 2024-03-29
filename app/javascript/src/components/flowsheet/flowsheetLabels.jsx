import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import FlowsheetLabel from "./flowsheetLabel";
import HoverToDiscover from "@components/hoverToDiscover/hoverToDiscover";

const FlowsheetLabels = (props) => {
  const { patientID } = props;

  return (
    <div className="col-5 col-md-4 col-lg-2 ps-4 labels">
      <div className="top-label-header">
        <h4>Vitals</h4>
      </div>
      
      <Link to={`/vitalChart?vital=temperature&patientID=${patientID}`}>   
        <FlowsheetLabel title='Temperature' />
      </Link>
      <FlowsheetLabel title='Temp Source' />
        
      <Link to={`/vitalChart?vital=heart_rate&patientID=${patientID}`}>
        <FlowsheetLabel title='Heart Rate' />
      </Link>

        
      <HoverToDiscover hoverText={'Blood Pressure'}>
        <div className="vital label-header d-flex align-items-center blood-pressure">
          <Link to={`/vitalChart?vital=systolic&patientID=${patientID}`}>
            <p><b>Systolic</b></p>
          </Link>
          <p> / </p>
          <Link to={`/vitalChart?vital=diastolic&patientID=${patientID}`}>
            <p><b>Diastolic</b></p>
          </Link>
        </div>
      </HoverToDiscover>
        
        
      <Link to={`/vitalChart?vital=respirations&patientID=${patientID}`}>
        <FlowsheetLabel title='Respirations' />
      </Link>

      <FlowsheetLabel title='Oxygen Source' />
      <FlowsheetLabel title='FiO2' />
      <FlowsheetLabel title='Liters of Oxygen' />

        
      <Link to={`/I&Os?patientID=${patientID}`}>
        <FlowsheetLabel title='Intake' />
      </Link>
        
      <Link to={`/I&Os?patientID=${patientID}`}>
        <FlowsheetLabel title='Output' />
      </Link>
      <FlowsheetLabel title='Additional Info' />
    </div>
  );
};

export default FlowsheetLabels;
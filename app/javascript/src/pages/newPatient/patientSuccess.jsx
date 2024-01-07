import React from "react";
import { capitalize } from "@utils/utils";

const PatientSuccess = (props) => {
  const { patient } = props;
  return (
    <div className="col-11 shadow p-3 my-5 bg-body rounded">
      <h3 className="text-success">Admitting patient</h3>
      <p><b>Patient Name: {patient.first_name} {patient.last_name} ({capitalize(patient.bio_sex[0])})</b></p>
      <p><b>Date of birth: {patient.date_of_birth}</b></p>
    </div>
  )
};

export default PatientSuccess;
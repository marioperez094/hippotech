import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { capitalize, differenceInYears } from "@utils/utils"
import PatientCard from "./patientCard";

function PatientSelector(props) {
  const history = useHistory();
  const { patient } = props;

  return (
    <button
      className="col-8 btn shadow p-3 my-5 bg-body rounded"
      type="button"
      onClick={ () => history.push(`/new_patient/admit?patientID=${ patient.id }`) }
    >
      <PatientCard patient={ patient } />
    </button>
  )
};

export default PatientSelector;
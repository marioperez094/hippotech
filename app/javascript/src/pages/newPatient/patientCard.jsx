import React from "react";

import { capitalize, differenceInYears } from "@utils/utils";

function PatientCard(props) {
  const { first_name, last_name, bio_sex, date_of_birth } = props.patient;

  return (
      <div className="row">
        <div className="col-6 d-flex text-center">
          <p><b>
            Patient Name: { last_name }, { first_name } ({ capitalize(bio_sex) })
          </b></p>
        </div>
        <div className="col-6 d-flex">
          <p className="text-end"><b>
            Date of birth: { date_of_birth } ({ differenceInYears(date_of_birth) })
          </b></p>
        </div>
      </div>
  )
};

export default PatientCard;
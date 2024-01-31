import React from "react";

import WidgetSlot from "./widgetSlot";

import { capitalize, differenceInYears } from "@utils/utils";

function PatientWidget(props) {
  const { admission, patient, options } = props;
  const { admission_diagnosis, code_status, diet } = admission;
  const { id, first_name, last_name, bio_sex, date_of_birth } = patient;

  function redirect() {
    location.assign(`/patient/${ admission.id }`)
  }

  return (
    <tr onClick={ () => redirect() }>
      <th scope="row">
        { id /* A patient can only have one ID but has multiple admission IDs.*/}
      </th>
      <td className="row">
        <div className="col-12">
          { capitalize(last_name) }, { capitalize(first_name) }
        </div>
        <div className="col-12">
          { `${ differenceInYears(date_of_birth) } 
          | 
          ${ bio_sex[0].toUpperCase() }` }
        </div>
      </td>
      <td>
        <WidgetSlot
          options={ options }
          name={ 1 }
          admission_diagnosis={ admission_diagnosis }
          code_status={ code_status }
          diet={ diet }
        />
      </td>
      <td className="d-none d-md-table-cell">
        <WidgetSlot
          options={ options }
          name={ 2 }
          admission_diagnosis={ admission_diagnosis }
          code_status={ code_status }
          diet={ diet }
        />
      </td>
    </tr>
  )
};

export default PatientWidget;
import React from "react";

import { dateFormat } from "@utils/utils";
import { safeCredentials, handleErrors } from '@utils/fetchHelper'

const Discharge = (props) => {
  const { patient, admission } = props;

  const dischargePatient = (e) => {
    if (e) { e.preventDefault() }
    fetch(`/api/admissions/${admission.id}/discharge`, safeCredentials({
      method: 'PUT'
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          location.assign('/patient-list')
        }
      })
  }
  return (
    <form className="p-4" onSubmit={(e) => dischargePatient(e)}>
      <h3 className="text-center text-danger">Warning you are about to discharge this patient:</h3>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input className="form-control" value={patient.last_name} disabled={true} />
      </div>
      
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input className="form-control" value={patient.first_name} disabled={true} />
      </div>

      <div className="mb-3">
        <label className="form-label">Diagnosis</label>
        <input className="form-control" value={admission.diagnosis} disabled={true} />
      </div>

      <div className="mb-3">
        <label className="form-label">Admission Date</label>
        <input className="form-control" value={dateFormat(admission.created_at).join(' ')} disabled={true} />
      </div>

      <div className="mb-3 d-flex justify-content-end">
        <button type="submit" className="btn btn-danger text-end">
          Discharge
        </button>
      </div>
    </form>
  );
};

export default Discharge;
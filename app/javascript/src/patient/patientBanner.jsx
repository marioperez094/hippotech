import React from "react";

import './patient.scss'
import { handleErrors } from "../utils/fetchHelper";

class PatientBanner extends React.Component {

  state = {
    admission: [],
  }
  /**const {patient} = props;
  const {fName, lName, gender, dOB, age, allergies, code, admission, image} = patient;**/

  componentDidMount() {
    fetch(`/api/admission/${1}`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
      })
  }

  render() {
    return (
      <div className="container-fluid patient-banner pt-3">
        <div className="row">
          <div className="col-2" >
            <div className="patient-image rounded" style={{backgroundImage: `url(${image})`}}>
            </div>
            <h3 className="text-center">{lName}, {fName}</h3>
          </div>
          <div className="col-10">
            <div className="row w-100">
              <div className="col-4">
                <p>Allergies: {allergies.length > 0 ? allergies.length : 'NKDA'}</p>
              </div>
              <div className="col-4">
                <p>
                  <span className="d-none d-md-inline">Date of Birth: </span>
                  <span className="d-md-none">DoB: </span> 
                  {dOB}
                </p>
              </div>
              <div className="col-4">
                <p>Gender: {gender}</p>
              </div>
              <div className="col-4">
                <p><span className="d-none d-md-inline">Code status: </span>  {code}</p>
              </div>
              <div className="col-4">
                <p>Age: {age}</p>
              </div>
              <div className="col-4">
                <p><span className="d-none d-md-inline">Admission: </span>  {admission}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default PatientBanner;
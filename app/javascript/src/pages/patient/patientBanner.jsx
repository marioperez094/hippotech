import React from "react";

import { dateFormat, differenceInYears, capitalize, arrayToString, utcConvert } from '@utils/utils'

import './patient.scss'
import HoverToDiscover from "@components/hoverToDiscover/hoverToDiscover";

const PatientBanner = (props) => {
  const { admission, patient, allergies } = props;
  const { code_status, created_at } = admission;
  const { bio_sex, date_of_birth, first_name, last_name, image } = patient;
  const utcDateOfBirth = utcConvert(date_of_birth);

  return (
    <div className="container-fluid patient-banner pt-3">
      <div className="row">
        <div className="col-12 col-md-2" >
          <div className="patient-image rounded" style={{backgroundImage: `url(${image ? image : '/packs/media/images/alexander-maasch-KaK2jp8ie8s-unsplash-fb61587e.jpg'})`}}>
          </div>
          <h3 className="text-center">{capitalize(last_name)}, {capitalize(first_name)}</h3>
        </div>
        <div className="col-12 col-md-10">
          <div className="row w-100">
            <div className="col-4">
              <HoverToDiscover hoverText={arrayToString(allergies)}>
                <p>Allergies: {typeof allergies == 'string' ? allergies : allergies.length}</p>
              </HoverToDiscover>
            </div>
            <div className="col-4">
              <p>
                <span className="d-none d-md-inline">Date of Birth: </span>
                <span className="d-md-none">DoB: </span> 
                {dateFormat(utcDateOfBirth)[0]}
              </p>
            </div>
            <div className="col-4">
              <p>Gender: {capitalize(bio_sex)}</p>
            </div>
            <div className="col-4">
              <p><span className="d-none d-md-inline">Code status: </span>{code_status}</p>
            </div>
            <div className="col-4">
              <p>Age: {differenceInYears(date_of_birth)}</p>
            </div>
            <div className="col-4">
              <p><span className="d-none d-md-inline">Admission: </span> {dateFormat(created_at)[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PatientBanner;
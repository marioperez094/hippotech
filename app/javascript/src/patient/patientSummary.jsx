import React from "react";
import LoadingRing from '../components/loadingRing'

import './patient.scss'

const PatientSummary = (props) => {
  const {patient, loading} = props;
  const { fName, lName, gender, dOB, age, phone, allergies, diagnosis, diet, code, admission, contact, image } = patient;

  if (loading) {
    return (
      <LoadingRing />
    )
  };

  return (
    <div className="container-fluid" id='patient-summary'>
      <div className="row m-1 m-3">
        <div className="col-12 col-md-6 mb-3">
          <div className="general-info text-center">
            General Overview
          </div>
          <div className="shadow general-text">
            <div className="row">
              <div className="col-6">
                <div className="patient-image" style={{backgroundImage: `url(${image})`}}>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <h2>{lName}, {fName}</h2>
                  </div>
                  <div className="col-12">
                    <p><span>Gender: </span>{gender}</p>
                    <p><span>Date of Birth: </span>{dOB} {`${age}yrs`}</p>
                    <p><span>Phone Number: </span>{phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="allergies text-center">
            Allergies
          </div>
          <div className="shadow general-text">
            {allergies.length > 0 
              ? <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">
                        Allergy
                      </th>
                      <th scope='col'>
                        Reaction
                      </th>
                      <th scope="col">
                        Symptoms
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allergies.map((allergy, index) => {
                      return (
                        <tr key={index}>
                          <td>{allergy.name}</td>
                          <td>{allergy.type}</td>
                          <td>{allergy.symptom}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              : <p className="text-center">No Known Drug Allergies</p>
            }
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="current-visit text-center">
            Current Visit
          </div>
          <div className="shadow general-text">
            <div className="row mx-2">
              <div className="col-6">
                <p><span>Diagnosis: </span>{diagnosis}</p>
              </div>
              <div className="col-6">
                <p><span>Admission Date:</span>{admission}</p>
              </div>
              <div className="col-6">
                <p><span>Code Status: </span>{code}</p>
              </div>
              <div className="col-6">
                <p><span>Diet Ordered: </span>{diet}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <div className="emergency-contact text-center">
            Emergency Contact
          </div>
          <div className="shadow general-text">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    Name
                  </th>
                  <th scope='col'>
                    Relationship
                  </th>
                  <th scope="col">
                    Contact #
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{contact.name}</td>
                  <td>{contact.relationship}</td>
                  <td>{contact.number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PatientSummary;
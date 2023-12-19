import React, { useState } from "react";
import LoadingRing from '@components/loadingRing/loadingRing'

import './patient.scss'

import { handleErrors } from '@utils/fetchHelper'
import { capitalize, dateFormat, differenceInYears, utcConvert } from '@utils/utils'

class PatientSummary extends React.Component {
  state = {
    admission: this.props.admission,
    patient: this.props.patient,
    allergies: this.props.allergies,
    histories: this.props.histories,
    loading: this.props.loading,
    pastAdmissions: []
  }

  componentDidMount() {
    fetch(`/api/patients/${this.state.patient.id}/admissions`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          pastAdmissions: data.admissions
        })
      })
  }

  render() {
    const { admission, histories, allergies, patient, loading, pastAdmissions } = this.state;
    const { phone_number, address, diagnosis, created_at, code_status, diet, emergency_contact, emergency_relationship, emergency_phone, occupation } = admission;
    const { id, image, last_name, first_name, bio_sex, date_of_birth } = patient;

    if (loading) {
      return (
        <LoadingRing />
      )
    };
  
    return (
      <div className="container-fluid" id='patient-summary'>
        <div className="row m-1 m-3">

          {/*General patient information*/}
          <div className="col-12 col-md-6 mb-3">
            <div className="general-info text-center">
              General Overview
            </div>
            <div className="shadow general-text pe-2">
              <div className="row">
                <div className="col-6">
                  {/*Patient picture if patient has a picture or uses default picture*/}
                  <div className="patient-image" style={{backgroundImage: `url(${image ? image : '/packs/media/images/anton-8q-U8X1zkvI-unsplash-27accd97.jpg'})`}}>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-12">
                      <h2>{capitalize(last_name)}, {capitalize(first_name)}</h2>
                    </div>
                    <div className="col-12">
                      <p><span>Patient #: </span>{id}</p>
                      <p><span>Gender: </span>{capitalize(bio_sex)}</p>
                      <p><span>Date of Birth: </span>{dateFormat(date_of_birth)[0]} {`(${differenceInYears(date_of_birth)}yrs)`}</p>
                      <p><span>Phone Number: </span>{phone_number}</p>
                      <p><span>Occupation: </span>{capitalize(occupation)}</p>
                      <p><span>Address: </span>{address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Lists all patient allergies*/}
          <div className="col-12 col-md-6 mb-3">
            <div className="allergies text-center">
              Allergies
            </div>
            <div className="shadow general-text">
              {allergies !== 'NKDA'
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
                            <td>{capitalize(allergy.name)}</td>
                            <td>{capitalize(allergy.reaction)}</td>
                            <td>{capitalize(allergy.symptoms)}</td>
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
                  <p><span>Diagnosis: </span>{capitalize(diagnosis)}</p>
                </div>
                <div className="col-6">
                  <p><span>Admission Date:</span>{dateFormat(created_at)[0]} {dateFormat(created_at)[1]}</p>
                </div>
                <div className="col-6">
                  <p><span>Code Status: </span>{capitalize(code_status)}</p>
                </div>
                <div className="col-6">
                  <p><span>Diet Ordered: </span>{capitalize(diet)}</p>
                </div>
              </div>
            </div>
          </div>

          {/*Patient emergency contact*/}
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
                    <td>{emergency_contact}</td>
                    <td>{emergency_relationship}</td>
                    <td>{emergency_phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/*List all patient medical history*/}
          <div className="col-12 col-md-6 mb-3">
            <div className="histories text-center">
              Past Medical History
            </div>
            <div className="shadow general-text">
              {histories !== 'No Past Medical History'
                ? <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">
                          Past diagnosis
                        </th>
                        <th scope='col'>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {histories.map((history, index) => {
                        return (
                          <tr key={index}>
                            <td>{capitalize(history.diagnosis)}</td>
                            <td>{dateFormat(utcConvert(history.diagnosis_date))[0]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                : <p className="text-center">No Past Medical History</p>
              }
            </div>
          </div>

          {/*List all previous admissions*/}
          <div className="col-12 col-md-6 mb-3">
            <div className="admissions text-center">
              Previous Admissions
            </div>
            <div className="shadow general-text">
              {pastAdmissions.length > 1
                ? <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">
                          Past diagnosis
                        </th>
                        <th scope='col'>
                          Admission Date
                        </th>
                        <th scope='col'>
                          Discharge Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastAdmissions.map((admission, index) => {
                        if (!admission.discharge) { return }
                        return (
                          <tr key={index}>
                            <td>{capitalize(admission.diagnosis)}</td>
                            <td>{dateFormat(admission.created_at)[0]} {dateFormat(admission.created_at)[1]}</td>
                            <td>{dateFormat(admission.updated_at)[0]} {dateFormat(admission.updated_at)[1]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                : <p className="text-center">No Previous Admissions</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default PatientSummary;
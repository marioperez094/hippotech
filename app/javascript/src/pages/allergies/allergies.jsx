import React from "react";

import Navbar from '@components/navbar/navbar';
import PatientBanner from "@pages/patient/patientBanner";
import LoadingRing from '@components/loadingRing/loadingRing';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { capitalize, errorObject } from '@utils/utils';

import './allergies.scss'

class Allergies extends React.Component {
  state = {
    admission: {},
    patient: {},
    allergies: 'NKDA',
    loading: true,
    allergy: {
      name: '',
      reaction: 'Mild',
      symptoms: '',
    }, 
    error: null,
  }

  componentDidMount() {
    fetch(`/api/admissions/${this.props.admission_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({ 
          admission: data.admission,
          patient: data.admission.patient,
        }, () => { this.loadAllergies() })
      })
  }

  loadAllergies = () => {
    fetch(`/api/patients/${this.state.patient.id}/allergies`)
    .then(handleErrors)
      .then(data => {
        this.setState({ 
          allergies: data.allergies,
          loading: false
        })
      })
  };

  deleteAllergy = (id) => {
    fetch(`/api/allergies/${id}`, safeCredentials({
      method: 'DELETE'
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          return this.loadAllergies();
        }
      })
  };

  changeAllergyInput = (e) => {
    this.setState({
      allergy: {
        ...this.state.allergy,
        [e.target.name]: e.target.value
      }
    })
  };

  clearAllergy = () => {
    this.setState({
      allergy: {
        name: '',
        reaction: 'Mild',
        symptoms: '',
      }
    })
  }

  submitAllergy = (e) => {
    if (e) { e.preventDefault() }

    let allergy = {...this.state.allergy};
    allergy.patient_id = this.state.patient.id;

    fetch('/api/allergies', safeCredentials({
      method: 'POST',
      body: JSON.stringify(allergy)
    }))
      .then(handleErrors)
      .then(data => {
        if (data.allergy) {
          this.loadAllergies();
          this.clearAllergy();
          this.setState({ error: '' })
        }
      })
      .catch(error => {
        console.log(error.message)
        if (!error.message) {
          return this.setState({ error: 'Cannot submit allergies' })
        }
        this.setState({ 
          error: errorObject(error) 
          })
        })
  }

  render () {
    const { admission, patient, allergies, loading, allergy, error } = this.state;
    const { name, reaction, symptoms } = allergy;

    if (loading) {
      return (
        <LoadingRing />
      );
    };

    return (
      <>
        <Navbar display={'d-none'} />
        <main>
          <PatientBanner admission={admission} patient={patient} allergies={allergies} />
          <div className="container-fluid" id="allergies-page">
            <div className="row">
              <div className="col-11">
                <div className="allergies text-center">
                  Allergies
                </div>
                <div className="shadow general-text">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">
                          Allergy
                        </th>
                        <th scope="col">
                          Reaction
                        </th>
                        <th scope="col">
                          Symptoms
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allergies !== 'NKDA' &&
                        allergies.map((allergy) => {
                          return (
                            <tr key={allergy.id}>
                              <td>{capitalize(allergy.name)}</td>
                              <td>{capitalize(allergy.reaction)}</td>
                              <td>{capitalize(allergy.symptoms)}</td>
                              <td>
                                <button className="btn btn-danger" onClick={() => {this.deleteAllergy(allergy.id)}}>Delete</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-1">
                <button className="btn btn-primary" onClick={() => location.assign(`/patient/${admission.id}/histories`)}>
                  Past Medical History
                </button>
              </div>
              <form className="col-11 py-4 ms-3" onSubmit={this.submitAllergy}>
                { error && <p className="text-danger text-center">{error}</p>}
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label className="form-label">Allergy</label>
                    <input className="form-control" name='name' value={name} onChange={this.changeAllergyInput} />
                  </div>
                  <div className="form-group col-sm-4">
                    <label className="form-label">Reaction</label>
                    <select className="form-control" name="reaction" value={reaction} onChange={this.changeAllergyInput}>
                      <option value='Mild'>Mild</option>
                      <option value='Moderate'>Moderate</option>
                      <option value='Severe'>Severe</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-4">
                    <label className="form-label">Symptoms</label>
                    <input className="form-control" name="symptoms" value={symptoms} onChange={this.changeAllergyInput} />
                  </div>
                </div>
                <div className="mt-2 text-end">
                  <button className="btn btn-success" type="submit">
                    Add Allergy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </>
    )
  }
};

export default Allergies;
import React from "react";

import Navbar from '@components/navbar/navbar';
import PatientBanner from "@pages/patient/patientBanner";
import LoadingRing from '@components/loadingRing/loadingRing';

import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { capitalize, dateFormat, utcConvert, errorObject } from '@utils/utils';

import './histories.scss'

class Histories extends React.Component {
  state = {
    admission: {}, 
    patient: {}, 
    allergies: [],
    histories: 'No Past Medical History',
    loading: true,
    history: {
      diagnosis: '',
      diagnosis_date: '', 
    },
    error: null
  }

  componentDidMount() {
    fetch(`/api/admissions/${this.props.admission_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({ 
          admission: data.admission,
          patient: data.admission.patient,
          allergies: data.admission.patient.allergies,
        }, () => { this.loadHistories() })
      })
  }

  loadHistories = () => {
    fetch(`/api/patients/${this.state.patient.id}/histories`)
    .then(handleErrors)
      .then(data => {
        this.setState({ 
          histories: data.histories,
          loading: false
        })
      })
  };

  deleteHistory = (id) => {
    fetch(`/api/histories/${id}`, safeCredentials({
      method: 'DELETE'
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          return this.loadHistories();
        }
      })
  }

  changeHistoryInput = (e) => {
    this.setState({
      history: {
        ...this.state.history,
        [e.target.name]: e.target.value
      }
    })
  };

  clearHistory = () => {
    this.setState({
      history: {
        diagnosis: '',
        date: ''
      }
    })
  };

  submitHistory = (e) => {
    if (e)  { e.preventDefault() }

    let history = {...this.state.history};
    history.patient_id = this.state.patient.id;

    fetch('/api/histories', safeCredentials({
      method: 'POST',
      body: JSON.stringify(history)
    }))
      .then(handleErrors)
      .then(data => {
        if (data.history) {
          this.loadHistories();
          this.clearHistory();
          this.setState({ error: '' })
        }
      })
      .catch(error => {
        this.setState({ 
          error: errorObject(error) 
        })
      })
  };

  render() {
    const { admission, patient, allergies, loading, histories, history, error } = this.state;
    const { diagnosis, diagnosis_date } = history;

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
          <div className="container-fluid" id="histories-page">
            <div className="row">
              <div className="col-11">
                <div className="histories text-center">
                  Past Medical History
                </div>
                <div className="shadow general-text">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">
                          Past Diagnosis
                        </th>
                        <th scope="col">
                          Diagnosis Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {histories !== 'No Past Medical History' &&
                        histories.map((history) => {
                          const utcHistory = utcConvert(history.diagnosis_date);
                          return (
                            <tr key={history.id}>
                              <td>{capitalize(history.diagnosis)}</td>
                              <td>{dateFormat(utcHistory)[0]}</td>
                              <td>
                                <button className="btn btn-danger" onClick={() => {this.deleteHistory(history.id)}}>Delete</button>
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
                <button className="btn btn-primary" onClick={() => location.assign(`/patient/${admission.id}/allergies`)}>
                  Allergies
                </button>
              </div>
              <form className="col-11 py-4 ms-3" onSubmit={this.submitHistory}>
                { error && <p className="text-danger text-center">{error}</p>}
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="form-label">Diagnosis</label>
                    <input className="form-control" name="diagnosis" value={diagnosis} onChange={this.changeHistoryInput} required />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="form-label">Diagnosis Date</label>
                    <input className="form-control" type="date" name="diagnosis_date" value={diagnosis_date} onChange={this.changeHistoryInput} required />
                  </div>
                  <div className="mt-2 text-end">
                    <button className="btn btn-success" type="submit">
                      Add History
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </>
    )
  }
};

export default Histories;
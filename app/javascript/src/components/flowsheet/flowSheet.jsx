import React from "react";

import FlowsheetTable from "./flowsheetTable";
import LoadingRing from '@components/loadingRing/loadingRing'

import './flowsheet.scss'
import { dateFormat } from '@utils/utils'
import { safeCredentials, handleErrors } from '@utils/fetchHelper'

class Flowsheet extends React.Component {
  state = {
    patient: this.props.patient,
    user_id: null,
    vitals: [],
    dateInMilliseconds: new Date().getTime(),
    loading: true,
  }

  componentDidMount() {
    this.setUser();
    this.loadVitals();
  }

  setUser = () => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (!data.authenticated) { return }
        this.setState({user_id: data.user.id})
      })
      .catch(errors => {
        return console.log(errors)
      })
  }

  changeDay = (plusOrMinus) => {
    //Adds or subtract a full day from the current day 
    let dateInMilliseconds = this.state.dateInMilliseconds + (plusOrMinus * 86400000)
    let currentDate = new Date().getTime()

    if (dateInMilliseconds > currentDate) {
      dateInMilliseconds = currentDate
    }
    this.setState({ dateInMilliseconds })
  }

  loadVitals = () => {
    fetch(`/api/patients/${this.state.patient.id}/vitals`)
      .then(handleErrors)
      .then(data => {
        this.setState({ vitals: data.vitals, loading: false, })
      })
  }
  
  testMultiUpload = () => {
    const {patient, user_id} = this.state
    const vitals = [{
      temperature: 40,
      service_time: '2023-12-23 06:41:00',
      user_id: user_id,
      patient_id: patient.id
    },{
      temperature: 38,
      service_time: '2023-12-23 06:40:00',
      patient_id: patient.id,
      user_id: user_id
  }]

      fetch(`/api/patients/${this.state.patient.id}/vitals`, safeCredentials({
        method: 'POST',
        body: JSON.stringify({vitals})
      }))
      .then(handleErrors)
      .then(data => {
        return console.log(data)
      })
      .catch(errors => {
        return console.log(errors)
      })  
  }

  render() {
    const { user_id, vitals, dateInMilliseconds, loading } = this.state;
    
    if (loading) {
      return (
        <LoadingRing />
      )
    }


    return(

      <div className="row" id="flowsheet">
        <div className="col-12">
          <div className="row p-3">
            <div className='col-12 col-md-3 d-flex justify-content-evenly'>
              <button className="btn btn-primary" disabled={!user_id}>
                Save
              </button>
              <button className="btn btn-danger" disabled={!user_id}>
                Clear
              </button>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <button 
                className="btn d-inline"
                onClick={() => this.changeDay(-1)}
              >
                {'<'}
              </button>
              <h3>{dateFormat(dateInMilliseconds)[0]}</h3>
              <button 
                className="btn d-inline"
                onClick={() => this.changeDay(1)}
              >
                {'>'}
              </button>
            </div>
          </div>
          <FlowsheetTable vitals={vitals} />
        </div>
      </div>
    )
  };

};

export default Flowsheet;


      
      {/*<div className="row" id='flowsheet'>
        <div className="col-12">
          <div className="row">
            <div className='col-12 col-md-3 d-flex justify-content-evenly'>
              <button className="btn btn-primary" disabled={!user_id}>
                Save
              </button>
              <button className="btn btn-danger" disabled={!user_id}>
                Clear
              </button>
            </div>
            <div className="col-12 top-border">
              <div className="row">
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
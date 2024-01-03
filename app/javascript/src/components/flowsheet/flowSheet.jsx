import React from "react";

import FlowsheetTable from "./flowsheetTable";
import LoadingRing from '@components/loadingRing/loadingRing';


import { dateFormat } from '@utils/utils';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './flowsheet.scss';

class Flowsheet extends React.Component {
  state = {
    patient: this.props.patient,
    user_id: null,
    vitals: [],
    filteredVitals: [],
    //Gives the date in mm/dd/yyyy format
    setDate: dateFormat(new Date())[0],
    loading: true,
    vital: {
      service_time: dateFormat(new Date())[1],
      temperature: '',
      temp_source: '',
      heart_rate: '',
      systolic: '',
      diastolic: '',
      respirations: '',
      o2_source: '',
      fio2: '',
      liters: '',
      intake: '',
      output: '',
      comment: ''
    },
  };

  componentDidMount() {
    this.setUser();
    this.loadVitals();
  };

  setUser = () => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (!data.authenticated) { return }
        this.setState({user_id: data.user.id})
      });
  };

  loadVitals = () => {
    fetch(`/api/patients/${this.state.patient.id}/vitals`)
      .then(handleErrors)
      .then(data => {
        this.setState({ vitals: data.vitals, loading: false, }, () => {
          this.filterVitals();
        });
      });
  };

  //Filters vitals based on set date
  filterVitals = () => {
    const { setDate, vitals } = this.state;
    const filteredVitals = vitals.filter((vital) => {
      const serviceTimeInMilli = Date.parse(vital.service_time);
      const setDateInMilli = Date.parse(setDate);
      return (
        serviceTimeInMilli >= setDateInMilli && serviceTimeInMilli < setDateInMilli + 86400000
      );
    });

    this.setState({ filteredVitals });
  };

  changeDay = (plusOrMinus) => {
    //Adds or subtract a full day from the current day 
    let dateInMilliseconds = Date.parse(this.state.setDate) + (plusOrMinus * 86400000)
    let currentDate = new Date().getTime()

    if (dateInMilliseconds > currentDate) {
      dateInMilliseconds = currentDate
    };
    this.setState({ setDate: dateFormat(dateInMilliseconds)[0] }, () => {
      this.filterVitals()
    });
  };

  //Focuses on the new-vital column
  newVitalFocus = () => {
    const newVital = document.getElementById('new-vital');
    newVital.focus();
  };

  changeNewVital = (e) => {
    this.setState({
      vital: {
        ...this.state.vital, 
        [e.target.name]: e.target.value
      }
    });
  };

  clearVital = () => {
    const vital = {
      service_time: dateFormat(new Date())[1],
      temperature: '',
      temp_source: '',
      heart_rate: '',
      systolic: '',
      diastolic: '',
      respirations: '',
      o2_source: '',
      fio2: '',
      liters: '',
      intake: '',
      output: '',
      comment: ''
    };

    this.setState({ vital })
  };

  submitVital = (e) => {
    if (e) { e.preventDefault() }

    let vital = this.state.vital;
    let date = new Date(`${this.state.setDate} ${vital.service_time}`);
    vital.service_time = date;

    fetch(`/api/patients/${this.state.patient.id}/vitals`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({vital})
    }))
    .then(handleErrors)
    .then(data => {
      this.clearVital();
      this.loadVitals();
    })
    .catch(error => {
      return console.log(error.error)
    });  
  };

  render() {
    const { user_id, filteredVitals, vital, setDate, loading } = this.state;
    
    if (loading) {
      return (
        <LoadingRing />
      );
    };

    return(
      <div className="row" id="flowsheet">
        <div className="col-12">
          <div className="row p-3">
            <div className='col-12 col-md-3 d-flex justify-content-evenly'>
              <button className={`btn btn-primary ${!user_id && 'd-none'}`} onClick={(e) => this.submitVital(e)}>
                Save
              </button>
              <button className={`btn btn-danger ${!user_id && 'd-none'}`}>
                Clear
              </button>
              <button onClick={this.newVitalFocus} className="btn btn-success">
                Add Column
              </button>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <button 
                className="btn d-inline"
                onClick={() => this.changeDay(-1)}
              >
                {'<'}
              </button>
              <h3>{setDate}</h3>
              <button 
                className="btn d-inline"
                onClick={() => this.changeDay(1)}
              >
                {'>'}
              </button>
            </div>
          </div>
          <FlowsheetTable patientID={this.state.patient.id} vitals={filteredVitals} vital={vital} changeNewVital={this.changeNewVital} />
        </div>
      </div>
    )
  };

};

export default Flowsheet;
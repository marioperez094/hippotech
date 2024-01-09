import React from "react";

import DateSelector from "./dateSelector";
import FlowsheetLabels from "./flowsheetLabels";
import FlowsheetEmpty from "./flowsheetEmpty";
import FilterVitals from "./filterVitals";

import { dateFormat, errorObject } from "@utils/utils";
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

class FlowsheetTable extends React.Component {
  state = {
    error: null,
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

    let date = this.timeFormat()

    //Returns error if date is incorrect format i.e. time 99:99
    if (isNaN(new Date(date))) {
      console.log(date)
      return this.setState({ error: 'Invalid Date'})
    }

    let vital = this.state.vital;
    vital.service_time = date;

    fetch(`/api/patients/${this.props.patientID}/vitals`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({vital})
    }))
    .then(handleErrors)
    .then(data => {
      this.clearVital();
      this.setState({ error: '' });
      this.props.loadVitals();
    })
    .catch(error => {
      this.clearVital();
      this.setState({ 
        error: errorObject(error) 
      })
    })
  };

  //Fixes time based on user input
  timeFormat = () => {
    const { date } = this.props;
    const { service_time } = this.state.vital;

    //Returns if time has a colon.
    if (service_time.indexOf(':') > -1) {
      return new Date(`${date} ${service_time}`);
    };

    switch(service_time.length) {
      case 1:
      case 2:
        return new Date(`${date} ${service_time}:00`);
      case 3:
        return new Date(`${date} ${service_time[0]}:${service_time.slice(1)}`);
      case 4:  
        return new Date(`${date} ${service_time.slice(0, 2)}:${service_time.slice(2)}`); 
    };
  };

  render() {
    const { vital, error } = this.state;
    const { date, patientID, changeDate, vitals } = this.props;
    return (
      <>
        <DateSelector date={date} changeDate={changeDate} />
        <div className="col-12 col-md-3 p-2 p-md-3 order-md-1 d-flex justify-content-evenly">
          <button 
            className="btn btn-primary"
            onClick={this.submitVital}
          >
            Save
          </button>
          <button 
            className="btn btn-danger"
            onClick={this.clearVital}
          >
            Clear
          </button>
          <button 
            className="btn btn-success"
            onClick={this.newVitalFocus}
          >
            Add Column
          </button>
        </div>
        <div className="col-12 order-3">
          {error && <p className="text-center text-danger">{error}</p>}
          <div className="row scrollable-row flex-nowrap">
            <FlowsheetLabels patientID={patientID} />
            <FlowsheetEmpty vital={vital} changeNewVital={this.changeNewVital} />

            <FilterVitals vitals={vitals} date={date} />
          </div>
        </div>
      </>
    );
  };
};

export default FlowsheetTable;
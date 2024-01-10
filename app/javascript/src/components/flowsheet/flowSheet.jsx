import React from "react";

import FlowsheetTable from "./flowsheetTable";
import LoadingRing from "@components/loadingRing/loadingRing";

import { dateFormat } from "@utils/utils";
import { handleErrors } from "@utils/fetchHelper";

import './flowsheet.scss';

class Flowsheet extends React.Component {
  state = {
    setDate: dateFormat(new Date())[0],
    vitals: [],
    loading: true,
  };
  
  componentDidMount() {
    this.loadVitals();
  };

  loadVitals = () => {
    fetch(`/api/patients/${this.props.patient.id}/vitals`)
      .then(handleErrors)
      .then(data => {
        this.setState({ vitals: data.vitals, loading: false, });
      });
  };

  changeDate = (plusOrMinus) => {
    //Adds or subtracts a full day from the set date
    let dateInMilliseconds = Date.parse(this.state.setDate) + (plusOrMinus * 86400000); //86400000 the number of milliseconds in a day
    let currentDate = new Date().getTime();

    if (dateInMilliseconds > currentDate) {
      dateInMilliseconds = currentDate
    };
    this.setState({ setDate: dateFormat(dateInMilliseconds)[0] })
  };

  render () {
    const { setDate, vitals, loading } = this.state;

    if (loading) {
      return(
        <LoadingRing />
      )
    }

    return (
      <div className="row" id="flowsheet">
        <FlowsheetTable 
          date={setDate} 
          patientID={this.props.patient.id} 
          vitals={vitals}
          loadVitals={this.loadVitals}
          changeDate={this.changeDate}
        />
      </div>
    )
  }

};

export default Flowsheet;
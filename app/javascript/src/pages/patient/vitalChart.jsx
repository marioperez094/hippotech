import React from "react";
import { Chart } from "chart.js/auto";
import 'chartjs-adapter-moment';

import { handleErrors } from '@utils/fetchHelper'
import { vitalsArrayToChart, capitalize, dateFormat } from "@utils/utils";

class VitalChart extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      vitalName: params.get('vital'),
      patientID: params.get('patientID'),
      vitalArray: [],
      loading: true,
    }

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.loadVitals();
  }

  loadVitals = () => {
    fetch(`/api/patients/${this.state.patientID}/vitals`)
      .then(handleErrors)
      .then(data => {

        //Makes an array that organizes the specific vital by date and time. 
        const vitalsToChart = vitalsArrayToChart(data.vitals, this.state.vitalName)
        this.setState({vitalArray: vitalsToChart})
        this.buildChart(vitalsToChart);
      })
  }

  buildChart = (vitals) => {
    const chartRef = this.chartRef.current.getContext("2d");

    this.chart = new Chart(chartRef, {
      type: 'line', 
      data: {
        datasets: [{
          label: this.state.vitalName,
          data: vitals,
        }],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            }
          },
        },
        responsive: true,
      }
    })
  }
  
  render() {
    const { vitalArray, vitalName } = this.state;

    if (vitalArray.length < 1) {
      return (
        <h3 className="text-center">There is no {vitalName.split('_').join(' ')} data that can be graphed.</h3>
      )
    }

    return (
      <div className="row m-5" id='vitalChart'>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <canvas ref={this.chartRef}></canvas>
        </div>
        <div className="table-container">
          <table className="table table-responsive table-hover">
            <tbody>
              <tr>
                <th scope='row'>{capitalize(vitalName)}</th>
                {vitalArray.map((vital, index) => {
                  return (<td key={vital.x + index}>{vital.y}</td>)
                })}
              </tr>
              <tr>
                <th scope="row">Service Time</th>
                {vitalArray.map((vital, index) => {
                  return (<td key={vital.x + index}>{dateFormat(vital.x)[0]} {dateFormat(vital.x)[1]}</td>)
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default VitalChart;
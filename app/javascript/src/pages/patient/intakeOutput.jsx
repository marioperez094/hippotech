import React from "react";
import { Chart } from "chart.js/auto";

import LoadingRing from '@components/loadingRing/loadingRing'

import { handleErrors } from '@utils/fetchHelper'
import { dateFormat } from '@utils/utils'

import './patient.scss'

class IntakeOutput extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state= {
      patientID: params.get('patientID'),
      intake: null,
      output: null,
      iAndOWithTime: [],
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
        const iAndOWithTime = data.vitals.filter((vital) => {
          return vital.intake || vital.output
        })

        this.setState({ iAndOWithTime, loading: false })
        this.sortIntakeOutput(data.vitals);
      })
  }

  sumOfArray = (vitalsArray, vitalName) => {

    //Filters all vitals to only the ones that have intake and or output
    const total = vitalsArray.filter((vital) => {
      return vital[vitalName]

    //Converts array to only have the value
    }).map((vital) => {
      return vital[vitalName]
    }).reduce((vitalSum, vital) => {
      return vitalSum + vital
    })

    return total;
  }

  sortIntakeOutput = (vitalsArray) => {
    const intake = this.sumOfArray(vitalsArray, 'intake');
    const output = this.sumOfArray(vitalsArray, 'output');

    //Forms an array of the total intak and total output of the patient
    const intakeAndOutput = [intake, output];
    this.setState({ intake, output })

    this.buildChart(intakeAndOutput)
  }

  

  buildChart = (intakeAndOutput) => {
    const chartRef = this.chartRef.current.getContext("2d");

    this.chart = new Chart(chartRef, {
      type: 'doughnut', 
      data: {
        datasets: [{
          data: intakeAndOutput,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }],
        labels: [
          'Intake',
          'Output'
        ],
      },
      options: {
        responsive: true,
      }
    })
  }
  
  render() {
    const { intake, output, iAndOWithTime, loading } = this.state;

    if (loading) { 
      return <LoadingRing />
    }

    if (!intake || !output) {
      return (
        <h3 className="text-center">There is no intake or output data that can be graphed.</h3>
      )
    }
    return (
      <div className="row m-5" id='i-o'>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <canvas ref={this.chartRef}></canvas>
        </div>
        <div className="table-container">
          <table className="table table-responsive table-hover">
            <tbody>
              <tr>
                <th scope='row'>Intake</th>
                {iAndOWithTime.map((vital) => {
                  return (<td key={vital.id}>{vital.intake}</td>)
                })}
              </tr>
              <tr>
                <th scope='row'>Output</th>
                {iAndOWithTime.map((vital) => {
                  return (<td key={vital.id}>{vital.output}</td>)
                })}
              </tr>
              <tr>
                <th scope="row">Service Time</th>
                {iAndOWithTime.map((vital) => {
                  return (<td key={vital.id}>{dateFormat(vital.service_time)[0]} {dateFormat(vital.service_time)[1]}</td>)
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default IntakeOutput;
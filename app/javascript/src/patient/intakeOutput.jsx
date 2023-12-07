import React from "react";
import { Chart } from "chart.js/auto";

import './patient.scss'

class IntakeOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      intake: this.props.patient.intake.reduce((sum, value) => { return sum + value.milliliters}, 0),
      output: this.props.patient.output.reduce((sum, value) => { return sum + value.milliliters}, 0),
    }

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart();

  }

  buildChart = () => {
    const {data} = this.state;
    const chartRef = this.chartRef.current.getContext("2d");

    this.chart = new Chart(chartRef, {
      type: 'doughnut', 
      data: {
        datasets: [{
          data: [this.state.intake, this.state.output],
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
    return (
      <div className="row m-5" id='i-o'>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <canvas ref={this.chartRef}></canvas>
        </div>
        <div className="col-12 d-flex justify-content-evenly mt-3">
          <button className="btn btn-outline-secondary">24 Hours</button>
          <button className="btn btn-outline-secondary">Week</button>
          <button className="btn btn-outline-secondary">Length of Stay</button>
        </div>
      </div>
    )
  }
}

export default IntakeOutput;
import React from "react";
import { Chart } from "chart.js/auto";
import 'chartjs-adapter-moment';

class VitalChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart();
  }

  buildChart = () => {
    const chartRef = this.chartRef.current.getContext("2d");

    this.chart = new Chart(chartRef, {
      type: 'line', 
      data: {
        datasets: [{
          label: 'Temperature',
          data: [{
            x: '2023-08-11T22:11:00Z',
            y: 36.7
          },
          {
            x: '2023-07-11T23:11:00Z',
            y: 36.5
          },
          {
            x: '2023-01-11T21:00:00Z',
            y: 35.8
          }],
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
    return (
      <div className="row m-5" id='i-o'>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <canvas ref={this.chartRef}></canvas>
        </div>
      </div>
    )
  }
}

export default VitalChart;
import React from 'react';

import FlowsheetHeader from './flowsheetHeader'
import FlowsheetTable from './inputTableRow';
import InputTableRow from './inputTableRow';

class Flowsheet extends React.Component {
  state = {
    date: new Date(),
    vitals: [{
      temp: 36.5,
      source: 'oral',
      heart: 80,
      bp: [125, 80],
      resp: 18,
      oxygen: ['NC', 2],
      spo2: 98,
      comment: 'Normal vital signs',
      date: [11, 7, 2023, 23, 11]
    },
    {
      temp: 36.7,
      source: 'oral',
      heart: 86,
      bp: [125, 80],
      resp: 18,
      oxygen: ['NC', 2],
      spo2: 98,
      comment: 'Normal vital signs',
      date: [11, 8, 2023, 23, 11]
    }],
    temp: 0,
    source: 'oral',
    heart: 0,
    bp: [0, 0],
    resp: 0,
    oxygen: ['RA', 0],
    spo2: 0,
    comment: ''
  };

  render() {
    const {
      date,
      vitals,
      temp,
      source,
      heart,
      bp,
      resp, 
      oxygen,
      spo2,
      comment
    } = this.state;
    const dateFormat = [date.getMonth() + 1, date.getDate(), date.getFullYear(), date.getHours(), date.getMinutes()]

    return (
      <div className='row' id='flowsheet'>
        <div className='col-12'>
          <table className='table table-responsive table-hover'>
            <thead>
              <tr>
                <th scope='col'>
                  <div className='d-none d-md-flex justify-content-evenly '>
                    <button className='btn btn-success'>Add new column</button>
                    <button className='btn btn-primary'>Save</button>
                    <button className='btn btn-danger'>Clear</button>
                  </div>
                </th>
                {vitals.length > 0 &&
                  vitals.map((vital) => {
                    return (
                      <FlowsheetHeader date={vital.date} />
                    )
                  })
                }
                <FlowsheetHeader date={dateFormat} />
              </tr>
            </thead>
            <tbody>
              <InputTableRow title='Temperature' inputName='temp' vitals={vitals} blank={temp}/>
              <InputTableRow title='Heart Rate' inputName='heart' vitals={vitals} blank={heart}/>
              <InputTableRow title='Respirations' inputName='resp' vitals={vitals} blank={heart}/>
              <InputTableRow title='Oxygen Saturation%' inputName='spo2' vitals={vitals} blank={spo2}/>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Flowsheet;
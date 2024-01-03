import React from 'react';

import FlowsheetHeader from './flowsheetHeader'
import InputTableRow from './inputTableRow';

class Flowsheet extends React.Component {
  state = {
    date: new Date(),
    vitals: [{
      temp: 36.5,
      source: 'oral',
      heart: 80,
      systolic: 125,
      diastolic: 80,
      resp: '',
      oxygen: 'NC',
      liters: 2,
      spo2: 98,
      intake: 250,
      output: 400,
      comment: 'Normal vital signs',
      date: [11, 7, 2023, 23, 11]
    },
    {
      temp: 36.5,
      source: 'oral',
      heart: 80,
      systolic: 125,
      diastolic: 80,
      resp: '',
      oxygen: 'NC',
      liters: 2,
      spo2: 98,
      intake: 250,
      output: 400,
      comment: 'Normal vital signs',
      date: [11, 7, 2023, 23, 11]
    },
    
    {
      temp: 36.5,
      source: 'oral',
      heart: 80,
      systolic: 125,
      diastolic: 80,
      resp: '',
      oxygen: 'NC',
      liters: 2,
      spo2: 98,
      intake: 250,
      output: 400,
      comment: 'Normal vital signs',
      date: [11, 7, 2023, 23, 11]
    },
    
    {
      temp: 36.5,
      source: 'oral',
      heart: 80,
      systolic: 125,
      diastolic: 80,
      resp: '',
      oxygen: 'NC',
      liters: 2,
      spo2: 98,
      intake: 250,
      output: 400,
      comment: 'Normal vital signs',
      date: [11, 7, 2023, 23, 11]
    },
    
    {
      temp: 36.5,
      source: 'oral',
      heart: 80,
      systolic: 125,
      diastolic: 80,
      resp: '',
      oxygen: 'NC',
      liters: 2,
      spo2: 98,
      intake: 250,
      output: 400,
      comment: 'Normal vital signs',
      date: [11, 7, 2023, 23, 11]
    },
    {
      temp: 36.7,
      source: 'oral',
      heart: 86,
      systolic: 125,
      diastolic: 80,
      resp: 18,
      oxygen: 'NC',
      liters: 2,
      spo2: 98,
      intake: 250,
      output: 400,
      comment: 'Normal vital signs',
      date: [11, 8, 2023, 22, 11]
    }],
    temp: '',
    source: 'oral',
    heart: '',
    systolic: '',
    diasgolic: '',
    resp: '',
    oxygen: 'RA',
    liters: '',
    spo2: '',
    intake: '',
    output: '',
    comment: ''
  };

  inputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {
      date,
      vitals,
      temp,
      source,
      heart,
      systolic,
      diastolic,
      resp, 
      oxygen,
      liters,
      spo2,
      intake,
      output,
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
                    <button className='btn btn-primary'>Save</button>
                    <button className='btn btn-danger'>Clear</button>
                  </div>
                </th>
                {vitals.length > 0 &&
                  vitals.map((vital, index) => {
                    return (
                      <FlowsheetHeader key={index} date={vital.date} />
                    )
                  })
                }
                <FlowsheetHeader date={dateFormat} />
              </tr>
            </thead>
            <tbody>
              <InputTableRow title='Temperature' inputName='temp' vitals={vitals} blank={temp} inputChange={this.inputChange} />
              <tr>
                <th scope='row'>Temperature Source</th>
                {vitals.length > 0 && 
                  vitals.map((vital, index) => { return (
                    <td key={index}>
                      <select name='source' className='form-control' value={vital.source} disabled>
                        <option value='oral'>Oral</option>
                        <option value='temporal'>Temporal</option>
                        <option value='axillary'>Axillary</option>
                      </select>
                    </td>
                  )})
                }
                <td>
                  <select name='source' className='form-control' value={source} onChange={this.inputChange}>
                    <option value='oral'>Oral</option>
                    <option value='temporal'>Temporal</option>
                    <option value='axillary'>Axillary</option>
                  </select>
                </td>
              </tr>
              <InputTableRow title='Heart Rate' inputName='heart' vitals={vitals} blank={heart} inputChange={this.inputChange}/>
              <tr>
                <th scope='row'>Blood Pressure</th>
                  {vitals.length > 0 && 
                    vitals.map((vital, index) => { return (
                      <td key={index}>
                        <input name='systolic' className='form-control bp-form' value={vital.systolic} disabled />
                        /
                        <input name='diastolic' className='form-control bp-form' value={vital.diastolic} disabled />
                      </td>
                    )})
                  }
                <td>
                  <input name='systolic' className='form-control bp-form' value={systolic} onChange={this.inputChange}/>
                  /
                  <input name='diastolic' className='form-control bp-form' value={diastolic} onChange={this.inputChange}/>
                </td>
              </tr>
              <InputTableRow title='Respirations' inputName='resp' vitals={vitals} blank={resp} inputChange={this.inputChange}/>
              <tr>
                <th scope='row'>Oxygen source</th>
                {vitals.length > 0 && 
                  vitals.map((vital, index) => { return (
                    <td key={index}>
                      <select name='oxygen' className='form-control' value={vital.oxygen} disabled >
                        <option value={'RA'}>Room Air</option>
                        <option value={'NC'}>Nasal Cannula</option>
                        <option value={'OM'}>Oxygen Mask</option>
                        <option value={'NRB'}>Non-Rebreather</option>
                        <option value={'V'}>Ventilator</option>
                      </select>
                    </td>
                  )})
                }
                <td>
                  <select name='oxygen' className='form-control' value={oxygen} onChange={this.inputChange}>
                    <option value={'RA'}>Room Air</option>
                    <option value={'NC'}>Nasal Cannula</option>
                    <option value={'OM'}>Oxygen Mask</option>
                    <option value={'NRB'}>Non-Rebreather</option>
                    <option value={'V'}>Ventilator</option>
                  </select>
                </td>
              </tr>
              <InputTableRow title='Liters/Minute' inputName='liters' vitals={vitals} blank={liters} inputChange={this.inputChange}/>
              <InputTableRow title='Oxygen Saturation%' inputName='spo2' vitals={vitals} blank={spo2} inputChange={this.inputChange}/>
              <InputTableRow title='Intake' inputName='intake' vitals={vitals} blank={intake} inputChange={this.inputChange}/>
              <InputTableRow title='Output' inputName='output' vitals={vitals} blank={output} inputChange={this.inputChange}/>
              <InputTableRow title='Additional Info' inputName='comment' vitals={vitals} blank={comment} inputChange={this.inputChange}/>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Flowsheet;
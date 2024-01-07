import React from "react";

import InputRow from './inputRow'
import SelectRow from "./selectRow";

const FlowsheetEmpty = (props) => {
  const { vital, changeNewVital } = props;
  const { service_time, temperature, temp_source, heart_rate, systolic, diastolic, respirations, o2_source, fio2, liters, intake, output, comment } = vital;

  const tempOptions = ['oral', 'temporal', 'axillary', 'core']
  const o2SourceOptions = ['room air', 'nasal cannula', 'oxygen mask', 'non-rebreather', 'ventilator']

  return (
    <div className="col-6 col-lg-3">
      <div className="top-label-header">
        <input className="form-control" name='service_time' value={service_time} onChange={(e) => changeNewVital(e)} id="new-vital"/>
      </div>
      <InputRow value={temperature} name='temperature' changeNewVital={changeNewVital} />
      <SelectRow value={temp_source} options={tempOptions} name='temp_source' changeNewVital={changeNewVital} />
      <InputRow value={heart_rate} name='heart_rate' changeNewVital={changeNewVital} />
      <div className="vital blood-pressure">
        <input className="form-control bp-form" value={systolic} name='systolic' onChange={(e) => changeNewVital(e)} />
        <span className="d-none d-md-inline"> / </span>
        <input className="form-control bp-form" value={diastolic} name='diastolic' onChange={(e) => changeNewVital(e)} />
      </div>
      <InputRow value={respirations} name='respirations' changeNewVital={changeNewVital} />
      <SelectRow value={o2_source} options={o2SourceOptions} name='o2_source' changeNewVital={changeNewVital} />
      <InputRow value={fio2} name='fio2' changeNewVital={changeNewVital} />
      <InputRow value={liters} name='liters' changeNewVital={changeNewVital} />
      <InputRow value={intake} name='intake' changeNewVital={changeNewVital} />
      <InputRow value={output} name='output' changeNewVital={changeNewVital} />
      <InputRow value={comment} name='comment' changeNewVital={changeNewVital} />
    </div>
  )
};

export default FlowsheetEmpty;
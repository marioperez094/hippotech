import React, { useState } from "react";


import InputRow from './inputRow';
import SelectRow from "./selectRow";
import HoverToDiscover from '@components/hoverToDiscover/hoverToDiscover'

import { dateFormat } from '@utils/utils';

const FlowsheetTimeSlot = (props) => {
  const { vital } = props;
  const { service_time, temperature, temp_source, heart_rate, systolic, diastolic, respirations, o2_source, fio2, liters, intake, output, comment } = vital;

  const tempOptions = ['oral', 'temporal', 'axillary', 'core']
  const o2SourceOptions = ['room air', 'nasal cannula', 'oxygen mask', 'non-rebreather', 'ventilator']

  return (
    <div className="col-6 col-lg-3">
      <div className="top-label-header">
        <h4>{dateFormat(service_time)[1]}</h4>
      </div>
      <InputRow value={temperature} disabled={true} />
      <SelectRow value={temp_source} options={tempOptions} disabled={true} />
      <InputRow value={heart_rate} disabled={true} />
      <div className="vital blood-pressure">
        <input className="form-control bp-form" value={systolic} readOnly/>
        <span className="d-none d-md-inline"> / </span>
        <input className="form-control bp-form" value={diastolic} readOnly/>
      </div>
      <InputRow value={respirations} disabled={true} />
      <SelectRow value={o2_source} options={o2SourceOptions} disabled={true} />
      <InputRow value={fio2} disabled={true} />
      <InputRow value={liters} disabled={true} />
      <InputRow value={intake} disabled={true} />
      <InputRow value={output} disabled={true} />
      <HoverToDiscover hoverText={comment}>
        <InputRow value={comment} disabled={true} />
      </HoverToDiscover>
    </div>
  )
};

export default FlowsheetTimeSlot;
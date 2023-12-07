import React from 'react'
import ReactDOM from 'react-dom'
import Patient from './patient';


document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Patient patient_id={data.patient_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
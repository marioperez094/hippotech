import React from 'react'
import ReactDOM from 'react-dom'
import Patient from './patient';


document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Patient admission_id={data.admission_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
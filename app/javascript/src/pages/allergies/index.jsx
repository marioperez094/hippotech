import React from 'react'
import ReactDOM from 'react-dom'
import Allergies from './allergies';


document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Allergies admission_id={data.admission_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
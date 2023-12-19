import React from 'react'
import ReactDOM from 'react-dom'
import PatientList from './patientList'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PatientList />,
    document.body.appendChild(document.createElement('div')),
  )
})
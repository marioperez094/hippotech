import React from 'react'
import ReactDOM from 'react-dom'
import NewPatient from './newPatient'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <NewPatient />,
    document.body.appendChild(document.createElement('div')),
  )
})
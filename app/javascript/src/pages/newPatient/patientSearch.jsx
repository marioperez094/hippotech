import React from 'react';

import { differenceInYears, capitalize } from '@utils/utils'

const PatientSearch = (props) => {
  const { patient, search, searchPatient, changeFormState, changeSearchInput, error } = props;

  return (
    <>
      <h3>Search for Previous Patient</h3>
      <p>If patient has been admitted before, search for patient. Otherwise, establish a new patient.</p>
      <form className='col-11 col-md-5 shadow p-3 my-5 bg-body rounded d-flex' onSubmit={(e) => searchPatient(e)}>
        <input 
          className='form-control me-2' 
          type='number' 
          placeholder='Patient ID'
          value={search} 
          onChange={(e) => {changeSearchInput(e)}} 
        />
        <button 
          className='btn btn-success me-2'
          type='submit'
        >
          Search
        </button>
        <button
          className='btn btn-warning'
          type='button'
          onClick={() => {changeFormState(1)}}
        >
          Establish New Patient
        </button>
      </form>

      {patient &&
        <>
          <p>Is this the correct patient?</p>
          <button 
            className='col-8 btn shadow p-3 my-5 bg-body rounded'
            type='button'
            onClick={() => {changeFormState(2)}}
          >
            <div className='row'>
              <div className='offset-2 col-3 d-flex text-center'>
                <p>
                  Name: {patient.last_name}, {patient.first_name} ({capitalize(patient.bio_sex)})
                </p>
              </div>
              <div className='col-3 d-flex'>
                <p className='text-end'>Date of birth: {patient.date_of_birth} ({differenceInYears(patient.date_of_birth)})</p>
              </div>
            </div>
          </button>
        </>
      }
      {error &&
        <p className='text-danger'>{error}</p>
      }
    </>
  )
};

export default PatientSearch;
import React, { useState } from "react";

const PatientForm = (props) => {
  const [formNum, setFormNum] = useState(0);
  const arrayTitle = ['General Overview', 'History', 'Current Visit'];

  const {patient, handleChange} = props;

  const {
    fName,
    lName,
    gender,
    dOB,
    age,
    allergies,
    code,
    diet,
    diagnosis,
    history,
    admission,
    phone,
    emergencyName,
    emergencyRelationship,
    emergencyNumber,
    image
  } = patient;

  return (
    <>
      <h3>{arrayTitle[formNum]}</h3>
      <form className="col-11 shadow p-3 my-5 bg-body rounded">
        {
          formNum === 0 &&
          <>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input className="form-control" name='fName' onChange={(e) => handleChange(e)} value={fName}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input className="form-control" name='lName' onChange={(e) => handleChange(e)} value={lName}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input className="form-control" type='date' name='dOB' onChange={(e) => handleChange(e)} value={dOB}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Biological Sex</label>
              <select className="form-control" name='lName' onChange={(e) => handleChange(e)} value={gender}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input className="form-control" name='phone' onChange={(e) => handleChange(e)} value={phone}/>
            </div>
            <div className="text-end">
              <NextButton setFormNum={setFormNum} />
            </div>
          </>
        }
        {formNum === 1 &&
          <>
            <div className="mb-3">
              <label className="form-label">Allergies</label>
              <select className='form-control' name='allergies' onChange={(e) => handleChange(e)} value={allergies} multiple>
                <option value='Penicillin'>Penicillin</option>
                <option value='Vancomycin'>Vancomycin</option>
                <option value='Metformin'>Metformin</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Chief Complaint</label>
              <input className="form-control" name='admission' onChange={(e) => handleChange(e)} value={admission}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Past Medical History</label>
              <select className='form-control' name='history' onChange={(e) => handleChange(e)} value={history} multiple>
                <option value='Diabetes'>Diabetes</option>
                <option value='Hypertension'>Hypertension</option>
                <option value='Chronic Obstructive Pulmonary Disease'>Chronic Obstructive Pulmonary Disease</option>
              </select>
            </div>
            <div className="d-flex justify-content-evenly align-items-end">
              <PrevButton setFormNum={setFormNum} />
              <NextButton setFormNum={setFormNum} />
            </div>
          </>
        }
        {formNum === 2 &&
          <>
            <div className="mb-3">
              <label className="form-label">Chief Complaint</label>
              <input className="form-control" name='diagnosis' onChange={(e) => handleChange(e)} value={diagnosis}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Diet Order</label>
              <input className="form-control" name='diet' onChange={(e) => handleChange(e)} value={diet}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Code Status</label>
              <input className="form-control" name='code' onChange={(e) => handleChange(e)} value={code}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Emergency Contact</label>
              <input className="form-control" name='emergencyName' onChange={(e) => handleChange(e)} value={emergencyName}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Relationship</label>
              <input className="form-control" name='emergencyRelationship' onChange={(e) => handleChange(e)} value={emergencyRelationship}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input className="form-control" name='emergencyNumber' onChange={(e) => handleChange(e)} value={emergencyNumber}/>
            </div>
            <div className="mb-3">
              <input
                type='file'
                id='images'
                name='images'
                accept='images/*'
                multiple
              />
            </div>
            <div className="d-flex justify-content-evenly align-items-end">
              <PrevButton setFormNum={setFormNum} />
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </>
        }
      </form>
    </>
  )
};

const NextButton = (props) => {
  const { setFormNum } = props;
  return (
    <button type='button' className='btn btn-outline-secondary' onClick={() => setFormNum(prevCount => prevCount + 1)}>Next</button>
  )
}

const PrevButton = (props) => {
  const { setFormNum } = props;
  return(
    <button type='button' className='btn btn-light me-auto' onClick={() => setFormNum(prevCount => prevCount - 1)}>Back</button>
  ) 
}

export default PatientForm;
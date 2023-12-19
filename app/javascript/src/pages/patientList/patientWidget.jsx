import React from 'react';

import LoadingRing from '@components/loadingRing/loadingRing';
import WidgetSlot from './widgetSlot';

import { differenceInYears, utcConvert, capitalize, arrayToString } from '@utils/utils'

import './patientList.scss'

class PatientWidget extends React.Component {
  state = {
    admission: this.props.admission,
    patient: this.props.patient,
    allergies: this.props.allergies,
    histories: this.props.histories,
  }

  componentDidMount() {
    const { allergies, histories } = this.state;

    //Converts complex array into a string for rendering on list page
    this.setState({
      allergies: arrayToString(allergies),
      histories: arrayToString(histories),
    })
  }

  redirect = () => {
    //Redirects to current admission 
    location.assign(`/patient/${this.state.admission.id}`)
  }

  render() {
    const { admission, patient, loading, allergies, histories } = this.state;
    const { diagnosis, code_status, diet } = admission;

    if (loading) {
      return (
        <LoadingRing />
      );
    };

    //Patient must be loaded
    const { id, first_name, last_name, bio_sex } = patient;

    //UTC convert adds timezone difference to prevent UTC conversion
    const date_of_birth = utcConvert(patient.date_of_birth);

    return (
      <tr onClick={this.redirect}>
        <th scope='row'>{
          id //A patient can only have one ID but can have multiple admission IDs. Patient ID serves as an account number.
        }</th>
        <td className='row'>
          <div className='col-12'>
            {capitalize(last_name)}, {capitalize(first_name)}
          </div>
          <div className='col-12'>
            {
              differenceInYears(date_of_birth) //Calculates age of patient
            } | {
              bio_sex[0].toUpperCase()
            }
          </div>
        </td>
        <td>
          <WidgetSlot 
            options={this.props.options}
            number={1}
            diagnosis={diagnosis}
            diet={diet}
            codeStatus={code_status}
            allergies={allergies}
            histories={histories}
          />
        </td>
        <td className='d-none d-md-table-cell'>
          <WidgetSlot 
            options={this.props.options}
            number={2}
            diagnosis={diagnosis}
            diet={diet}
            codeStatus={code_status}
            allergies={allergies}
            histories={histories}
          />
        </td>
      </tr>
    )
  }
};

export default PatientWidget;
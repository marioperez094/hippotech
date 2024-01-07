import React from "react";

import { handleErrors } from '@utils/fetchHelper'
import { capitalize } from '@utils/utils'

class VitalPopup extends React.Component {
  state = {
    vital: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/vitals/${this.props.vitalID}`)
      .then(handleErrors)
      .then(data => {
        this.setState({vital: data.vital, loading: false }, () => {console.log(this.state.vital)})
      })
  }

  render() {
    const { vitalName } = this.props;
    const { vital, loading } = this.state;

    if (loading) {
      return 
    }

    return (
      <div className="vital-popup rounded shadow p-3">
        <div>
          <p>{capitalize(vitalName)}: { vital[vitalName] }</p>
          <p><small>Charted by: <i>{vital.user.last_name} {vital.user.first_name}</i></small></p>
        </div>
      </div>
    )
  }

};

export default VitalPopup;
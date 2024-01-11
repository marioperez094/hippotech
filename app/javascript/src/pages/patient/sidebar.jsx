import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import SidebarTab from "./sidebarTab";

const Sidebar = (props) => {
  const [menu, setMenu] = useState(true)

  return (
    <div id="sidebar">
      <div className="row gx-0">
        <div className="col-12">
          <button className="btn menu-border w-100" onClick={() => setMenu(!menu)}>
            Menu
          </button>
        </div>
      </div>
      <div className={`d-md-block ${menu ? '' : 'd-none'} sidebar-bg`}>
        <SidebarTab name={ 'Patient Summary' } link={ `/patient/${props.id}` } setMenu={ setMenu } />
        <SidebarTab name={ 'Flowsheet' } link={ `/patient/${props.id}/flowsheet` } setMenu={ setMenu } />
        <SidebarTab name={ 'Intake/Output' } link={ `/I&Os?patientID=${props.patientID}` } setMenu={ setMenu } />
        <SidebarTab name={ 'Discharge' } link={ `/patient/${props.id}/discharge` } setMenu={ setMenu } />
        <div className="col-12">
          <a href={ `/patient/${props.id}/allergies` } onClick={() => setMenu(false)}>
            <div className="bg-white d-flex justify-content-center align-items-center mx-2">
              Allergies
            </div>
          </a>
        </div>
        <div className="col-12">
          <a href={ `/patient/${props.id}/histories` } onClick={() => setMenu(false)}>
            <div className="bg-white d-flex justify-content-center align-items-center mx-2">
              Past Medical History
            </div>
          </a>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
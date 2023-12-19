import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

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
      <div className="col-12">
          <Link to={`/patient/${props.id}`} onClick={() => setMenu(false)}>
            <div className="bg-white mx-2 d-flex justify-content-center align-items-center">
              Patient Summary
            </div>
          </Link>
        </div>
        <div className="col-12">
          <Link to={`/patient/${props.id}/flowsheet`} onClick={() => setMenu(false)}>
            <div className="bg-white mx-2 d-flex justify-content-center align-items-center">
              Flowsheet
            </div>
          </Link>
        </div>
        <div className="col-12">
          <Link to={`/patient/${props.id}/I&Os`} onClick={() => setMenu(false)}>
            <div className="bg-white mx-2 d-flex justify-content-center align-items-center">
              Intake/Output
            </div>
          </Link>
        </div>
        <div className="col-12">
          <Link to={`/patient/${props.id}/discharge`} onClick={() => setMenu(false)}>
            <div className="bg-white mx-2 d-flex justify-content-center align-items-center">
              Discharge
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
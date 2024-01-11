import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const SidebarTab = (props) => {
  const { link, name, setMenu } = props;

  return (
    <div className="col-12">
      <Link to={ link } onClick={() => setMenu(false)}>
        <div className="bg-white d-flex justify-content-center align-items-center mx-2">
          { name }
        </div>
      </Link>
    </div>
  )
};

export default SidebarTab;
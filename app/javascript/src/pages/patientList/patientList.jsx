import React from "react";

import Navbar from "@components/navbar";
import SearchBar from "@components/navbar/searchBar";

class PatientList extends React.Component { 
  
  render() {
    return (
      <>
        <Navbar>
          <SearchBar />
        </Navbar>
        <div>Hi</div>
      </>
    )
  }

};

export default PatientList;
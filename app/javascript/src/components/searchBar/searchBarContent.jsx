import React from "react";

import { removeUnderscores } from "@utils/utils";

import "./searchBar.scss"

function SearchBarContent(props) {
  const { handleChange, searchRow, search } = props;
  return (
    <>
      <div className="form-group col-3">
        <select
          className="form-control"
          name="searchRow"
          value={ searchRow }
          onChange={ handleChange }
        >
          <option value="id">ID</option>
          <option value="last_name">Last Name</option>
          <option value="first_name">First Name</option>
          <option value="date_of_birth">Date of Birth</option>
        </select>
      </div> 
      <div className="form-group col-4">
        <input
          className="form-control"
          name="search"
          placeholder={ `Patient ${ removeUnderscores(searchRow) }` }
          value={ search }
          type={
            searchRow === "date_of_birth"
              ? "date"
              : "text"
          }
          onChange={ handleChange }
        />
      </div>
      <div className="form-group text-center col-2">
        <button
          className="btn btn-success"
          type="submit"
        >
          Search
        </button>
      </div>
    </>
  )
};

export default SearchBarContent;
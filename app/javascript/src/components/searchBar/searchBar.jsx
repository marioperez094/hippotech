import React from "react";

import SearchBarContent from "./searchBarContent";

import { removeUnderscores } from "@utils/utils";

import "./searchBar.scss"

function SearchBar(props) {
  const { handleChange, search } = props;
  const searchRow= "id"

  return (
    <>
      <li className="nav-item dropstart d-none d-md-inline-block">
        <HoverSearch
          handleChange={ handleChange }
          searchRow={ searchRow }
          search={ search }
        />
      </li>
      <li className="nav-item dropdown d-md-none">
        <HoverSearch
          handleChange={ handleChange }
          searchRow={ searchRow }
          search={ search }
        />
      </li>
    </>
  )
};

export default SearchBar;

function HoverSearch(props) {
  const { handleChange, searchRow, search } = props;
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        id="searchDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Search
      </a>
      <ul 
        className="dropdown-menu"
        aria-labelledby="searchDropdown"
      >
        <form 
          className="d-flex nav-search"
        >
          <div className="col-3" />
          <SearchBarContent
            handleChange={ handleChange }
            searchRow={ searchRow }
            search={ search } 
          />
        </form>
      </ul>
    </>
  )
};
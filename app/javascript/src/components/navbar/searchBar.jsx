import React from "react";

import SearchBarContent from "@components/searchBarContent";

function SearchBar(props) {
  const { handleChange, search } = props;
  const searchRow= "id"

  return (
    <form className="me-3 d-flex search-box order-md-1">
      <div className="row gx-0" id="search-row">
        <SearchBarContent
          handleChange={handleChange}
          searchRow={searchRow}
          search={search}
        />
      </div>
      <button className="btn btn-outline-success search-btn" type="submit">Search</button>
    </form>
  )
};

export default SearchBar;
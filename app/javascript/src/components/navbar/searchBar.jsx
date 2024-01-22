import React from "react";

function SearchBar(props) {

  return (
    <form className={`me-3 d-flex search-box order-md-1 ${props.display}`} onSubmit={(e) => searchAction(e)}>
      <input
        className="form-control me-2 search-input"
        type="search"
        placeholder="Patient Last Name"
        aria-label="Search"
        onChange={(e) => searchText(e)}
        value={props.search}
      />
      <button className="btn btn-outline-success search-btn" type="submit">Search</button>
    </form>
  )
};

export default SearchBar;
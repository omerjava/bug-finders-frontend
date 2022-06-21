import React from "react";
import "./SortFilterBar.css";

function SortFilterBar(props) {
  return (
    <div className="sortFilterBar">
      <div>
        <label htmlFor="search">Filter:</label>
        <input
          name="search"
          type="text"
          placeholder="Search By Keyword"
          onChange={props.handleSearchByKeyword}
        />
      </div>
      <div className="sort">
        <label htmlFor="sort">Sort:</label>
        <select name="sort" onChange={props.handleFunction}>
          <option value="bug_id-ASC">Id Ascending</option>
          <option value="bug_id-DESC">Id Descending</option>
          <option value="bugname-ASC">Bugname A-Z</option>
          <option value="bugname-DESC">Bugname Z-A</option>
          <option value="username-ASC">Username A-Z</option>
          <option value="username-DESC">Username Z-A</option>
          <option value="category-ASC">Tags A-Z</option>
          <option value="category-DESC">Tags Z-A</option>
          <option value="created_on-ASC">Oldest</option>
          <option value="created_on-DESC">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default SortFilterBar;

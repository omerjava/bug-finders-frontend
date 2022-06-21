import React from "react";
import "./Page.css";

function Page(props) {
  return (
    <div className="page">
      <button
        className={props.active ? "active page-btn" : "page-btn"}
        onClick={props.currentPageHandle}
      >
        {props.value}
      </button>
    </div>
  );
}

export default Page;

import React from "react";
import "./MyBugs.css";
import { useState, useEffect } from "react";
import { bugApi } from "../../api-calls/bug-api-calls";
import BugCard from "../../components/bugCard/BugCard";
import { firstLetterCapital } from "../../logic/firstLetterCapital";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import SortFilterBar from "../../components/sortFilterBar/SortFilterBar";
import Pagination from "../../components/pagination/Pagination";

function MyBugs() {
  const [bugList, setBugList] = useState([]);
  const [bugListError, setBugListError] = useState("");

  const { newUpdatedBug, newDeletedBug, currentPage, pageLimit, loggedInUserId } = useContext(AllContext);

  const getMyBugs = (sortInput) => {
    const sortInputKeys = sortInput?.split("-");
    const query = `?sortBy=${sortInputKeys ? sortInputKeys[0] : ""}&sortType=${
      sortInputKeys ? sortInputKeys[1] : ""
    }&page=${currentPage}&limit=${pageLimit}`;

    const response = bugApi.getMyBugs(query);

    response
      .then((res) => {
        if (res.ok) {
          setBugListError("");
          return res.json();
        } else {
          setBugListError(
            `Sorry! We couldn't get Bugs due to: ${res.status} ${res.statusText}`
          );
          return;
        }
      })
      .then((data) => {
        if (typeof data !== "string") {
          setBugList(data);
        }
      })
      .catch((err) => setBugListError(err.message));
  };

  useEffect(()=>{
    getMyBugs();
  }, [newUpdatedBug, newDeletedBug, currentPage, pageLimit]);

   // search Bugs by keyword

   const searchBugs = (searchInput) => {
    let query = `?searchInput=${searchInput}`;

    if (!searchInput) {
      query = "";
    }

    const response = bugApi.searchBugs(query);

    response
      .then((res) => {
        if (res.ok) {
          setBugListError("");
          return res.json();
        } else {
          setBugListError(
            `Sorry! We couldn't get Bugs due to: ${res.status} ${res.statusText}`
          );
          return;
        }
      })
      .then((data) => {
        if (typeof data !== "string") {
          setBugList(data);
        }
      })
      .catch((err) => setBugListError(err.message));
  };

  return (
    <div className="myBugs">
      <SortFilterBar
        handleFunction={(e) => getMyBugs(e.target.value)}
        handleSearchByKeyword={(e) => searchBugs(e.target.value)}
      />
      {(bugList !== null &&
        bugList !== undefined &&
        bugList.length !== 0)
          ? 
      bugList.map((v, i) => (
        <BugCard
          key={i}
          bugName={firstLetterCapital(v.bugname)}
          username={v.username}
          bugDescription={firstLetterCapital(v.bug)}
          date={v.created_on.substring(0,10)}
          bugId={v.bug_id}
          category={firstLetterCapital(v.category)}
        />
      )) : <p className="no-data">There is no bug yet!</p>}
       {bugListError}
       <Pagination getId={loggedInUserId} />
    </div>
  );
}

export default MyBugs;

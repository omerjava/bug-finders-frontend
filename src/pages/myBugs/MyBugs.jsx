import React from "react";
import "./MyBugs.css";
import { useState, useEffect } from "react";
import { bugApi } from "../../api-calls/bug-api-calls";
import BugCard from "../../components/bugCard/BugCard";
import { firstLetterCapital } from "../../logic/firstLetterCapital";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function MyBugs() {
  const [bugList, setBugList] = useState([]);

  const { newUpdatedBug, newDeletedBug } = 
  useContext(AllContext);

  const getBugs = () => {
    const response = bugApi.getMyBugs();

    response
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return "Your access is expired!";
        }
      })
      .then((data) => {
        if (typeof data !== "string") {
          setBugList(data);
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    getBugs();
  }, [newUpdatedBug, newDeletedBug]);

  return (
    <div className="myBugs">
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
    </div>
  );
}

export default MyBugs;

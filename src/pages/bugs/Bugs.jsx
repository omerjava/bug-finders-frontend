import React from "react";
import "./Bugs.css";
import { useState, useEffect } from "react";
import { bugApi } from "../../api-calls/bug-api-calls";
import BugCard from "../../components/bugCard/BugCard";
import { firstLetterCapital } from "../../logic/firstLetterCapital";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function Bugs() {
  const [bugList, setBugList] = useState([]);
  const [bugListError, setBugListError] = useState("");


  const { newUpdatedBug, newDeletedBug } = useContext(AllContext); 

  const getBugs = () => {
    const response = bugApi.getAllBugs();

    response
      .then((res) => {
        if (res.ok) {
          setBugListError("");
          return res.json();
        } 
        else {
          setBugListError(`Sorry! We couldn't get Bugs due to: ${res.status} ${res.statusText}`)
          return;
        }
      })
      .then((data) => {
        if (typeof data !== "string") {setBugList(data);}
      })
      .catch((err) => setBugListError(err.message));
  };

  useEffect(() => {
    getBugs();
  }, [newUpdatedBug, newDeletedBug]);

  return (
    <div className="bugs">
      {bugList.map((v, i) => (
        <BugCard
          key={i}
          bugName={firstLetterCapital(v.bugname)}
          username={v.username}
          bugDescription={firstLetterCapital(v.bug)}
          date={v.created_on.substring(0,10)}
          bugId={v.bug_id}
          category={firstLetterCapital(v.category)}
        />
      ))}
      <p className={bugListError!==0 ? "bugListError" : "no-bugListError"}> {bugListError}</p>
    </div>
  );
}

export default Bugs;

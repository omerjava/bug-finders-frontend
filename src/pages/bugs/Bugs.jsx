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

  const { newUpdatedBug, newDeletedBug } = 
  useContext(AllContext); 

  const getBugs = () => {
    const response = bugApi.getAllBugs();

    response
      .then((res) => {
        if (res.ok) return res.json();
        else return "Your access is expired!";
      })
      .then((data) => {
        if (typeof data !== "string") {console.log(data); setBugList(data);}
        else console.log(data);
      })
      .catch((err) => console.log(err));
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
    </div>
  );
}

export default Bugs;

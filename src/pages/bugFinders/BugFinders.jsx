import React, { useState } from "react";
import { useEffect } from "react";
import BugFinderCard from "../../components/bugFinderCard/BugFinderCard";
import { userApi } from "../../api-calls/user-api-calls";
import "./BugFinders.css";

function BugFinders() {
  const [errorGetBugFinders, setErrorGetBugFinders] = useState("");
  const [bugFindersList, setBugFindersList] = useState(null);

  const getBugFinders = () => {
    const response = userApi.getAllUsers();

    response
      .then((res) => {
        if (res.ok) {
          setErrorGetBugFinders("");
          return res.json();
        } else
          setErrorGetBugFinders(
            `We couldn't get Bug Finders info due to error: ${res.status} ${res.statusText}`
          );
      })
      .then((data) => setBugFindersList(data))
      .catch((error) => setErrorGetBugFinders(error.message));
  };

  useEffect(() => {
    getBugFinders();
  }, []);

  return (
    <div className="bugFindersPage">
      {bugFindersList?.map((v, i) => (
        <BugFinderCard key={i} username={v.username} userId={v.user_id} />
      ))}
      <p
        className={
          bugFindersList === null || bugFindersList === undefined
            ? "no-data"
            : "do-not-show"
        }
      >
        {errorGetBugFinders}
      </p>
    </div>
  );
}

export default BugFinders;

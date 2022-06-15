import React from "react";
import "./NewBugForm.css";
import { useState } from "react";
import { bugApi } from "../../api-calls/bug-api-calls";

function NewBugForm() {
  const [bugDescription, setBugDescription] = useState("");
  const [bugName, setBugName] = useState("");
  const [bugCategory, setBugCategory] = useState("");
  const [messageBug, setMessageBug] = useState("");

  const handleNewBug = () => {
    const response = bugApi.bugCreate(bugDescription, bugName, bugCategory);

    response
      .then((res) => {
        if (res.ok) setMessageBug("Your Bug post is recorded successfully!");
        else setMessageBug("Your access is expired!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="newBugForm">
      <form>
        <h2>Create New Bug</h2>
        <input
          type="text"
          id="bugname"
          name="bugname"
          placeholder="Bug Name"
          value={bugName}
          onChange={(e) => setBugName(e.target.value)}
          minLength="2"
          required
        />
        <br />
        <textarea
          id="bugDescription"
          name="bugDescription"
          placeholder="Bug Description"
          value={bugDescription}
          onChange={(e) => setBugDescription(e.target.value)}
          minLength="10"
          required
        />
        <br />
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Category"
          value={bugCategory}
          onChange={(e) => setBugCategory(e.target.value)}
          minLength="2"
          required
        />
        <br />
        <input
          type="button"
          className="btn"
          value="Post"
          onClick={handleNewBug}
        />
        <div className={messageBug.length > 0 ? "bugMessage" : "no-message"}>
          {messageBug}
        </div>
      </form>
    </div>
  );
}

export default NewBugForm;

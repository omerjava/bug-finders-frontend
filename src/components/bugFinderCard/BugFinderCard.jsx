import React, { useState } from "react";
import { bugApi } from "../../api-calls/bug-api-calls";
import { commentApi } from "../../api-calls/comment-api-calls";
import { firstLetterCapital } from "../../logic/firstLetterCapital";
import BugCard from "../bugCard/BugCard";
import Comment from "../comment/Comment";
import "./BugFinderCard.css";

function BugFinderCard(props) {
  const [showBugs, setShowBugs] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [bugList, setBugList] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [errorBugsById, setErrorBugsById] = useState("");
  const [errorCommentsById, setErrorCommentsById] = useState("");

  const fetchBugsById = (id) => {
    if (!id) {
      setErrorBugsById("Invalid or missing input!");
      return;
    }

    const response = bugApi.getBugsById(id);

    response
      .then((res) => {
        if (res.ok) {
          setErrorBugsById("");
          return res.json();
        } else
          setErrorBugsById(
            `We couldn't bring Bugs due to error: ${res.status} ${res.statusText}`
          );
      })
      .then((data) => {
        setBugList(data); 
        if(data.length===0) setErrorBugsById('No bugs so far!');
    })
      .catch((error) => setErrorBugsById(error.message));
  };

  const fetchCommentsById = (id) => {
    if (!id) {
      setErrorCommentsById("Invalid or missing input!");
      return;
    }

    const response = commentApi.getCommentsById(id);

    response
      .then((res) => {
        if (res.ok) {
          setErrorCommentsById("");
          return res.json();
        } else
          setErrorCommentsById(
            `We couldn't bring Comments due to error: ${res.status} ${res.statusText}`
          );
      })
      .then((data) => {
        setCommentList(data);
        if(data.length===0) setErrorCommentsById('No comments so far!');
      })
      .catch((error) => setErrorCommentsById(error.message));
  };

  return (
    <div className="bugFinderCard">
      <div className="bugFinderCard-body">
        <div className="bugFinderCard-name">
          Bug Finder: <span className="username">{props.username}</span>
        </div>
        <div
          className="bugFinderCard-bugs"
          onClick={() => {
            fetchBugsById(props.userId);
            setShowBugs(!showBugs);
          }}
        >
          Bugs
        </div>
        <div
          className="bugFinderCard-comments"
          onClick={() => {
            fetchCommentsById(props.userId);
            setShowComments(!showComments);
          }}
        >
          Comments
        </div>
      </div>
      <div
        className={showBugs ? "bugFinderCard-footer showBugs" : "hideElement"}
      >
        {bugList?.map((v, i) => (
          <BugCard
            key={i}
            bugName={firstLetterCapital(v.bugname)}
            username={v.username}
            bugDescription={firstLetterCapital(v.bug)}
            date={v.created_on.substring(0, 10)}
            bugId={v.bug_id}
            category={firstLetterCapital(v.category)}
          />
        ))}
        <p className="error-style">{errorBugsById}</p>
      </div>
      <div
        className={
          showComments ? "bugFinderCard-footer showComments" : "hideElement"
        }
      >
        {commentList?.map((v, i) => (
          <Comment
            key={i}
            description={firstLetterCapital(v.comment)}
            commentUsername={v.username}
            date={v.created_on.substring(0, 10)}
            commentId={v.comment_id}
          />
        ))}
        <p className="error-style">{errorCommentsById}</p>
      </div>
    </div>
  );
}

export default BugFinderCard;

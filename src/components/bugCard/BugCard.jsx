import React from "react";
import "./BugCard.css";
import Comment from "../comment/Comment";
import { useState, useEffect } from "react";
import { commentApi } from "../../api-calls/comment-api-calls";
import { firstLetterCapital } from "../../logic/firstLetterCapital";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { bugApi } from "../../api-calls/bug-api-calls";
import { getToken } from "../../logic/getToken";

function BugCard(props) {
  const [editBugBoolean, setEditBugBoolean] = useState(false);
  const [replyBugBoolean, setReplyBugBoolean] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [errorPostComment, setErrorPostComment] = useState("");
  const [errorUpdateBug, setErrorUpdateBug] = useState("");
  const [updatedBug, setUpdatedBug] = useState("");
  const [errorDeleteBug, setErrorDeleteBug] = useState("");
  const [bugNameUpdatedInput, setBugNameUpdatedInput] = useState("");
  const [showBugnameEditArea, setShowBugnameEditArea] = useState(false);
  const [showCategoryEditArea, setShowCategoryEditArea] = useState(false);
  const [categoryUpdatedInput, setCategoryUpdatedInput] = useState("");

  const {
    newComment,
    setNewComment,
    newDeletedComment,
    newUpdatedComment,
    loggedInUser,
    newUpdatedBug,
    setNewUpdatedBug,
    newDeletedBug,
    setNewDeletedBug,
  } = useContext(AllContext);

  const getComments = () => {
    const response = commentApi.getAllComments();
    response
      .then((res) => res.json())
      .then((data) => {
        setCommentList(data.reverse());
      });
  };

  useEffect(() => {
    getComments();
  }, [newComment, newDeletedComment, newUpdatedComment, newUpdatedBug]);

  // Post Comment

  const postComment = async (commentInput, bug_idInput) => {
    const accessToken = await getToken();

    if (!accessToken) {
      setErrorPostComment("Please login to make a comment!");
      return;
    }

    if (!commentInput || !bug_idInput) {
      setErrorPostComment("Invalid or missing input!");
      return;
    }

    const response = commentApi.commentCreate(commentInput, bug_idInput);
    response
      .then((res) => {
        if (res.ok) {
          setErrorPostComment("");
          setCommentInput("");
          setNewComment(newComment + 1);
          setReplyBugBoolean(false);
        } else setErrorPostComment("Sorry! We couldn't save your comment!");
      })
      .catch((error) => setErrorPostComment(error.message));
  };

  const updateBugHandle = (inputName, inputContent, bugId) => {
    if (!inputName || !inputContent || !bugId) {
      setErrorUpdateBug("Invalid or same input!");
      return;
    }

    const response = bugApi.updateMyBug(inputName, inputContent, bugId);

    response
      .then((res) => {
        if (res.ok) {
          setErrorUpdateBug("");
          setNewUpdatedBug(newUpdatedBug + 1);
          setEditBugBoolean(false);
          setShowBugnameEditArea(false);
          setShowCategoryEditArea(false);
          setUpdatedBug("");
        } else setErrorUpdateBug(`${res.status} ${res.statusText}`);
      })
      .catch((error) => setErrorUpdateBug(error.message));
  };

  const deleteBugHandle = (bugId) => {
    if (!bugId) {
      setErrorDeleteBug("Invalid or missing input!");
      return;
    }

    const response = bugApi.deleteMyBug(bugId);

    response
      .then((res) => {
        if (res.ok) {
          setErrorDeleteBug("");
          setNewDeletedBug(newDeletedBug + 1);
        } else setErrorDeleteBug(`${res.status} ${res.statusText}`);
      })
      .catch((error) => setErrorDeleteBug(error.message));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-bugname">
          <div
            className="bugName"
            onClick={() => setShowBugnameEditArea(!showBugnameEditArea)}
          >
            Bug: {props.bugName}
          </div>
          <div
            className={
              props.username === loggedInUser && showBugnameEditArea
                ? "bugName-edit"
                : "no-bugName-edit"
            }
          >
            <input
              type="text"
              id="bugNameEdit"
              name="bugNameEdit"
              defaultValue={props.bugName}
              onChange={(e) => setBugNameUpdatedInput(e.target.value)}
            />
            <button
              onClick={() =>
                updateBugHandle("bugname", bugNameUpdatedInput, props.bugId)
              }
            >
              Submit
            </button>
          </div>
        </div>
        <div className="card-username">{props.username}</div>
      </div>
      <div className="card-body">
        <p>{props.bugDescription}</p>
      </div>
      <div className="card-footer">
        <div className="card-category">
          <div
            className="category"
            onClick={() => setShowCategoryEditArea(!showCategoryEditArea)}
          >
            Tags: {props.category}
          </div>
          <div
            className={
              props.username === loggedInUser && showCategoryEditArea
                ? "category-edit"
                : "no-category-edit"
            }
          >
            <input
              type="text"
              id="categoryEdit"
              name="categoryEdit"
              defaultValue={props.category}
              onChange={(e) => setCategoryUpdatedInput(e.target.value)}
            />
            <button
              onClick={() =>
                updateBugHandle("category", categoryUpdatedInput, props.bugId)
              }
            >
              Submit
            </button>
          </div>
        </div>
        <div className="card-date">{props.date}</div>
        <div className="card-buttons">
          <button
            onClick={() => {
              setReplyBugBoolean(true);
              setEditBugBoolean(false);
            }}
          >
            Reply
          </button>
          <button
            className={
              props.username === loggedInUser ? "editBtn" : "no-editBtn"
            }
            onClick={() => {
              setEditBugBoolean(true);
              setReplyBugBoolean(false);
            }}
          >
            Edit
          </button>
          <button
            className={
              props.username === loggedInUser ? "deleteBtn" : "no-deleteBtn"
            }
            onClick={() => deleteBugHandle(props.bugId)}
          >
            Delete
          </button>
        </div>
      </div>
      {errorDeleteBug}
      <div className={replyBugBoolean ? "bug-reply" : "no-bug-reply"}>
        <textarea
          name="reply-bug"
          id="reply-bug"
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
        ></textarea>
        <div className="bug-reply-buttons">
          <div>
            <button onClick={() => {setErrorPostComment(""); setReplyBugBoolean(false);}}>Cancel</button>
          </div>
          <div>
            <button onClick={() => postComment(commentInput, props.bugId)}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="errorPostComment">{errorPostComment}</div>
      <div className={editBugBoolean ? "bug-edit" : "no-bug-edit"}>
        <textarea
          name="edit-bug"
          id="edit-bug"
          onChange={(e) => setUpdatedBug(e.target.value)}
          defaultValue={props.bugDescription}
        ></textarea>
        <div className="bug-edit-buttons">
          <div>
            <button onClick={() => {setErrorUpdateBug(""); setEditBugBoolean(false);}}>Cancel</button>
          </div>
          <div>
            <button
              onClick={() => updateBugHandle("bug", updatedBug, props.bugId)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="errorUpdateBug">{errorUpdateBug}</div>
      <div className="card-comments">
        {commentList?.filter((v) => v.bug_id === props.bugId)
          .map((v, i) => (
            <Comment
              key={i}
              description={firstLetterCapital(v.comment)}
              commentUsername={v.username}
              date={v.created_on.substring(0, 10)}
              commentId={v.comment_id}
            />
          ))}
      </div>
    </div>
  );
}

export default BugCard;

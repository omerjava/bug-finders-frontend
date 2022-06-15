import React from "react";
import "./Comment.css";
import { useState } from "react";
import { commentApi } from "../../api-calls/comment-api-calls";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function Comment(props) {
  const [editBoolean, setEditBoolean] = useState(false);
  const [errorDeleteComment, setErrorDeleteComment] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [errorUpdateComment, setErrorUpdateComment] = useState("");

  const {
    newDeletedComment,
    setNewDeletedComment,
    newUpdatedComment,
    setNewUpdatedComment,
    loggedInUser,
  } = useContext(AllContext);

  const updateCommentHandle = (comment, comment_id) => {
    if (!comment || !comment_id) {
      setErrorUpdateComment("Invalid or missing input!");
      return;
    }

    const response = commentApi.updateComment(comment, comment_id);

    response
      .then((res) => {
        if (res.ok) {
          setErrorUpdateComment("");
          setNewUpdatedComment(newUpdatedComment + 1);
          setEditBoolean(false);
        } else setErrorUpdateComment(`${res.status} ${res.statusText}`);
      })
      .catch((err) => setErrorUpdateComment(err));
  };

  const deleteCommentHandle = (commentId) => {
    if (!commentId) {
      setErrorDeleteComment("Invalid or missing input!");
      return;
    }

    const response = commentApi.deleteMyComment(commentId);

    response
      .then((res) => {
        if (res.ok) {
          setErrorDeleteComment("");
          setNewDeletedComment(newDeletedComment + 1);
        } else setErrorDeleteComment(`${res.status} ${res.statusText}`);
      })
      .catch((err) => setErrorDeleteComment(err));
  };

  return (
    <div className="comment">
      <div className="comment-body">
        <p>{props.description}</p>
      </div>
      <div className="comment-footer">
        <div className="comment-username">{props.commentUsername}</div>
        <div className="comment-date">{props.date}</div>
        <div className="comment-buttons">
          <button
            className={
              props.commentUsername === loggedInUser ? "editBtn" : "no-editBtn"
            }
            onClick={() => setEditBoolean(true)}
          >
            Edit
          </button>
          <button
            className={
              props.commentUsername === loggedInUser
                ? "deleteBtn"
                : "no-deleteBtn"
            }
            onClick={() => deleteCommentHandle(props.commentId)}
          >
            Delete
          </button>
        </div>
        {errorDeleteComment}
      </div>
      <div className={editBoolean ? "comment-edit" : "no-comment-edit"}>
        <textarea
          name="edit-comment"
          id="edit-comment"
          onChange={(e) => setUpdatedComment(e.target.value)}
          defaultValue={props.description}
        ></textarea>
        <div className="comment-edit-buttons">
          <div>
            <button onClick={() => setEditBoolean(false)}>Cancel</button>
          </div>
          <div>
            <button
              onClick={() =>
                updateCommentHandle(updatedComment, props.commentId)
              }
            >
              Submit
            </button>
          </div>
          {errorUpdateComment}
        </div>
      </div>
    </div>
  );
}

export default Comment;

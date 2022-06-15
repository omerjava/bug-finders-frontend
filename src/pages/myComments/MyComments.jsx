import React, { useEffect } from "react";
import "./MyComments.css";
import Comment from "../../components/comment/Comment";
import { useState } from "react";
import { commentApi } from "../../api-calls/comment-api-calls";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { firstLetterCapital } from "../../logic/firstLetterCapital";

function MyComments() {
  const [commentList, setCommentList] = useState([]);

  const { newDeletedComment, newUpdatedComment } = useContext(AllContext);

  const getMyCommentsHandle = () => {
    const response = commentApi.getMyComments();
    response
      .then((res) => res.json())
      .then((data) => {
        setCommentList(data.reverse());
      });
  };

  useEffect(() => {
    getMyCommentsHandle();
  }, [newDeletedComment, newUpdatedComment]);


  return (
    <div className="myComments">
      {(commentList !== null &&
        commentList !== undefined &&
        commentList.length !== 0)
          ? 
      commentList.map((v, i) => (
        <Comment
          key={i}
          description={firstLetterCapital(v.comment)}
          commentUsername={v.username}
          date={v.created_on.substring(0, 10)}
          commentId={v.comment_id}
        />
      )) : <p className="no-data">There is no comment so far!</p> }
    </div>
  );
}

export default MyComments;

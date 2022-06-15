import { ORIGIN } from "../config/config";
import { getToken } from "../logic/getToken";

export const commentApi = {
  commentCreate: async (commentInput, bug_idInput) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/comments/api/create`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        comment: commentInput,
        bug_id: bug_idInput
      }),
    });

    return response;
  },

  getAllComments: async () => {
    const response = await fetch(`${ORIGIN}/comments/api/showAllComments`);

    return response;
  },

  getMyComments: async () => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/comments/api/showMyComments`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },

  getCommentsById: async (id) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/comments/api/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },

  updateComment: async (comment, commentId) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/comments/api/updateMyComment`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
      body: JSON.stringify({
        comment: comment,
        comment_id: commentId,
      }),
    });

    return response;
  },

  deleteMyComment: async (comment_idInput) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/comments/api/delete`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
      body: JSON.stringify({
        comment_id: comment_idInput,
      }),
    });

    return response;
  }

};

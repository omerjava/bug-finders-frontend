import { ORIGIN } from "../config/config";
import { getToken } from "../logic/getToken";

export const bugApi = {
  bugCreate: async (bugDescription, bugName, bugCategory) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/bugs/api/create`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        bug: bugDescription,
        bugName: bugName,
        category: bugCategory,
      }),
    });

    return response;
  },

  getAllBugs: async () => {
    const response = await fetch(`${ORIGIN}/bugs/api/showAllBugs`);

    return response;
  },

  getMyBugs: async () => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/bugs/api/showMyBugs`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  getBugsById: async (id) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/bugs/api/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  updateMyBug: async (inputName, inputContent, bugId) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/bugs/api/updateMyBug`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
      body: JSON.stringify({
        inputName: inputName,
        inputContent: inputContent,
        bugId: bugId,
      }),
    });

    return response;
  },

  deleteMyBug: async (bugId) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/bugs/api/deleteMyBug`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
      body: JSON.stringify({
        bugId: bugId,
      }),
    });

    return response;
  }

};

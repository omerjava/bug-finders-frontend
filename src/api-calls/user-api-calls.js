import { ORIGIN } from "../config/config";
import { getToken } from "../logic/getToken";

export const userApi = {
  
  getAllUsers: async () => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/users/api/bugHunters`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  getMyProfile: async (accessToken) => {

    const response = await fetch(`${ORIGIN}/users/api/userInfo`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  updateMyProfile: async () => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/user/api/update`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  deleteMyAccount: async () => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/users/api/delete`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });

    return response;
  },
};

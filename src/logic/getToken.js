import { ORIGIN } from "../config/config";


export const getToken = async () => {
  if (tokenExpired()) {
    const refreshToken = localStorage.getItem("refreshToken");
    const token = await getValidTokenFromServer(refreshToken);
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("expirationDate", newExpirationDate());
    return token.accessToken;
  } else {
    // console.log("tokens.js 11 | token not expired");
    return localStorage.getItem("accessToken");
  }
};

const newExpirationDate = () => {
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 5);
  return expiration;
};

const tokenExpired = () => {
  const now = Date.now();

  const expirationDate = localStorage.getItem("expirationDate");
  const expireDate = new Date(expirationDate);

  if (now > expireDate.getTime()) {
    return true; // token expired
  }

  return false; // valid token
};

const getValidTokenFromServer = async (refreshToken) => {
  // get new token from server with refresh token
  try {
    const response = await fetch(`${ORIGIN}/auth/api/getValidToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
    if (response.ok) {
      const token = await response.json();
      return token;
    } else {
      return "Your access is expired!";
    }
  } catch (error) {
    throw new Error("Issue getting new token", error.message);
  }
};

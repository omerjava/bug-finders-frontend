import { ORIGIN } from "../config/config";


export const auth = {

    registerUser: async(usernameData, emailData, passwordData) => {

        const response = await fetch(`${ORIGIN}/auth/api/signup`, {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              username: usernameData,
              email: emailData,
              password: passwordData,
            }),
          });

          return response;
    },

    loginUser: async (username, password) => {


        const response = await fetch(`${ORIGIN}/auth/api/login`, {
            headers: {
              "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          return response;
    },

    logoutUser: async () => {
      
        let refreshToken = localStorage.getItem("refreshToken");
     
        await fetch(`${ORIGIN}/auth/api/logout`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             refreshToken: refreshToken,
           }),
         });

         localStorage.removeItem("refreshToken");
         localStorage.removeItem("accessToken");
    }

}
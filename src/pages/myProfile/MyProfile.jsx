import React, { useState } from "react";
import "./MyProfile.css";
import { userApi } from "../../api-calls/user-api-calls";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function MyProfile() {
  const [usernameChange, setUsernameChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [errorDeleteUser, setErrorDeleteUser] = useState("");

  const navigate = useNavigate();

  const { setLoggedIn, loggedInUser, loggedInEmail } = useContext(AllContext);

  

  const deleteUserHandle = () => {
    const response = userApi.deleteMyAccount();

    response
      .then((res) => {
        if (res.ok) {
          setErrorDeleteUser("");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          setLoggedIn(false);
          navigate("/bug-finders-frontend/");
        } else setErrorDeleteUser(`${res.status} ${res.statusText}`);
      })
      .catch((err) => setErrorDeleteUser(err));
  };

  return (
    <div className="myProfile">
      <h2>My Profile</h2>
      <div className="profile-username">
        <div className="common">
          <p>
            Username: <span className="spans">{loggedInUser}</span>{" "}
          </p>
          <button onClick={() => setUsernameChange(!usernameChange)}>
            Change
          </button>
        </div>
        <div className={usernameChange ? "change" : "no-change"}>
          <input type="text" defaultValue={loggedInUser} />
          <input type="button" value="Update" />
        </div>
      </div>
      <div className="profile-email">
        <div className="common">
          <p>
            Email: <span className="spans">{loggedInEmail}</span>{" "}
          </p>
          <button onClick={() => setEmailChange(!emailChange)}>Change</button>
        </div>
        <div className={emailChange ? "change" : "no-change"}>
          <input type="text" defaultValue={loggedInEmail} />
          <input type="button" value="Update" />
        </div>
      </div>
      <div className="profile-password">
        <div className="common">
          <p>
            Change Password: <span className="spans">***</span>{" "}
          </p>
          <button onClick={() => setPasswordChange(!passwordChange)}>
            Change
          </button>
        </div>
        <div className={passwordChange ? "change" : "no-change"}>
          <input type="password" placeholder="Current password" />
          <input type="password" placeholder="New password" />
          <input type="button" value="Update" />
        </div>
      </div>
      <div className="profile-delete">
        <div className="common">
          <p>Delete my account </p>
          <button onClick={() => deleteUserHandle()}>Delete</button>
          {errorDeleteUser}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

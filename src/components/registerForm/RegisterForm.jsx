import React from "react";
import "./RegisterForm.css";
import { useState } from "react";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { auth } from "../../api-calls/auth-api-calls";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { messageRegister, setMessageRegister } = useContext(AllContext);

  const navigate = useNavigate();

  const handleRegister = () => {
    const response = auth.registerUser(username, email, password);

    response
      .then((res) => {
        if (res.ok) {
          navigate("/bug-finders-frontend/login");
          setMessageRegister("");
        } else {
          setMessageRegister(
            `Sorry! We couldn't save your information due to: ${res.status} ${res.statusText}`
          );
        }
      })
      .catch((err) =>
        setMessageRegister(
          `Sorry! We couldn't save your information due to: ${err.message}`
        )
      );
  };

  return (
    <div className="registerForm">
      <form className={messageRegister.length > 0 ? "close-form" : "show-form"}>
        <h2>Register</h2>
        <input
          type="text"
          id="usernameRegister"
          name="usernameRegister"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          id="emailRegister"
          name="emailRegister"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="passwordRegister"
          name="passwordRegister"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="button"
          className="btn"
          value="Register"
          onClick={handleRegister}
        />
      </form>
      <div
        className={
          messageRegister.length > 0 ? "registerMessage" : "no-message"
        }
      >
        {messageRegister}
      </div>
    </div>
  );
}

export default RegisterForm;

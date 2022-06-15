import React from "react";
import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { auth } from "../../api-calls/auth-api-calls";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setLoggedIn, setLoggedInUser } = useContext(AllContext);

  const navigate = useNavigate();

  const handleLogin = (usernameInput, passwordInput) => {
    
    const response = auth.loginUser(usernameInput, passwordInput);
      
    response.then((res) => {
        if (res.ok) {
          setMessage("");
          navigate("/new-bug");
          setLoggedIn(true);
          console.log(res);

        } else {
          console.log(res);
          setMessage("We couldn't login! Please try again!");
        }
        return res.json();
      }).then(data=>{ 
        localStorage.setItem("accessToken", data.accessToken); 
        localStorage.setItem("refreshToken", data.refreshToken);
        setLoggedInUser(data.username); 
        console.log(data);
      })
      .catch((err) => setMessage("We couldn't login! Please try again!"));
  };

  return (
    <div className="loginForm">
      <form>
        <h2>Login</h2>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="button"
          className="btn"
          value="Login"
          onClick={() => handleLogin(username, password)}
        />
        <div className={message.length > 0 ? "loginMessage" : "no-message"}>
          {message}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

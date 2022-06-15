import React from "react";
import { auth } from "../../api-calls/auth-api-calls";
import "./Navbar.css";

function Navbar(props) {



  return (
    <div>
      <nav className="general-nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/bugs">Bugs</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/" onClick={() => auth.logoutUser()}>Logout</a>
          </li>
        </ul>
      </nav>
      <nav className={props.login ? "member-nav" : "no-member-nav"}>
      <ul>
          <li>
            <a href="/profile">My Profile</a>
          </li>
          <li>
            <a href="/my-bugs">My Bugs</a>
          </li>
          <li>
            <a href="/my-comments">My Comments</a>
          </li>
          <li>
            <a href="/new-bug">Post New Bug</a>
          </li>
          <li>
            <a href="/bug-finders">Bug Finders</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

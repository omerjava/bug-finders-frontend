import React from "react";
import { auth } from "../../api-calls/auth-api-calls";
import "./Navbar.css";

function Navbar(props) {



  return (
    <div>
      <nav className="general-nav">
        <ul>
          <li>
            <a href="/bug-finders-frontend/">Home</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/bugs">Bugs</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/register">Register</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/login">Login</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/" onClick={() => auth.logoutUser()}>Logout</a>
          </li>
        </ul>
      </nav>
      <nav className={props.login ? "member-nav" : "no-member-nav"}>
      <ul>
          <li>
            <a href="/bug-finders-frontend/profile">My Profile</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/my-bugs">My Bugs</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/my-comments">My Comments</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/new-bug">Post New Bug</a>
          </li>
          <li>
            <a href="/bug-finders-frontend/bug-finders">Bug Finders</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

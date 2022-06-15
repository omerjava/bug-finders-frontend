import React from "react";
import { auth } from "../../api-calls/auth-api-calls";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function Navbar(props) {

  const { setLoggedIn } = useContext(AllContext); 

  return (
    <div>
      <nav className="general-nav">
        <ul>
          <li>
            <Link to="/bug-finders-frontend/"> Home </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/bugs"> Bugs </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/register"> Register </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/login"> Login </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/" onClick={() => {auth.logoutUser(); setLoggedIn(false);}}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={props.login ? "member-nav" : "no-member-nav"}>
        <ul>
          <li>
            <Link to="/bug-finders-frontend/profile"> My Profile </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/my-bugs"> My Bugs </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/my-comments"> My Comments </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/new-bug"> Post New Bug </Link>
          </li>
          <li>
            <Link to="/bug-finders-frontend/bug-finders"> Bug Finders </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

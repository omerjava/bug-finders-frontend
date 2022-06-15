import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Bugs from "./pages/bugs/Bugs.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import MyProfile from "./pages/myProfile/MyProfile.jsx";
import MyBugs from "./pages/myBugs/MyBugs.jsx";
import MyComments from "./pages/myComments/MyComments.jsx";
import NewBug from "./pages/newBug/NewBug.jsx";
import BugFinders from "./pages/bugFinders/BugFinders.jsx";
import { AllContext } from "./context/AllContext";
import { getToken } from "./logic/getToken";
import { userApi } from "./api-calls/user-api-calls";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messageRegister, setMessageRegister] = useState("");
  const [newComment, setNewComment] = useState(0);
  const [newDeletedComment, setNewDeletedComment] = useState(0);
  const [newUpdatedComment, setNewUpdatedComment] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [newUpdatedBug, setNewUpdatedBug] = useState(0);
  const [newDeletedBug, setNewDeletedBug] = useState(0);

  const isLoggedIn = async () => {
    const accessToken = await getToken();

    if (accessToken) setLoggedIn(true);
    else setLoggedIn(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const userInfo = async () => {
    const accessToken = await getToken();

    const response = userApi.getMyProfile(accessToken);

    response
      .then((res) => {
        if (res.ok) return res.json();
        else {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          setLoggedIn(false);
          return;
        }
      })
      .then((data) => {
        setLoggedInEmail(data[0].email);
        setLoggedInUser(data[0].username);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div className="App">
      <AllContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          messageRegister,
          setMessageRegister,
          newComment,
          setNewComment,
          newDeletedComment,
          setNewDeletedComment,
          newUpdatedComment,
          setNewUpdatedComment,
          loggedInUser,
          setLoggedInUser,
          loggedInEmail,
          setLoggedInEmail,
          newUpdatedBug,
          setNewUpdatedBug,
          newDeletedBug,
          setNewDeletedBug,
        }}
      >
        <Router>
          <Navbar login={loggedIn} />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/bugs" exact element={<Bugs />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/profile" exact element={<MyProfile />} />
            <Route path="/my-bugs" exact element={<MyBugs />} />
            <Route path="/my-comments" exact element={<MyComments />} />
            <Route path="/new-bug" exact element={<NewBug />} />
            <Route path="/bug-finders" exact element={<BugFinders />} />
          </Routes>
          <Footer />
        </Router>
      </AllContext.Provider>
    </div>
  );
}

export default App;

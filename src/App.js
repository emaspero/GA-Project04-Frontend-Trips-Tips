import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TopTen from "./trips/TopTen";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import {Alert} from 'react-bootstrap';
import BrowseTrips from "./trips/BrowseTrips";
import MyTrips from "./trips/MyTrips";
import Favs from "./trips/Favs";
// import TripCreateForm from "./trips/TripCreateForm";
import Trip from "./trips/Trip";
import './App.css';



export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token != null) {
      let user = jwt_decode(token);

      if (user) {
        setIsAuth(true);
        setUser(user);
        setUserId(user.user.id);
        profileHandler(userId);

      } else if (!user) {
        localStorage.removeItem("token");
        setIsAuth(false);
        setCurrentUser();
      }
    }
  }, [userId]);

  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
      .then((response) => {
        console.log(response.data.token);
        if (response.data.token != null) {
          // console.log("token")
          localStorage.setItem("token", response.data.token);
          let user = jwt_decode(response.data.token);
          setIsAuth(true);
          setUser(user);
          setMessage("User logged in successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAuth(false);
      });
  };

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setMessage("User logged out successfully!");
  };

  const errMessage = message ? (
    <Alert variant="success">{message}</Alert>
  ) : null;



  const profileHandler = (userId) => {
    Axios.get(`auth/profile?id=${userId}`)
    .then((response) => {
      setCurrentUser({
        "id" : response.data.user._id,
        "firstName" : response.data.user.firstName,
        "lastName" : response.data.user.lastName,
        "username" : response.data.user.username,
        "emailAddress" : response.data.user.emailAddress,
      })
      console.log(currentUser)
    })
    .catch((error) => {
      console.log(error);
    });
  }



  return (
    <Router>
      <div>
        <nav>
          <div className="nav-top-auth-container">
            {isAuth ? (
              <div>
                <Link to="/profile" className="nav-top-auth-items-link">PROFILE</Link>{"   "}
                <Link to="/logout" className="nav-top-auth-items-link" onClick={onLogoutHandler}>LOGOUT</Link>{"  "}
              </div>
            ) : (
              <div className="nav-top-auth-items">
                <Link to="/signup">SIGN UP</Link>{"  "}
                <Link to="/signin">SIGN IN</Link>{"  "}
              </div>
            )}
          </div>

          <div>
            <img src="/img/TripTips-logo.png" className="nav-logo"/>
          </div>
         
          <div >
            {isAuth ? (
              <div className="nav-left-container">
                <Link to="/topten" className="nav-left-items-link">TOP 10 TRIPS</Link> {"  "}
                <Link to="/browse" className="nav-left-items-link">BROWSE TRIPS</Link> {"  "}
                <Link to="/mytrips" className="nav-left-items-link">MY TRIPS</Link>{" "}
                <Link to="/favs" className="nav-left-items-link">FAVS</Link>{" "}
                <Link to="/addtrip" className="nav-left-items-link nav-add-trip" >ADD A TRIP</Link> {" "}
              </div>
            ) : (
              <div className="nav-left-container">
                <Link to="/topten" className="nav-left-items-link">TOP 10 TRIPS</Link>
                <Link to="/browse" className="nav-left-items-link">BROWSE TRIPS</Link>
              </div>
            )}
          </div>
        </nav>

        <div className="element-container">
          <Routes>
            <Route path="/" element={<TopTen />}></Route>
            <Route path="/profile" element={<Profile currentUser={currentUser}/>}></Route>
            <Route path="/signup" element={<Signup register={registerHandler} />}></Route>
            <Route path="/signin" element={<Signin login={loginHandler} />}></Route>
            <Route path="/topten" element={<TopTen />}></Route>
            <Route path="/browse" element={<BrowseTrips />}></Route>
            <Route path="/mytrips" element={<MyTrips />}></Route>
            <Route path="/favs" element={<Favs />}></Route> 
            <Route path="/addtrip" element={<Trip />}></Route>
          </Routes>
        </div>

      </div>
      <div className="footer-container">
        <footer className="footer"></footer>
      </div>
    </Router>
  );
}

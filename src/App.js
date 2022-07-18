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
          {isAuth ? (
            <div>
              <Link to="/profile">Profile</Link>{" "}
              <Link to="/logout" onClick={onLogoutHandler}>LogOut</Link>{" "}
            </div>
          ) : (
            <div>
              <Link to="/signup">SignUp</Link>{" "}
              <Link to="/signin">SignIn</Link>{" "}
            </div>
          )}

          {isAuth ? (
            <div>
              <Link to="/topten">Top 10 Trips</Link> {" "}
              <Link to="/browse">Browse Trips</Link> {" "}
              <Link to="/mytrips">My Trips</Link>{" "}
              <Link to="/favs">Favs</Link>{" "}
              <Link to="/addtrip">Add a Trip</Link> {" "}
            </div>
          ) : (
            <div>
              <Link to="/topten">Top 10 Trips</Link>
              <Link to="/browse">Browse Trips</Link>
            </div>
          )}



        </nav>

        <div>
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
    </Router>
  );
}

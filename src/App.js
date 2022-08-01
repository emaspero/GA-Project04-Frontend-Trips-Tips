import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import TopTen from "./trips/TopTen";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import BrowseTrips from "./trips/BrowseTrips";
import MyTrips from "./trips/MyTrips";
import Favs from "./trips/Favs";
import './App.css';
import TripDetail from "./trips/TripDetail";
import TripCreateForm from "./trips/TripCreateForm";
import $ from "jquery"
import Popup from './Popup'


export default function App() {
  // AUTH STATES
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false)

  // POPUP STATES
  const [popup, setPopup] = useState({});
  const [showPopup, setShowPopup] = useState(false)

  // COUNTRIES LIST STATE
  const [allCountries, setAllCountries] = useState([])


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
        setCurrentUser(null);
        setUser(null);
        setUserId(null);
      }
    };

    loadCountryList();

    $('.alert').fadeOut(3000);

  }, [userId, isAuth, popup, showPopup]);

  // AUTH FUNCTIONS

  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((response) => {
        console.log("RESPONSE: ", response);
        popupHandler({"type": `${response.data.type}`, "message": `${response.data.message}`});
        if (response.data.type === "success") {
          setIsSignedUp(true)
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        popupHandler({"type": "error", "message": "Error signing up. Please try again"});
      });
  };

  const loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
      .then((response) => {
        console.log(response)
        console.log(response.data.token);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          let user = jwt_decode(response.data.token);
          setIsAuth(true);
          setUser(user);
          setUserId(user.user.id);
          popupHandler({"type": "success", "message": "User logged in successfully!"});
        }
        if (response.data.type) {
          popupHandler({"type": `${response.data.type}`, "message": `${response.data.message}`});
        } 
      })
      .catch((error) => {
        console.log(error);
        setIsAuth(false);
        popupHandler({"type": "error", "message": "Error logging in. Please try again"});
      });
  };

  const profileHandler = (userId) => {
    Axios.get(`auth/profile?id=${userId}`)
    .then((response) => {
      setCurrentUser({
        "id" : response.data.user._id,
        "firstName" : response.data.user.firstName,
        "lastName" : response.data.user.lastName,
        "username" : response.data.user.username,
        "emailAddress" : response.data.user.emailAddress,
        "profileImage" : response.data.user.profileImage,
        
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const onLogoutHandler = (e) => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser("");
    popupHandler({"type": "success", "message": "User logged out successfully!"});
    setCurrentUser(null);
    setIsSignedUp(false);
  };


  // POPUP FUNCTIONS
    const delay = (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    );


    const popupHandler = async (obj) => {
      setPopup(obj)
      setShowPopup(true);
      await delay(3000);
      setShowPopup(false);
    }


  // MISC APP FUNCTIONS

  const loadCountryList = () => {
    Axios.get("../../country/index")
      .then((response) => {
        setAllCountries(response.data.countries)
      })
      .catch((error) => {
          console.log(error)
      })
  }

  
  const addTrip = (trip) => {
    Axios.post("trip/add", trip, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then((response) => {
        console.log("Trip added successfully!")
        console.log("RESPONSE: ", response)
        popupHandler({"type": "success", "message": "Trip added successfully!"});
    })
    .catch((error) => {
        console.log("Error adding Trip. Please try again later.");
        console.log(error);
        popupHandler({"type": "error", "message": "Error adding Trip. Please try again later!"});
    })
  }


  return (
    <Router>
      <div className="app-all-containers">
        <nav>

          {/*  */}
          <div className="nav">
            <label for="toggle">&#9776;</label>
            <input type="checkbox" id="toggle"></input>
            <div className="menu">
              {isAuth ? (
                <div>
                  <Link to="/topten" className="nav-mobile-link">TOP 10 TRIPS</Link> {"  "}
                  <Link to="/browse" className="nav-mobile-link">BROWSE TRIPS</Link> {"  "}
                  <Link to="/mytrips" className="nav-mobile-link">MY TRIPS</Link>{" "}
                  <Link to="/favs" className="nav-mobile-link">FAVS</Link>{" "}
                  <Link to="/addtrip" className="nav-mobile-link " >ADD A TRIP</Link> {" "}
                  <Link to="/profile" className="nav-mobile-link">PROFILE</Link>{"   "}
                  <Link to="/" className="nav-mobile-link" onClick={onLogoutHandler}>LOGOUT</Link>{"  "}
                </div>
              ) : (
                <div className="nav-top-auth-items">
                  <Link to="/signup" className="nav-mobile-link">SIGN UP</Link>{"  "}
                  <Link to="/signin" className="nav-mobile-link">SIGN IN</Link>{"  "}
                  <Link to="/topten" className="nav-mobile-link">TOP 10 TRIPS</Link>
                  <Link to="/browse" className="nav-mobile-link">BROWSE TRIPS</Link>
                </div>
              )}
            </div>
          </div>
          {/*  */}



          <div className="nav-top-auth-container">
            {isAuth ? (
              <div>
                <Link to="/profile" className="nav-top-auth-items-link">PROFILE</Link>{"   "}
                <Link to="/" className="nav-top-auth-items-link" onClick={onLogoutHandler}>LOGOUT</Link>{"  "}
 
              </div>
            ) : (
              <div className="nav-top-auth-items">
                <Link to="/signup" className="nav-top-auth-items-link">SIGN UP</Link>{"  "}
                <Link to="/signin" className="nav-top-auth-items-link">SIGN IN</Link>{"  "}

              </div>
            )}
          </div>

          <div>
            <a href="/"><img src="/img/triptips-logo-2.png" className="nav-logo"/></a>
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
          {
              (showPopup) ?
              <Popup type={popup.type} message={popup.message}/>
              :
              <></>
          }
          <Routes>
            <Route path="/" element={<TopTen />} ></Route>
            <Route path="/profile" element={<Profile currentUser={currentUser} isAuth={isAuth} onLogoutHandler={onLogoutHandler} profileHandler={profileHandler} popupHandler={popupHandler}/>}></Route>
            <Route path="/signup" element={ isSignedUp ? <Navigate to="/signin" /> : <Signup register={registerHandler}/> }></Route>
            <Route path="/signin" element={ isAuth ? <Navigate to="/" /> : <Signin login={loginHandler} />}></Route>
            <Route path="/topten" element={<TopTen />}></Route>
            <Route path="/browse" profileHandler={profileHandler} element={<BrowseTrips user={user} currentUser={currentUser}/>}></Route>
            <Route path="/mytrips" element={<MyTrips user={user} currentUser={currentUser} profileHandler={profileHandler}/>}></Route>
            <Route path="/favs" element={<Favs user={user} currentUser={currentUser}/>}></Route>
            <Route path="/addtrip" element={<TripCreateForm currentUser={currentUser} allCountries={allCountries} addTrip={addTrip} profileHandler={profileHandler}/>}></Route>
            <Route path="/trip/detail/:id" element={<TripDetail isAuth={isAuth} user={user} currentUser={currentUser} profileHandler={profileHandler} popupHandler={popupHandler} />}/>
          </Routes>
        </div>

      </div>
      <div className="footer-container">
        <footer className="footer"></footer>
      </div>
    </Router>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './TripSnippet.css';

export default function TripSnippet(props) {
  const [liked, setLiked] = useState();

  // Like Functionality
  // console.log(props.currentUser.id);
  let likedBy = props.currentUser?.id;

  const editLike = (id) => {
    Axios.get(`trip/editLike?id=${id}`, {
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
  })
      .then((response) => {
        console.log("EDIT LIKE LOAD: ", response);
        var trip = response.data.trip;
        props.setCurrentTrip(trip);
      })
      .catch((error) => {
        console.log("Error on editLike");
        console.log(error);
      });
  };

  const updateLike = (trip) => {
    console.log("UPDATE LIKE TRIP ARG", trip)
    Axios.put("trip/updateLike", trip)
    .then((response) => {
      console.log("Updated like information")
    })
    .catch((error) => {
      console.log("Error updating like information")
      console.log(error)
    })
  }

  const handleLikeChange = (e) => {
    let trip = props;
    console.log("TRIP FIRST", props)
    // console.log(e)
    console.log(trip.favs)
    // props.favs = likedBy;
    // trip = {"favs": likedBy};
    // trip["favs"] = likedBy;

    console.log("TRIP", trip)
    props.setCurrentTrip(trip);
    updateLike(props);
    console.log("CT", props)
  };

  const handleClick = (event) => {
    console.log("HANDLECLICK:", event);
    // call editLike(currentTrip._id)
    editLike(props.currentTrip._id);
    setLiked(true);
    handleLikeChange();
  };

  return (
    <>
    <div className="trip-container">
      <div className="trip-container-left">
        <div className="trip-container-title" >
          <h4>{props.title}</h4>
          <div>by @{props.createdBy.username}</div>  
          <img src={`./img/${props.rating}-star.png`} alt='star' className='rating-star'></img>
          {!liked ? (
            <img
              src="/img/heart_empty.png"
              alt="empty heart"
              id="emptyHeart"
              onClick={handleClick}
            ></img>
          ) : (
            <img
              src="/img/heart_full.png"
              alt="full heart"
              id="emptyHeart"
              value={likedBy}
            ></img>
          )}
        </div>
        <br />
        <p>{props.city}, {props.country.name}</p>
        <p>{props.summary}</p>
        <p ><Link to={`/trip/detail/${props._id}`} className="trip-see-more">+ see more</Link></p>
      </div>
      <div className="trip-container-right">
        <div className="trip-container-right-img"><img src="./img/paris.jpg" alt="paris" className="trip-img"></img></div>
      </div>
    </div>
      <hr/>
    </>
  );
}

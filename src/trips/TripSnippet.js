import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export default function TripSnippet(props) {
  const [liked, setLiked] = useState();

  // Like Functionality
  // console.log(props.currentUser.id);
  let likedBy = props.currentUser?.id;

  const editLike = (id) => {
    Axios.get(`trip/editLike?id=${id}`)
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
    props.editTrip(props.currentTrip);
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
      <h4>{props.title}</h4> by {props.createdBy.username} &nbsp; {props.rating}{" "}
      &nbsp;
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
      <br />
      {props.country.name}, {props.city}
      <p>{props.summary}</p>
      <Link to={`/trip/detail/${props._id}`}>+ see more</Link>
      <hr />
    </>
  );
}

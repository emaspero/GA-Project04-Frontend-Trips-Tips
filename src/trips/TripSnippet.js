import React from 'react';
import { Link } from "react-router-dom";

export default function TripSnippet(props) {

  return (
    <>
    
    <h4>{props.title}</h4> by {props.createdBy.username} &nbsp; {props.rating} &nbsp;
    {
      !props.liked ? (
        <img src='/img/heart_empty.png' alt='empty heart' id='emptyHeart' onClick={props.handleClick}></img>
      )
      :
      (
        <img src='/img/heart_full.png' alt='full heart' id='emptyHeart' value={props.likedBy} ></img>
      )
    }

    <br />
    {props.country.name}, {props.city}
    <p>{props.summary}</p>

    <Link to={`/trip/detail/${props._id}`}>+ see more</Link>
    <hr />

    </>
  )
}


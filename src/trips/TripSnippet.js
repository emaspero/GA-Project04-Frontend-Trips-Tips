import React from 'react';
import { Link } from "react-router-dom";

export default function TripSnippet(props) {

  return (
    <>
    
    <h4>{props.title}</h4> by username-here &nbsp; {props.rating}
    <br />
    {props.country.name}, {props.city}
    <p>{props.summary}</p>

    <Link to={`/trip/detail/${props._id}`}>+ see more</Link>
    <hr />

    </>
  )
}


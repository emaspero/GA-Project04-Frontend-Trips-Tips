import React from 'react'

export default function TripDetail(props) {
  return (
    <>
    <h4>{props.title}</h4> by username-here &nbsp; {props.rating}
    <br />
    {props.country}, {props.city}
    <p>{props.summary}</p>
    + see more -Link TBC
    <button onClick={() => {props.singleTrip(props._id)}} > + see more </button>
    
    <hr />
    </>
  )
}

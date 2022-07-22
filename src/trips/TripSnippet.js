import React from "react";
import { Link } from "react-router-dom";
import './TripSnippet.css';

export default function TripSnippet(props) {

  return (
    <>
    <div className="trip-container">
      <div className="trip-container-left">
        <div className="trip-container-title" >
          <h4>{props.title}</h4>
          <div>by @{props.createdBy.username}</div>  
          <img src={`./img/${props.rating}-star.png`} alt='star' className='rating-star'></img>
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

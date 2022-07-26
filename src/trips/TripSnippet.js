import React from "react";
import { Link } from "react-router-dom";
import './TripSnippet.css';

export default function TripSnippet(props) {

  return (
    <>
    {props.createdBy? (
          <div className="trip-container">
            <div className="trip-container-left">
              <div className="trip-container-title" >
                <div className="trip-container-title-left">
                  <h4>{props.title}</h4>
                  <div className="by-username"> {"  "} by @{props.createdBy.username}</div>
                </div>
                <div className="trip-container-title-right">
                  <img src={`./img/${props.rating}-star.png`} alt='star' className='rating-star'></img>
                  <img src="/img/heart_full.png" alt="full heart" id="heartPic"></img>
                  <div className="favs-number">{props.favs.length}</div>
                </div>
              </div>
              <br />
              <div className="trip-location">{props.city}, {props.country.name}</div>
              <div id="trip-description">{props.summary}</div>
              <div><Link to={`/trip/detail/${props._id}`} className="trip-see-more">+ see more</Link></div>
            </div>
            <div className="trip-container-right">
              <div className="trip-container-right-img"><img src="./img/paris.jpg" alt="paris" className="trip-img"></img></div>
            </div>
        </div>
    ) :null}

      <hr/>
    </>
  );
}

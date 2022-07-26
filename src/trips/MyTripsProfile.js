import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

export default function MyTripsProfile(props) {

    let allMyTrips = [];
    let [ trips, setTrips ] = useState([])

    useEffect(() => {
        loadTripsList()
    }, [props.currentUser.id])

    const loadTripsList = () => {
        Axios.get("trip/index")
        .then((response) => {
            for (const trip of response.data.trips) {
                if (trip.createdBy._id === props.currentUser.id)
                    allMyTrips.push(trip);
              }
              setTrips(allMyTrips)
        })
        .catch((error) => {
            console.log(error)
        })
    };

    const allMyTripsMap = trips.map((trip, index) => (
        <div className='mytrips-profile-container'>
            <div key={index} className='mytrips-profile-title'>
                {/* <a href={`/trip/detail/${trip._id}`} className='mytrips-profile-title'>{trip.title}</a> */}
                <Link to={`/trip/detail/${trip._id}`} className='mytrips-profile-title'>{trip.title}</Link>
            </div>
            <br></br>
            <div><img src={`./img/${trip.rating}-star.png`} alt='star' className='rating-star'></img></div>
            <br></br>
            <br></br>
        </div>
    ));



  return (
    <div>
        <h3>MY TRIPS</h3>
        {allMyTripsMap}
    </div>
  )
}

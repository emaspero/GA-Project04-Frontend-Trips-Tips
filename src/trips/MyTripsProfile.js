import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react'

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
        <div key={index}>{trip.title}</div>
    ));

  return (
    <div>
        MY TRIPS
        {allMyTripsMap}
    </div>
  )
}

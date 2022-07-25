import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TripSnippet from './TripSnippet';

export default function TopTen() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTripList()
  }, []);

  const loadTripList = () => {
    Axios.get("trip/index")
    .then((response) => {
      // console.log("RESPONSE DATA FOR TRIP INDEX: ", response);
      setTrips(response.data.trips)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const topTenTrips = trips.slice(0, 10).sort((a, b) => b.favs.length - a.favs.length).map((trip, index) => (
    <div key={index}>
      <TripSnippet {...trip} trips={trips} />
    </div>
  ))


  return (
    <div>
      <h1>🏆 TOP TEN</h1>
      {topTenTrips}
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TripSnippet from './TripSnippet';
import './../Forms.css';

export default function BrowseTrips(props) {
  // All/CURRENT TRIP STATES
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState("");

  // EDIT STATE TO RESET FILTER
  const [isEdit, setIsEdit] = useState(false);

  // COUNTRY FILTER STATES
  const [isFilter, setIsFilter] = useState(false)
  const [filteredTripList, setFilteredTripList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    loadTripList()
    var filteredData = filterByCountry(trips);
    setFilteredTripList(filteredData)
  }, [selectedCountry]);

  // LOAD ALL/SINGLE TRIPS FUNCTIONS
  const loadTripList = () => {
    Axios.get("trip/index")
    .then((response) => {
      console.log("RESPONSE DATA FOR TRIP INDEX: ", response);
      setTrips(response.data.trips)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const singleTrip = (id) => {
    Axios.get(`trip/detail/${id}`)
    .then((response) => {
        console.log("Loaded Trip information")
        console.log(response.data.trip)

        var trip = response.data.trip
        setCurrentTrip(trip)
        
    })
    .catch((error) => {
      console.log("Error loading trip information")
      console.log(error)
    })
  }

  // EDIT TRIP FUNCTION
  const editTrip = (trip) => {
    Axios.put("trip/update", trip)
    .then((response) => {
      console.log("Updated trip information")
    })
    .catch((error) => {
      console.log("Error updating trip information")
      console.log(error)
    })
  }
  
  // FILTER FUNCTIONS & VARIABLES
  const filterByCountry = (filteredData) => {
    if (!selectedCountry) {
      return filteredData;
    }
    const filteredTrips = filteredData.filter(
      (trip) => trip.country.name === selectedCountry
    );
    console.log("FILTERED TRIPS: ", filteredTrips)
    console.log("isFilter: ", isFilter)
    return filteredTrips;
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value)
    if (event.target.value === "All") {
      setIsFilter(false)
    } else {
      setIsFilter(true)
    }
  }
  
  const allTrips = trips.map((trip, index) => (
    <div key={index}>
      <TripSnippet {...trip} profileHandler={props.profileHandler} singleTrip={singleTrip} trip={currentTrip} trips={trips} user={props.user} currentUser={props.currentUser} setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} editTrip={editTrip} popupHandler={() => props.popupHandler()}/>
    </div>
  ));

  const allFilteredTrips = filteredTripList.map((trip, index) => (
    <div key={index}>
      <TripSnippet {...trip} profileHandler={props.profileHandler} singleTrip={singleTrip} trip={currentTrip} trips={trips} user={props.user} currentUser={props.currentUser} setCurrentTrip={setCurrentTrip} currentTrip={currentTrip} editTrip={editTrip} popupHandler={() => props.popupHandler()}/>
    </div>
  ));

  const allTripCountries = trips.sort((a, b) => (a.country.name > b.country.name ? 1 : ((b.country.name > a.country.name) ? -1 : 0))).map((trip, index) => (
    trip.country.name
  ));

  const dedupedCountries = Array.from(new Set(allTripCountries)).map((country, index) => (
    <option key={index} value={country}>{country}</option>
  ));


  return (
    <div>
      <h1>BROWSE TRIPS</h1>
      <div><h3>Filter by Country:</h3></div>
      <div className='select'>
        <select
            id="country-input"
            // value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="All">All Countries</option>
            {dedupedCountries}
          </select>
      </div>
      {(!isFilter) ?
      allTrips
      :
      allFilteredTrips
      }
    </div>
  )
} 

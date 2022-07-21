import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import TripCreateForm from './TripCreateForm';
import TripEditForm from './TripEditForm';

export default function Trip(props) {
    const [countries, setCountries] = useState([]);
    const [currentTripCities, setCurrentTripCities] = useState([]);

    useEffect(() => {
        loadCountryList();
        // loadTripCities()
      }, []);

    const addTrip = (trip) => {
        Axios.post("trip/add", trip, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        .then((response) => {
            console.log("Trip added successfully!")
        })
        .catch((error) => {
            console.log("Error adding Trip. Please try again later.");
            console.log(error);
        })
    }

    // AXIOS CALL TO GET FULL COUNTRY DATA
    const loadCountryList = () => {
        // console.log("Trip.js - ALL COUNTRIES: ", countries)
        // console.log("Trip.js - props.trip: ", props.trip)
        if (!props.isEdit){
            Axios.get("country/index")
            .then((response) => {
                console.log("COUNTRIES FULL LIST NOT EDIT: ", response)
                setCountries(response.data.countries)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            Axios.get("../../country/index")
            .then((response) => {
                console.log("COUNTRIES FULL LIST EDIT: ", response)
                setCountries(response.data.countries)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    
    // const loadTripCities = (event) => {
    //     if (props.isEdit) {
    //         console.log("setCities - PROPS TRIP: ", props.trip)
    //         console.log("setCities - COUNTRY LIST: ", props.countries)
    //         let selectedCountry = props.countries.find(country => country?._id === props.trip.country);
    //         console.log("SELECTED COUNTRY: ", selectedCountry)
    //         let cities = selectedCountry?.cities
    //         console.log("SELECTED COUNTRY CITIES: ", cities)
    //         setCurrentTripCities(cities)  
    //     }
    //     return []
    // }

    //   SET DROPDOWN OF CITIES BASED ON EXISTING TRIP
    //   let selectedCountry = countries.find(country => country._id === props.trip.country);
    //   console.log("SELECTED COUNTRY: ", selectedCountry)
    //   console.log("SELECTED COUNTRY NAME: ", selectedCountry.name)
    //   let cities = selectedCountry?.cities
    //   console.log("SELECTED COUNTRY CITIES: ", cities)
    //   setCurrentCities(cities)

  return (
    <div>
        {
            (!props.isEdit) ?
            <TripCreateForm addTrip={addTrip} countries={countries} currentUser={props.currentUser}/>
            :
            <TripEditForm tripId={props.tripId} trip={props.trip} editTrip={props.editTrip} countries={countries}/>
        }
        
    </div>
  )
}



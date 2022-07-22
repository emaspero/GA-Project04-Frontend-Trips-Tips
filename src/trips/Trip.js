import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import TripCreateForm from './TripCreateForm';
import TripEditForm from './TripEditForm';

export default function Trip(props) {
    const [countries, setCountries] = useState(props.countriesList);
    const [cities, setCities] = useState([]);
    console.log("COUNTRIES TRIPJS", countries)
    console.log("COUNTRY LIST TRIPJS", props.countriesList)

    useEffect(() => {
        loadTripCities();

      }, [cities]);

    //  ADD A TRIP
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

    // GET CITIES FROM COUNTRY DATA 

    const loadTripCities = (event) => {
        let selectedCountry = countries?.find(country => country?._id === props.trip.country);
        setCities(selectedCountry.cities)}


    return (
        <div>
            {
                (!props.isEdit) ?
                <TripCreateForm addTrip={addTrip} countries={countries} currentUser={props.currentUser}/>
                :
                <TripEditForm tripId={props.tripId} trip={props.trip} editTrip={props.editTrip} countries={countries} cities={cities}/>
            }
            
        </div>
    )
}
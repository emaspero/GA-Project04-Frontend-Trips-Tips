import React, { useState, useEffect }  from 'react';
import TripEditForm from './TripEditForm';

export default function Trip(props) {
    const [countries, setCountries] = useState(props.countriesList);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        loadTripCities();

      }, [cities]);


    // GET CITIES FROM COUNTRY DATA 

    const loadTripCities = (event) => {
        let selectedCountry = countries?.find(country => country?._id === props.trip.country);
        setCities(selectedCountry.cities)}


    return (
        <div>
            <TripEditForm tripId={props.tripId} trip={props.trip} editTrip={props.editTrip} countries={countries} cities={cities} popupHandler={(obj) => props.popupHandler(obj)}/>
        </div>
    )
}
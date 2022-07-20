import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import TripCreateForm from './TripCreateForm';
import TripEditForm from './TripEditForm';

export default function Trip(props) {
    const [countries, setCountries] = useState([]);
    const [currentTripCities, setCurrentTripCities] = useState([]);

    useEffect(() => {
        loadCountryList()
      }, []);

    const addTrip = (trip) => {
        Axios.post("trip/add", trip)

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
        if (!props.isEdit){
            Axios.get("country/index")
            .then((response) => {
                console.log("COUNTRIES FULL LIST: ", response)
                setCountries(response.data.countries)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            Axios.get("../../country/index")
            .then((response) => {
                console.log("COUNTRIES FULL LIST: ", response)
                setCountries(response.data.countries)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    // console.log("CURRENT TRIP: ", props.trip)
    // console.log("ALL COUNTRIES: ", countries)

    //   // SET DROPDOWN OF CITIES BASED ON EXISTING TRIP
    //   let selectedCountry = countries.find(country => country._id === props.trip.country);
    //   console.log("SELECTED COUNTRY: ", selectedCountry)
      // console.log("SELECTED COUNTRY NAME: ", selectedCountry.name)
      // let cities = selectedCountry.cities
      // console.log(cities)
      // setCurrentCities(cities)

  return (
    <div>
        {
            (!props.isEdit) ?
            <TripCreateForm addTrip={addTrip} countries={countries}/>
            :
            <TripEditForm tripId={props.tripId} trip={props.trip} editTrip={props.editTrip} countries={countries} />
        }
        
    </div>
  )
}



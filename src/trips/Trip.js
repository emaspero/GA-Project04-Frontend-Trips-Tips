import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import TripCreateForm from './TripCreateForm';

export default function Trip() {
    const [countries, setCountries] = useState({});

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

    const loadCountryList = () => {
        Axios.get("country/index")
        .then((response) => {
            console.log(response)
            setCountries(response.data.countries)
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div>
        <TripCreateForm countryList={countries} addTrip={addTrip} />
    </div>
  )
}


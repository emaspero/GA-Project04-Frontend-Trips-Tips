import React from 'react';
import Axios from 'axios';
import TripCreateForm from './TripCreateForm';

export default function Trip() {

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

  return (
    <div>
        <TripCreateForm addTrip={addTrip} />
    </div>
  )
}

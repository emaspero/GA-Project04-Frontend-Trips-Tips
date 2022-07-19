import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


export default function TripDetail(props) {
    let {id} = useParams();
    // console.log("detail console log", props)
    // console.log("props trip", props.trip)

    const [currentTrip, setCurrentTrip] = useState({});

    useEffect (() => {
        if (id) {
          Axios.get(`../../trip/detail/${id}`)
          .then((response) => {
            console.log("AXIOS RESPONSE DATA: ", response.data)
            let trip = response.data.trip
            setCurrentTrip(trip)
          })
          .catch((error) => {
              console.log(error)
          })
        }
    }, [id]);

    return (
      <div>
          <h4>{currentTrip.title}</h4> by username-here {currentTrip.rating}
          <div>{currentTrip.city}, {currentTrip.country}</div>
          <p>{currentTrip.summary}</p>
      </div>
    )
}

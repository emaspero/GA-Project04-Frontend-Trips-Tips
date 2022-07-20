import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react'



export default function MyTripsProfile(props) {

    const [trips, setTrips] = useState("");
    const currentUser = props.currentUser;

    useEffect(() => {
        const loadTripList = () => {
            Axios.get("trip/index")
            .then((response) => {
              setTrips(response.data.trips)
            })
            .catch((error) => {
              console.log(error)
            })
        };
    
        loadTripList()
    
    }, [])
    
    // const allTrips = trips.map((trip, index) => {
    //     <div key={index}>
    //     {/* <MyTripProfileSnippet {...trip} trip={trip}/> */}
    //   </div>    }
    // );

    




  return (
    <div>
            {/* {allTrips} */}
    </div>
  )
}

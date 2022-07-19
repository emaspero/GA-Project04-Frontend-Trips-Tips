import { Axios } from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter as useParams } from "react-router-dom";


export default function TripDetail(props) {
    // let {id} = useParams();
    console.log("detail console log", props)
    console.log("props trip", props.trip)

    // useEffect (() => {
    //     oneTrip()
    // }, []);

    // const oneTrip = (id) => {
    //     Axios.get(`trip/detail/${id}`)

    //     .then((response) => {
    //         console.log(response.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }; 


  return (
    <div>
        {/* <h3>tripId: {id}</h3> */}
        <h4>{props.title}</h4>
        test
    </div>
  )
}

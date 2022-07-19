import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Trip from './Trip';
import TripEditForm from './TripEditForm';


export default function TripDetail(props) {
    let {id} = useParams();
    // console.log("detail console log", props)
    // console.log("props trip", props.trip)

    const [currentTrip, setCurrentTrip] = useState({});
    const [isEdit, setIsEdit] = useState(false);


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

    const editView = (id) => {
        Axios.get(`../../trip/edit?id=${id}`)
        .then((response) => {
          console.log("Loaded trip information for editing", response.data.trip)
          var trip = response.data.trip
          setIsEdit(true)
          setCurrentTrip(trip)
        })
        .catch((error) => {
          console.log("Error loading trip information for editing")
          console.log(error)
        })
      }
    
    const editTrip = (trip) => {
        Axios.put("../../trip/update", trip)
        .then((response) => {
          console.log("Updated trip information")
        })
        .catch((error) => {
          console.log("Error updating trip information")
          console.log(error)
        })
      }

    return (
      <div>
          <h4>{currentTrip.title}</h4> by username-here {currentTrip.rating}
          <div>{currentTrip.city}, {currentTrip.country}</div>
          <p>{currentTrip.summary}</p>
          <button onClick={() => {editView(currentTrip._id)}}>Edit</button>


        {
            (isEdit) ?
            <Trip key={currentTrip._id} trip={currentTrip} editTrip={editTrip} isEdit={isEdit}/>
            :
            <></>
        }

      </div>

 
    )
}

import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Trip from './Trip';
import { useNavigate } from 'react-router-dom'

export default function TripDetail(props) {
    let {id} = useParams();

    const [currentTrip, setCurrentTrip] = useState(null);
    const [isEdit, setIsEdit] = useState(false);    
    const [countries, setCountries] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [currentUser, setCurrentUser] = useState(props.user.user);
    const navigate = useNavigate()


    useEffect (() => {
  
      loadTripDetails(id)

    }, [id]);

    const loadTripDetails = (id) => {
      if (id) {
        Axios.get(`../../trip/detail/${id}`)
        .then((response) => {
          let trip = response.data.trip
          setCurrentTrip(trip)

        })
        .catch((error) => {
            console.log(error)
        })
      }
      loadCountryList()
    }

    const editView = (id) => {
        Axios.get(`../../trip/edit?id=${id}`, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
        .then((response) => {
          var trip = response.data.trip
          setIsEdit(true)
          setCurrentTrip(trip)
        })
        .catch((error) => {
          console.log("Error loading trip information for editing")
          console.log(error)
        })
      };
    
    const editTrip = (trip) => {
        Axios.put("../../trip/update", trip, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
        .then((response) => {
          console.log("Updated trip information")
          setIsEdit(false);
          loadTripDetails();
          // props.profileHandler();
          // setCurrentUser(props.user.user);
          // window.location.reload()
          // navigate(`../../mytrips`)
        })
        .catch((error) => {
          console.log("Error updating trip information")
          console.log(error)
        })
      };

    const deleteTrip = (id) => {
      Axios.delete(`../../trip/delete?id=${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
      .then((response) => {
        console.log("Trip deleted successfully")
        // where should we be redirected after deleting a trip?
      })
      .catch((error) => {
        console.log("Error deleting trip")
        console.log(error)
      })
    }

    // GET FULL COUNTRY DATA *AXIOS*
    const loadCountryList = () => {
      Axios.get("../../country/index")
        .then((response) => {
            setCountries(response.data.countries)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // LIKE FUNCTIONALITY

    const updateLike = (trip) => {
    console.log("UPDATE LIKE TRIP ARG", trip)
    Axios.put("../../trip/updateLike", trip, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        console.log("Updated like information")
        setIsLiked(true)   
        loadTripDetails(id)   
      })
      .catch((error) => {
        console.log("Error updating like information")
        console.log(error)
      })
      
    }
  
    const handleLikeChange = () => {
      let trip = currentTrip;
      updateLike(trip);
      setIsLiked ? (setIsLiked(false)) : (setIsLiked(true))
    };

    let idMatch = false
    if (currentTrip) {
      idMatch = (currentTrip.createdBy?._id === props?.currentUser?.id) ? true : false
      console.log("ID MATCH", idMatch)
    }
    else{
      console.log("no ID match")
    }


    return (
      <div>
        {/* { currentUser? (
          <div> */}

        { currentTrip? (

          <div>
          <h4>{currentTrip.title}</h4> 
          <p>by {currentTrip.createdBy?.username} {currentTrip.rating}</p>
          


          {(currentTrip.favs.includes(`${currentUser?.id}`)) ? (
            <img
              src="/img/heart_full.png"
              alt="full heart"
              id="heartPic"
              onClick={handleLikeChange}
            ></img>
          ) : (
            <img
              src="/img/heart_empty.png"
              alt="empty heart"
              id="emptyHeart"
              onClick={handleLikeChange}
            ></img>
          )}

          <div>{currentTrip.city}, {currentTrip.country?.name}</div>
          <p>{currentTrip.summary}</p>
        
          {(props.isAuth && idMatch === true) ?
          <div>
          <button onClick={() => {editView(currentTrip._id)}}>Edit</button>
          <button onClick={() => {deleteTrip(currentTrip._id)}}>Delete</button>
          </div>
          :
          <></>

          }
          
          {
              (isEdit) ?
              <Trip tripId={currentTrip._id} trip={currentTrip} editTrip={editTrip} isEdit={isEdit} countriesList={countries}/>
              :
              <></>
          }
          </div>):null}
          </div>
          )
          // :null}
        
        // </div>
      // )
    }  


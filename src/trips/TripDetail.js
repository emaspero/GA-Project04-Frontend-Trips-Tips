import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Trip from './Trip';


export default function TripDetail(props) {
    let {id} = useParams();

    const [currentTrip, setCurrentTrip] = useState({});
    const [isEdit, setIsEdit] = useState(false);    
    const [countries, setCountries] = useState([]);
    // console.log("COUNTRIES TRIPDETAIL", countries)

    useEffect (() => {
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

    }, [id]);

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
          window.location.reload()
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

    // Like Functionality 
    const editLike = (id) => {
      Axios.get(`../../trip/editLike?id=${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then((response) => {
          console.log("EDIT LIKE LOAD: ", response);
          var trip = response.data.trip;
          setCurrentTrip(trip);
        })
        .catch((error) => {
          console.log("Error on editLike");
          console.log(error);
        });
    };
  
    const updateLike = (trip) => {
      console.log("UPDATE LIKE TRIP ARG", trip)
      Axios.put("../../trip/updateLike", trip, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
      .then((response) => {
        console.log("Updated like information")
      })
      .catch((error) => {
        console.log("Error updating like information")
        console.log(error)
      })
    }
  
    const handleLikeChange = () => {
      let trip = currentTrip;
      // console.log("TRIP FIRST", currentTrip)
      setCurrentTrip(trip);
      updateLike(trip);
      // console.log("CT", trip)
    };
  
    const handleClick = (event) => {
      // console.log("HANDLECLICK:", event);
      editLike(currentTrip._id);
      handleLikeChange();
    };

    // console.log("CURRENT TRIP ID", currentTrip.createdBy?._id)
    // console.log("CURRENT USER", props?.currentUser?.id)

    let idMatch = (currentTrip.createdBy?._id === props?.currentUser?.id) ? true : false
    console.log("ID MATCH", idMatch)
      
    if (currentTrip) {

    return (
      <div>
        
          <h4>{currentTrip.title}</h4> by {currentTrip.createdBy?.username} {currentTrip.rating}

          {currentTrip.favs && currentTrip.favs.includes(`${props.currentUser.id}`) ? (
            <img
              src="/img/heart_full.png"
              alt="full heart"
              id="emptyHeart"
              onClick={handleClick}
            ></img>
          ) : (
            <img
              src="/img/heart_empty.png"
              alt="empty heart"
              id="emptyHeart"
            ></img>
          )}

          <div>{currentTrip.city}, {currentTrip.country?.name}</div>
          <p>{currentTrip.summary}</p>
          {
            props.isAuth && idMatch === true ?
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

        </div>
      )
    }  
}

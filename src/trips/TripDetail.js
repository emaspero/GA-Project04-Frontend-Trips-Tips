import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Trip from './Trip';
import { useNavigate } from 'react-router-dom';

export default function TripDetail(props) {
    let {id} = useParams();

    const [currentTrip, setCurrentTrip] = useState(null);
    const [isEdit, setIsEdit] = useState(false);    
    const [countries, setCountries] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [currentUser, setCurrentUser] = useState(props.user.user);
    let navigate = useNavigate();


    const routeChange = () => {
      let path = `/mytrips`;
      navigate(path);
    }


    useEffect (() => {
  
      loadTripDetails(id)

    }, [id]);

    const loadTripDetails = (id) => {
      if (id) {
        Axios.get(`../../trip/detail/${id}`)
        .then((response) => {
          let trip = response.data.trip
          setCurrentTrip(trip)
          // props.popupHandler({"type": "success", "message": "Updated trip information!"});

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
          props.popupHandler({"type": "error", "message": "Error loading trip information for editing - please try again"});
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
          props.popupHandler({"type": "success", "message": "Updated trip information!"});
          loadTripDetails(id);
        })
        .catch((error) => {
          console.log("Error updating trip information")
          console.log(error)
          props.popupHandler({"type": "error", "message": "Error updating trip information - please try again"});
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
        routeChange()
        props.popupHandler({"type": "success", "message": "Trip deleted successfully!"});
      })
      .catch((error) => {
        console.log("Error deleting trip")
        console.log(error)
        props.popupHandler({"type": "error", "message": "Error deleting trip - please try again"})
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

    console.log("IS EDIT",isEdit)
    console.log(currentTrip)

    return (
      <div>
        {(currentTrip)? 
        ((!isEdit)? 
        
          <div>
            <div className="trip-container">
              <div className="trip-container-left">
                <div className="trip-container-title" >
                  <div className="trip-container-title-left">
                    <h4>{currentTrip.title}</h4>
                    <div className="by-username"> {"  "} by @{currentTrip.createdBy.username}</div>
                  </div>
                  <div className="trip-container-title-right">
                    <img src={`/img/${currentTrip.rating}-star.png`} alt='star' className='rating-star'></img>
                    <img src="/img/heart_full.png" alt="full heart" id="heartPic"></img>
                    <div className="favs-number">{currentTrip.favs.length}</div>
                  </div>
                </div>
                <br />
                <div className="trip-location">{currentTrip.city}, {currentTrip.country.name}</div>
                <div id="trip-description">{currentTrip.summary}</div>
              </div>
              <div className="trip-container-right">
                <div className="trip-container-right-img">
                  {(currentTrip.image)
                    ?
                    <img alt="tripimage" className="trip-img" src={currentTrip.image}></img>
                    :
                    <img src="/img/paris.jpg" alt="paris" className="trip-img"></img>
                  }
                </div>
              </div>
            </div>
      
            {(props.isAuth && idMatch === true) ?
              <div>
                <button onClick={() => {editView(currentTrip._id)}}>Edit</button> {' '}
                <button onClick={() => {deleteTrip(currentTrip._id)}}>Delete</button>
              </div>
            :
            <></>}

          </div> : 
          <div>
            <Trip tripId={currentTrip._id} trip={currentTrip} editTrip={editTrip} isEdit={isEdit} countriesList={countries} popupHandler={() => props.popupHandler()}/>
          </div>)
        : 
        (<div><img src='/img/loading.gif'/></div>)}
      </div>
    )  
}


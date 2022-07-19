import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TripDetail from './TripDetail';


export default function TripSnippet(props) {
  // const navigate = useNavigate();
  // console.log("from snippet", props)
  // console.log(props.trips)
  

  // const tripOne = props.trips.map((trip) => {
  //   // console.log("trp from snippet", trip)
  //   return (
  //     <TripDetail trip={trip} prop={props} ct={props.trip} singleTrip={props.singleTrip} />
  //   )
  //   })

  return (
    // <Router>
    <>
    
    <h4>{props.title}</h4> by username-here &nbsp; {props.rating}
    <br />
    {props.country.name}, {props.city}
    <p>{props.summary}</p>
    
    {/* <button onClick={() => navigate(`/trip/detail/${props._id}`)} > + see more </button> */}
    <Link to={`/trip/detail/${props._id}`}>+ see more</Link>
    <hr />
    {/* {tripOne} */}

    {/* {/* <Routes> */}
      {/* <Switch> */}
      {/* <Route path="/trip/detail/:id" element={<TripDetail />}/> */}
      {/* </Switch> */}
    {/* </Routes> */} 
    </>

   

    // </Router>
  )
}


// `/trip/detail?id=${props.singleTrip(props._id)}`
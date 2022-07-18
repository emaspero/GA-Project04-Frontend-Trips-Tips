import React, { useState } from 'react';

export default function TripCreateForm(props) {
  const [newTrip, setNewTrip] = useState({});

  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value 

    const trip = {...newTrip}
    trip[attributeToChange] = newValue
    console.log(trip)
    setNewTrip(trip)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTrip(newTrip);
    event.target.reset()
  };

  const allCountries = props.countries.map((country, index) => {
    // console.log(country.cities)
    return <option key={index} value={country._id}>{country.name}</option>
})



  // const allCities = props.countries.cities.map((city, index) => (
  //   <option key={index} value={city.name}>{city.name}</option>
  // ))


  return (
    <div>
      <h1>ADD A TRIP</h1>
      <form onSubmit={handleSubmit} >
        <div>
          {/* <label>Title</label> */}
          <input type="text" name="title" placeholder="Title" onChange={handleChange}></input>
        </div>

        <div>
            <select id="country" name="country" onChange={handleChange} required>
              <option selected disabled hidden>Choose a Country</option>
              {allCountries}
            </select>
        </div>

        <div>
          {/* <label>City</label> */}
          <input type="text" name="city" placeholder="City" onChange={handleChange}></input>
        </div>

        <div>
          {/* <label>Summary</label> */}
          <input type="text" name="summary" placeholder="Description" onChange={handleChange}></input>
        </div>

        <div>
          {/* <label>Rating</label> */}
          <input type="text" name="rating" placeholder="Rating" onChange={handleChange}></input>
        </div>

        <div>
          <input type="submit" value="Add Trip"></input>
        </div>
      </form>
    </div>
  )
}

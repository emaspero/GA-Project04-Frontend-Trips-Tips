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

  // const allCountries = props.countryList.map((country, index) => (
  //   <option id={index} value={country.id}>{country.name}</option>
  // ))

  console.log(props.countryList)

  return (
    <div>
      <h1>Add a Trip</h1>
      <form onSubmit={handleSubmit} >
        <div>
          {/* <label>Title</label> */}
          <input type="text" name="title" placeholder="Title" onChange={handleChange}></input>
        </div>

        <div>
          <label>Country</label>
            {/* <select id="countries" name="countries" required>
              <option selected disabled hidden>Choose a Country</option>
              {allCountries}
            </select> */}
          <input type="text" name="country" placeholder="Country" onChange={handleChange}></input>
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

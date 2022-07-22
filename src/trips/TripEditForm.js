import React, { useState } from 'react';


export default function TripEditForm(props) {
  const [newTrip, setNewTrip] = useState(props.trip);
  const [currentCities, setCurrentCities] = useState();
  
  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    const trip = {...newTrip}
    trip[attributeToChange] = newValue
    setNewTrip(trip)

    // IF A COUNTRY WAS SELECTED IN THE DROPDOWN, UPDATE ARRAY OF CITIES
    if (event.target.name === "country") {
      let selectedCountry = props.countries.find(country => country._id === event.target.value)
      let selectedCountryCities = selectedCountry.cities
      setCurrentCities(selectedCountryCities)
    }
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      props.editTrip(newTrip);
  };

  // CREATE DROPDOWN OPTIONS FOR ALL COUNTRIES IN DB
  const allCountries = props.countries.map((country, index) => {
    return <option key={index} value={country._id}>{country.name}</option>
  })

  // // CREATE DROPDOWN OPTIONS FROM CITIES ARRAY OF SELECTED COUNTRY
  let displayCities = currentCities ? currentCities : props.cities;
  const selectedCountryCities = displayCities.map((city, index) => {
    return <option key={index} value={city}>{city}</option>
  })


  return (
    <div>
      <h1>EDIT TRIP</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <input type="text" name="title" onChange={handleChange} value={newTrip.title} ></input>
        </div>

        <div>
            <select id="country" name="country" onChange={handleChange} value={newTrip.country} required>
              {/* <option value="DEFAULT" disabled hidden>Choose a Country</option> */}
              {allCountries}
            </select>
        </div>

        <div>
            <select id="city" name="city" onChange={handleChange} value={newTrip.city} required>
                {/* <option value="DEFAULT" disabled hidden>Choose a City</option> */}
                {selectedCountryCities}
            </select>
        </div>

        <div>
          <textarea name="summary" placeholder="Description" rows="4" cols="50" onChange={handleChange} value={newTrip.summary} />
        </div>

        <div>
          <input type="text" name="rating" placeholder="Rating 0-5" onChange={handleChange} value={newTrip.rating} ></input>
        </div>

        <div>
          <input type="submit" value="Edit Trip"></input>
        </div>
      </form>
    </div>
  )
}

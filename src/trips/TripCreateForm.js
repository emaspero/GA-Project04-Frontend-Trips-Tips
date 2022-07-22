import React, { useState, useEffect } from 'react';


export default function TripCreateForm(props) {
  const [newTrip, setNewTrip] = useState({});
  const [currentCities, setCurrentCities] = useState([])

  useEffect(() => {
    console.log("NEW TRIP: ", newTrip);
    console.log("CURRENT CITIES: ", currentCities)
  }, [newTrip, currentCities])
  
  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    const trip = {...newTrip}
    trip["createdBy"] = props.currentUser.id
    trip[attributeToChange] = newValue

    console.log("TRIP: ", trip)
    setNewTrip(trip)

    // IF A COUNTRY WAS SELECTED IN THE DROPDOWN, UPDATE ARRAY OF CITIES
    if (event.target.name === "country") {
      let selectedCountry = props.allCountries.find(country => country._id === event.target.value)
      let selectedCountryCities = selectedCountry.cities
      setCurrentCities(selectedCountryCities)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTrip(newTrip);
    event.target.reset()
  };

  console.log("PROPS COUNTRIES", props.countries)

  // CREATE DROPDOWN OPTIONS FOR ALL COUNTRIES IN DB
  const allCountries = props.allCountries.map((country, index) => {
    return <option key={index} value={country._id}>{country.name}</option>
  })

  // CREATE DROPDOWN OPTIONS FROM CITIES ARRAY OF SELECTED COUNTRY
  const selectedCountryCities = currentCities.map((city, index) => {
    return <option key={index} value={city}>{city}</option>
  })


  return (
    <div>
      <h1>ADD A TRIP</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <input type="text" name="title" placeholder="Title" onChange={handleChange}></input>
        </div>

        <div>
            <select defaultValue={'DEFAULT'} id="country" name="country" onChange={handleChange} required>
              <option value="DEFAULT" disabled hidden>Choose a Country</option>
              {allCountries}
            </select>
        </div>

        <div>
            <select defaultValue={'DEFAULT'} id="city" name="city" onChange={handleChange} required>
                <option value="DEFAULT" disabled hidden>Choose a City</option>
                {selectedCountryCities}
            </select>
        </div>

        <div>
          <textarea name="summary" placeholder="Description" rows="4" cols="50" onChange={handleChange} />
        </div>

        <div>
          <input type="text" name="rating" placeholder="Rating 0-5" onChange={handleChange}></input>
        </div>

        <div>
          <input type="submit" value="Add Trip"></input>
        </div>
      </form>
    </div>
  )
}

import React, { useState } from 'react';
import './../Forms.css';


export default function TripEditForm(props) {
  const [newTrip, setNewTrip] = useState(props.trip);
  const [currentCities, setCurrentCities] = useState();
  
  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value
    const trip = {...newTrip}
    trip[attributeToChange] = newValue
    console.log(trip)
    console.log("Current User", props.currentUser)

    setNewTrip(trip)

    // IF A COUNTRY WAS SELECTED IN THE DROPDOWN, UPDATE ARRAY OF CITIES
    if (event.target.name === "country") {
      let selectedCountry = props.countries.find(country => country._id === event.target.value)
      let selectedCountryCities = selectedCountry.cities
      setCurrentCities(selectedCountryCities)
    }
  };

  const photoHandler = (e) => {
    setNewTrip({...newTrip, image: e.target.files[0]})
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData()
      formData.set('title', newTrip.title)
      formData.set('country', newTrip.country)
      formData.set('city', newTrip.city)
      formData.set('summary', newTrip.summary)
      formData.set('rating', newTrip.rating)
      formData.set('image', newTrip.image)
      formData.set('id', newTrip._id)
      // props.editTrip(newTrip);
      props.editTrip(formData);
  };

  // CREATE DROPDOWN OPTIONS FOR ALL COUNTRIES IN DB
  const allCountries = props.countries.sort((a, b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0))).map((country, index) => {
    return <option key={index} value={country._id}>{country.name}</option>
  })

  // // CREATE DROPDOWN OPTIONS FROM CITIES ARRAY OF SELECTED COUNTRY
  let displayCities = currentCities ? currentCities : props.cities;
  const selectedCountryCities = displayCities.sort().map((city, index) => {
    return <option key={index} value={city}>{city}</option>
  })


  return (
    <div>
      <h1>EDIT TRIP</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <input className='select' type="text" name="title" onChange={handleChange} value={newTrip.title} ></input>
        </div>

        <div className='select'>
            <select id="country" name="country" onChange={handleChange} value={newTrip.country} required>
              {/* <option value="DEFAULT" disabled hidden>Choose a Country</option> */}
              {allCountries}
            </select>
        </div>

        <div className='select'>
            <select id="city" name="city" onChange={handleChange} value={newTrip.city} required>
                {/* <option value="DEFAULT" disabled hidden>Choose a City</option> */}
                {selectedCountryCities}
            </select>
        </div>

        <div>
          <textarea className='form-inputs' name="summary" placeholder="Description" rows="4" cols="50" onChange={handleChange} value={newTrip.summary} />
        </div>

        <div>
          <input className='form-inputs' type="text" name="rating" placeholder="Rating 0-5" onChange={handleChange} value={newTrip.rating} ></input>
        </div>

        <div>
          <label className='form-file-upload'>
              <p><img src='/img/upload.png'></img> Upload your picture</p>
              <input className='form-inputs' id='form-input-file' type="file" accept=".png, .jpg, .jpeg" name="gallery" onChange={photoHandler}/>
          </label>
        </div>

        <div>
          <input className='submit-button' type="submit" value="Edit Trip"></input>
        </div>
      </form>
    </div>
  )
}

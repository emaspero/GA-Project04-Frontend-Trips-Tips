import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Forms.css';


export default function TripCreateForm(props) {
  const [newTrip, setNewTrip] = useState({});
  const [currentCities, setCurrentCities] = useState([])
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/mytrips`;
    navigate(path);
  }

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
    setNewTrip(trip)

    // IF A COUNTRY WAS SELECTED IN THE DROPDOWN, UPDATE ARRAY OF CITIES
    if (event.target.name === "country") {
      let selectedCountry = props.allCountries.find(country => country._id === event.target.value)
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
    formData.set('createdBy', props.currentUser.id)
    props.addTrip(formData);
    routeChange()
  };

  // console.log("PROPS COUNTRIES", props.countries)

  // CREATE DROPDOWN OPTIONS FOR ALL COUNTRIES IN DB
  const allCountries = props.allCountries.sort((a, b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0))).map((country, index) => {
    return <option key={index} value={country._id}>{country.name}</option>
  })

  // CREATE DROPDOWN OPTIONS FROM CITIES ARRAY OF SELECTED COUNTRY
  const selectedCountryCities = currentCities.sort().map((city, index) => {
    return <option key={index} value={city}>{city}</option>
  })


  return (
    <div>
      <h1>ADD A TRIP</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>

          <input className='form-inputs' type="text" name="title" placeholder="Trip title*" onChange={handleChange}></input>

        </div>

        <div className='select'>
            <select defaultValue={'DEFAULT'} id="country" name="country" onChange={handleChange} required>
              <option value="DEFAULT" disabled hidden>Choose a Country</option>
              {allCountries}
            </select>
        </div>

        <div className='select'>
            <select defaultValue={'DEFAULT'} id="city" name="city" onChange={handleChange} required>
                <option value="DEFAULT" disabled hidden>Choose a City</option>
                {selectedCountryCities}
            </select>
        </div>

        <div>

          <textarea className='form-inputs' name="summary" placeholder="Description*" rows="4" cols="50" onChange={handleChange} />
        </div>

        <div>
          <input className='form-inputs' type="text" name="rating" placeholder="Rating 0-5" onChange={handleChange}></input>

        </div>

        <div>
          <label className='form-file-upload'>
            <p><img src='/img/upload.png'></img> Upload your picture</p>
            <input className='form-inputs' id='form-input-file' type="file" accept=".png, .jpg, .jpeg" name="gallery" onChange={photoHandler}/>
          </label>
        </div>

        <div>
          <input className='submit-button' type="submit" value="ADD TRIP"></input>
        </div>
      </form>
    </div>
  )
}

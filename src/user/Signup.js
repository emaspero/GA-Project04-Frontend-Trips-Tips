import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './../Forms.css';

// import {Container, Form, Button} from 'react-bootstrap'



export default function Signup(props) {

    const [newUser, setNewUser] = useState({});
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/signin`;
        navigate(path);
      }
    
    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log("user", user);
        setNewUser(user)
    }

    const photoHandler = (e) => {
        setNewUser({...newUser, profileImage: e.target.files[0]})
    }

    const registerHandler = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.set('firstName', newUser.firstName)
        formData.set('lastName', newUser.lastName)
        formData.set('username', newUser.username)
        formData.set('emailAddress', newUser.emailAddress)
        formData.set('password', newUser.password)
        formData.set('profileImage', newUser.profileImage)
        props.register(formData)
        routeChange()
    }

  return (
    <div>
        <h1>SIGN UP</h1>

        <form onSubmit={registerHandler} encType='multipart/form-data'>

            <div>
                <input className='form-inputs' type="text" placeholder="First Name" name="firstName" onChange={changeHandler} required></input>
            </div>

            <div>
                <input className='form-inputs' type="text" placeholder="Last Name" name="lastName" onChange={changeHandler} required></input>
            </div>

            <div>
                <input className='form-inputs' type="text" placeholder="Username"name="username" onChange={changeHandler} required></input>
            </div>

            <div>
                <input className='form-inputs' type="text" placeholder="Email Address"name="emailAddress" onChange={changeHandler} required></input>
            </div>
            <div>
                <input className='form-inputs' type="password" placeholder="Password" name="password" minlength="6" onChange={changeHandler} required></input>
            </div>

            <div>
                <label className='form-file-upload'>
                    <p><img src='/img/upload.png'></img> Upload your picture</p>
                    <input className='form-inputs' id='form-input-file' type="file" accept=".png, .jpg, .jpeg" name="gallery" onChange={photoHandler}/>
                </label>
            </div>

            <br></br>
            
            <div>
                <input className='submit-button' type="submit" value="Register"></input>
            </div>
        </form>
    </div>
  )
}

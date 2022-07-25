import React, { useState } from 'react'
// import {Container, Form, Button} from 'react-bootstrap'



export default function Signup(props) {

    const [newUser, setNewUser] = useState({});
    
    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log("user", user);
        setNewUser(user)
    }

    const photoHandler = (e) => {
        setNewUser({...newUser, profileImage: e.target.files[0]})
    }

    const registerHandler = () => {
        const formData = new FormData()
        formData.set('firstName', newUser.firstName)
        formData.set('lastName', newUser.lastName)
        formData.set('username', newUser.username)
        formData.set('emailAddress', newUser.emailAddress)
        formData.set('password', newUser.password)
        formData.set('profileImage', newUser.profileImage)
        props.register(formData)
    }

  return (
    <div>
        <h1>SIGN UP</h1>

        <form onSubmit={registerHandler} encType='multipart/form-data'>

            <div>
                <input type="text" placeholder="First Name" name="firstName" onChange={changeHandler}></input>
            </div>

            <div>
                <input type="text" placeholder="Last Name" name="lastName" onChange={changeHandler}></input>
            </div>

            <div>
                <input type="text" placeholder="Username"name="username" onChange={changeHandler}></input>
            </div>

            <div>
                <input type="text" placeholder="Email Address"name="emailAddress" onChange={changeHandler}></input>
            </div>
            <div>
                <input type="password" placeholder="Password" name="password" onChange={changeHandler}></input>
            </div>

            <div>
                <input type="file" accept=".png, .jpg, .jpeg" name="profileImage" onChange={photoHandler}/>
            </div>
            <br></br>
            <div>
                <input type="submit" value="Register"></input>
            </div>
        </form>
    </div>
  )
}

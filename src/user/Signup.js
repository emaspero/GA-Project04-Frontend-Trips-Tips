import React, { useState } from 'react'
// import {Container, Form, Button} from 'react-bootstrap'



export default function Signup(props) {

    const [newUser, setNewUser] = useState({});
    const [fileName, setFileName] = useState("");

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
        // const formData = new FormData()
        // formData.set('firstName', newUser.firstName)
        // formData.set('lastName', newUser.lastName)
        // formData.set('username', newUser.username)
        // formData.set('emailAddress', newUser.emailAddress)
        // formData.set('password', newUser.password)
        // formData.set('profileImage', newUser.profileImage)
        // props.register(formData)
        props.register(newUser)
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

            {/* <div>
                <input type="file" accept=".png, .jpg, .jpeg" filename="profileImage" onChange={photoHandler}/>
            </div> */}
            <br></br>
            <div>
                <input type="submit" value="Register"></input>
            </div>
        </form>

        {/* <Container>

            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control name="username" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="emailAddress" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <br></br>

            <Button variant="primary" onClick = {registerHandler}>Register</Button>

        </Container> */}

    </div>
  )
}

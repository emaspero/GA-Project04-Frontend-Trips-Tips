import React, { useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import './../Forms.css';



export default function Signin(props) {

    const [newUser, setNewUser] = useState({})

    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log("user", user);
        setNewUser(user)
    }

    const loginHandler = () => {
        props.login(newUser)
    }

  return (
    <div>
        <h1>SIGN IN</h1>

        <Container>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control className='form-inputs' name="emailAddress" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control className='form-inputs' name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <br></br>

            <Button className='submit-button' variant="primary" onClick = {loginHandler}>Login</Button>

        </Container>

    </div>
  )
}
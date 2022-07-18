import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import UserEditForm from './UserEditForm'



export default function Profile(props) {

    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState(null)


    const editView = () => {
        setIsEdit(true)
        console.log(isEdit)
    }

    const editUser = (newUser) => {
    Axios.put(`auth/profile/update?id=${newUser.id}`, newUser, {headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }})
    .then(response => {
        console.log("Updated User Information!")
        setIsEdit(false)
    })
    .catch(error => {
        console.log("Error Updating User Information !!!");
        console.log(error);
    })
}


  return (
    <div>
        <h1>PROFILE</h1>
        <img src='/img/non-conforming-gender.png' width={"100px"}></img>
        {(!isEdit)?
            <div>
            <p>@{props.currentUser.username}</p>
            <p>{props.currentUser.firstName} {props.currentUser.lastName}</p>
            <p>{props.currentUser.emailAddress}</p>
            <button onClick={() =>{editView()}}>Edit Profile</button>
            </div>
        :
        <div><UserEditForm editUser={editUser} currentUser={props.currentUser}/></div>
        }

    </div>

  )
}

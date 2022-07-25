import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import UserEditForm from './UserEditForm'
import PwdEditForm from './PwdEditForm'
import { useNavigate } from 'react-router-dom'
import './Profile.css';
import MyTripsProfile from '../trips/MyTripsProfile'



export default function Profile(props) {

    const [isEdit, setIsEdit] = useState(false)
    const [isPwdEdit, setIsPwdEdit] = useState(false)
    const navigate = useNavigate()

    const editView = () => {
        setIsEdit(true)
    }

    const editPwdView = () => {
        setIsPwdEdit(true)
    }

    const editPwd = (currentUser) => {
        console.log("Axios call goes here")
        Axios.put("auth/profile/pwdchange", currentUser, {headers : {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }})
        .then(response => {
            console.log("Updated Password!")
            setIsPwdEdit(false)
            navigate('/profile')

        })
        .catch(error => {
            console.log("Error Updating password !!!");
            console.log(error);
        })
    }

    const editUser = (newUser) => {
    Axios.put(`auth/profile/update?id=${newUser.id}`, newUser, {headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }})
    .then(response => {
        console.log("Updated User Information!")
        setIsEdit(false)
        window.location.reload()
        })
    .catch(error => {
        console.log("Error Updating User Information !!!");
        console.log(error);
    })
}


  return (
    <div>
        <h1>PROFILE</h1>

        <div className='profile-container'>
            
            <div>
                {(props.currentUser.profileImage)
                ?
                <img alt="profile" width={"100px"} src={props.currentUser.profileImage}></img>
                :
                 <img alt="default" src='/img/non-conforming-gender.png' width={"100px"}></img>
                }
                
                {(!isEdit)?
                    <div>
                    <p>@{props.currentUser.username}</p>
                    <p>{props.currentUser.firstName} {props.currentUser.lastName}</p>
                    <p>{props.currentUser.emailAddress}</p>
                    <button onClick={() =>{editView()}}>EDIT</button>
                    </div>
                :
                <div><UserEditForm editUser={editUser} currentUser={props.currentUser}/></div>
                }
                <br></br>
                {(!isPwdEdit)?
                    <button onClick={() =>{editPwdView()}}>CHANGE PASSWORD</button>
                :
                <div><PwdEditForm editPwd={editPwd} currentUser={props.currentUser}/></div>
                }
            </div>
            <div className='profile-container-mytrips-item'><MyTripsProfile currentUser={props.currentUser}></MyTripsProfile></div>
        </div>
        
    </div> 

  )
}

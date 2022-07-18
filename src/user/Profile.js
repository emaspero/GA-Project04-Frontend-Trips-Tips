import React from 'react'


export default function Profile(props) {


  return (
    <div>
        <h1>PROFILE</h1>
        <img src='/img/non-conforming-gender.png' width={"100px"}></img>
        <p>@{props.currentUser.username}</p>
        <p>{props.currentUser.firstName} {props.currentUser.lastName}</p>
        <p>{props.currentUser.emailAddress}</p>
    </div>

  )
}

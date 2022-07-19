import React, {useState} from 'react'

export default function UserEditForm(props) {

    const [newUser, setNewUser] = useState(props.currentUser)


    const handleChange = (event) =>{
        const attributeToChange = event.target.name
        const newValue = event.target.value
    
        const user = {...newUser}
        user[attributeToChange] = newValue
        
        setNewUser(user)
        console.log("---------",newUser)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.editUser(newUser);
        event.target.reset();
    }
    
    
      return (
        <div>
            <h2>EDIT USER</h2>
    
        <form onSubmit={handleSubmit}>

            <div>
                <input type="text" name="firstName" onChange={handleChange} value={newUser.firstName}></input>
            </div>

            <div>
                <input type="text" name="lastName" onChange={handleChange} value={newUser.lastName}></input>
            </div>

            <div>
                <input type="text" name="username" onChange={handleChange} value={newUser.username}></input>
            </div>

            <div>
                <input type="text" name="emailAddress" onChange={handleChange} value={newUser.emailAddress}></input>
            </div>
    
            <div>
                <input type="submit" value="Update My Info"></input>
            </div>
        </form>
        </div>
      )
}

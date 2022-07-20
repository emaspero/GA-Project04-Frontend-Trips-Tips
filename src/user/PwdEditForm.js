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
        console.log('newUser: ', newUser)
        props.editPwd(newUser);
        event.target.reset();
    }
    
    
    return (
        <div>
            <h2>EDIT PASSWORD</h2>
    
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Current Password</label> {"  "}
                    <input type="password" name="currentPassword" onChange={handleChange} value={newUser.currentPassword}/>
                </div>

                <div >
                    <label>New Password</label>{"  "}
                    <input type="password" name="newPassword" onChange={handleChange} value={newUser.newPassword}/>
                </div>

                <div >
                    <label>Confirm New Password</label>{"  "}
                    <input type="password" name="newPasswordConfirm" onChange={handleChange} value={newUser.newPasswordConfirmed}/>
                </div>

                <br></br>
                <div>
                    <input type="submit" value="Update my Password"></input>
                </div>
            </form>
        </div>
    )
}





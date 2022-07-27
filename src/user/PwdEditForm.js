import React, {useState} from 'react'
import './../Forms.css';


export default function UserEditForm(props) {
    // SET USER STATE
    const [newUser, setNewUser] = useState(props.currentUser)

    // PW CHANGE FUNCTIONS
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
            <h3>EDIT PASSWORD</h3>
    
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Current Password" className='form-inputs' type="password" name="currentPassword" onChange={handleChange} value={newUser.currentPassword}/>
                </div>

                <div >
                    <input placeholder="New Password" className='form-inputs' type="password" name="newPassword" onChange={handleChange} value={newUser.newPassword}/>
                </div>

                <div >
                    <input placeholder="Confirm New Password"className='form-inputs' type="password" name="newPasswordConfirm" onChange={handleChange} value={newUser.newPasswordConfirmed}/>
                </div>

                <br></br>
                <div>
                    <input className='submit-button' type="submit" value="Update my Password"></input>
                </div>
            </form>
        </div>
    )
}





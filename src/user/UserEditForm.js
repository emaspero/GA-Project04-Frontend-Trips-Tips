import React, {useState} from 'react'
import './../Forms.css';


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

    const photoHandler = (e) => {
        setNewUser({...newUser, profileImage: e.target.files[0]})
        return null
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.set('firstName', newUser.firstName)
        formData.set('lastName', newUser.lastName)
        formData.set('username', newUser.username)
        formData.set('emailAddress', newUser.emailAddress)
        formData.set('id', newUser.id)
        formData.set('profileImage', newUser.profileImage)
        // props.editUser(newUser);
        props.editUser(formData);
        event.target.reset();
    }
    
    
      return (
        <div>
            <h3>EDIT USER</h3>
    
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

            <div>
                <input className='form-inputs' type="text" name="firstName" onChange={handleChange} value={newUser.firstName}></input>
            </div>

            <div>
                <input className='form-inputs' type="text" name="lastName" onChange={handleChange} value={newUser.lastName}></input>
            </div>

            <div>
                <input className='form-inputs' type="text" name="username" onChange={handleChange} value={newUser.username}></input>
            </div>

            <div>
                <input className='form-inputs' type="text" name="emailAddress" onChange={handleChange} value={newUser.emailAddress}></input>
            </div>

            <div>
                <label className='form-file-upload'>
                    <p><img src='/img/upload.png'></img> Upload your picture</p>
                    <input className='form-inputs' id='form-input-file' type="file" accept=".png, .jpg, .jpeg" name="gallery" onChange={photoHandler}/>
                </label>
          </div>
    
            <div>
                <input className='submit-button' type="submit" value="Update My Info"></input>
            </div>
        </form>
        </div>
      )
}

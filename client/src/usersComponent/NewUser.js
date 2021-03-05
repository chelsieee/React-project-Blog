import React, {useState} from 'react';

export const NewUser =(props) =>{
    const [userState, SetUserState] =useState({
        username:'',
        password:''
    })
    
    const handleChange = (e)=>{
       
        const newUserState={...userState}
        newUserState[e.target.name] =e.target.value
        SetUserState(newUserState)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.onSubmit(userState)
    }

    return (
        <form onSubmit={handleSubmit}>
             <h1>New user registration</h1>
            <div>
            <input type="text" placeholder="Please enter username" name="username" value={userState.username} onChange={handleChange}></input>
            <input type="password" placeholder="Please enter password" name="password" value={userState.password} onChange={handleChange}></input>
            <button type="submit">Submit</button>
            </div>
        </form>

    )

}
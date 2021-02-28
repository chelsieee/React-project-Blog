import React, {useState} from 'react';

export const LoginUser =(props) =>{
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
            <h1 class="text-info text-center">Login to your blog</h1>
            <div>
            <label for="username">Username</label>
            <input type="text" laceholder="Please enter username" name="username" value={userState.username} onChange={handleChange}></input>
            <input type="password" class="form-control" placeholder="Please enter password" name="password" value={userState.password} onChange={handleChange}></input>
            <button type="submit">Submit</button>
            <button type="button">Register</button>
            </div>
        </form>

    )

}
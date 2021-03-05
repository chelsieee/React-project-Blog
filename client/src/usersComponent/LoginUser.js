import React, {useState, useEffect} from 'react';

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
            <h1>Login to your blog</h1>
            <div>
            <label htmlFor="username">Username</label>
            <input type="text" laceholder="Please enter username" name="username" value={userState.username} onChange={handleChange}></input>
            <input type="password" placeholder="Please enter password" name="password" value={userState.password} onChange={handleChange}></input>
            <button type="submit">Submit</button>
            <button type="button">Register</button>
            </div>
        </form>

    )

}
import React from 'react';
import {NewUser} from './NewUser';
import {LoginUser} from './LoginUser'
import axios from 'axios';

export const FunctionalUserContainer =() =>{

const handleRegisterFormSubmit =(newUser)=>{
    axios.post('/api/users/register', newUser,
    { 'Access-Control-Allow-Credentials':true})
    .then(res => {
      let status = res.data;
      window.alert(status)
    }).catch((err)=>{
        console.log(err);
        window.alert("unable to register")
    })
}


const handleLoginFormSubmit =(existingUser)=>{
     axios.post(
    '/api/users/login',
     existingUser, 
     { 'Access-Control-Allow-Credentials':true})
     .then((user)=>{
     console.log('login:', user)
     window.alert("successfully logged in")
     window.localStorage.setItem('userId', user.data.id)
      window.localStorage.setItem('userName', user.data.username)
        })
    .catch((err)=>{
            console.log(err);
            window.alert("unable to loggin")
        })
}

    return (
        <div>
            <LoginUser onSubmit={handleLoginFormSubmit}/>
            <NewUser onSubmit={handleRegisterFormSubmit}/>
        </div>
    )
}
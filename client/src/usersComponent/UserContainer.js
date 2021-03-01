import React from 'react';
import {NewUser} from './NewUser';
import {LoginUser} from './LoginUser'

export const FunctionalUserContainer =() =>{

const handleRegisterFormSubmit =(newUser)=>{
    fetch('/api/users/register',{
        method:'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(newUser)
    })
    // .then(response => response.text())
    .then(data => {
      console.log('status:', data.status);
      const msg =(data.status ===200)? "successfully registered" : "unable to register"
      window.alert(msg)
    })
}


const handleLoginFormSubmit =(existingUser)=>{
    fetch('/api/users/login',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(existingUser),
    }).then(response => {
        console.log(response.headers)
       return response.json()
    })
    .then(user => {
      console.log('Success:', user);
      window.localStorage.setItem('userId', user.id)
      window.localStorage.setItem('userName', user.username)
    })
}

    return (
        <div>
            <LoginUser onSubmit={handleLoginFormSubmit}/>
            <NewUser onSubmit={handleRegisterFormSubmit}/>
        </div>
    )
}
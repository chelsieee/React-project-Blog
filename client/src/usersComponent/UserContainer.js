import React, { useEffect, useState } from 'react';
import {NewUser} from './NewUser';
import {LoginUser} from './LoginUser'
import axios from 'axios';
import {
    Route,
    Link
  } from "react-router-dom";
  

export const UserContainer =() =>{
const [users,setUsers] =useState({isLoggin:false})

const handleRegisterFormSubmit =(newUser)=>{
    axios.post('/api/users/register', newUser,
    { 'Access-Control-Allow-Credentials':true})
    .then(res => {
      let status = res.data;
      window.alert(status)
    }).catch((err)=>{
        console.log(err);
        window.alert(err.response.data)
    })
}


const handleLoginFormSubmit =(existingUser)=>{
     axios.post(
    '/api/users/login',
     existingUser, 
     { 'Access-Control-Allow-Credentials':true})
     .then((user)=>{
     window.alert("successfully logged in")
     console.log(user.data)
     setUsers({isLoggin:true})
     window.localStorage.setItem('userId', JSON.stringify(user.data.id))
      window.localStorage.setItem('userName', JSON.stringify(user.data.username))
        })
    .catch((err)=>{
            console.log(err);
            window.alert(err.response.data)
        })
}

// logout the user
const handleLogout = () => {
    axios.get('/api/users/logout', users, { 'Access-Control-Allow-Credentials':true} ).then(
        (res)=>{
            setUsers({isLoggin:false})
            window.localStorage.clear();
            window.alert(res.data)

        }
    )
  };  

//checks if there's a logged in user the first time the app loads:
useEffect(()=>{
    const loggedInUser =localStorage.getItem('user');
    if(loggedInUser){
        // const foundUser = JSON.parse(loggedInUser)
        setUsers({isLoggin:true})
   }
},[])

//  if there's a user show the message below

 if (users.isLoggin) {
    return (
      <div>
        user is loggged in
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
// if there's no user, show the login/register form:
    return (
            <div>
                <nav>
                    <ul>
                    <li>
                        <Link to ='/user/login'>Login</Link>
                    </li>
                    <li>
                        <Link to ='/user/register'>Register New User</Link>
                    </li>  
                    {/* <li><button onClick={handleLogout}>logout</button></li> */}
                    </ul>
                </nav>
                <Route path ='/user/login'>
                    <LoginUser onSubmit={handleLoginFormSubmit} user={users}/>
                </Route>
                <Route path ='/user/register'>
            <NewUser onSubmit={handleRegisterFormSubmit}/>
                </Route>
            </div>

    )
}
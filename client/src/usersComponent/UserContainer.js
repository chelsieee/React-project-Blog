import React from 'react';
import {NewUser} from './NewUser';
import {LoginUser} from './LoginUser'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

export const UserContainer =() =>{

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
     console.log('login:', user)
     window.alert("successfully logged in")
     window.localStorage.setItem('userId', user.data.id)
      window.localStorage.setItem('userName', user.data.username)
        })
    .catch((err)=>{
            console.log(err);
            window.alert(err.response.data)
        })
}

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                    <li>
                        <Link to ='/user/login'>Login</Link>
                    </li>
                    <li>
                        <Link to ='/user/register'>Register New User</Link>
                    </li>   
                    </ul>
                </nav>
        
            <Switch>
                <Route path ='/user/login'>
            <LoginUser onSubmit={handleLoginFormSubmit}/>
                </Route>
                <Route path ='/user/register'>
            <NewUser onSubmit={handleRegisterFormSubmit}/>
                </Route>
            </Switch>
            </div>
        </Router>

    )
}
import React from "react";
import { LoginUser } from "./LoginUser";
import { SignUp } from "./NewUser";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";     

export const UserContainer = (props) => {
  const history =useHistory()

  const handleRegisterFormSubmit = (newUser) => {
    axios
      .post("/api/users/register", newUser, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        history.replace('/')
       
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data);
      });
  };

  const handleLoginFormSubmit = (existingUser) => {
    axios
      .post("/api/users/login", existingUser, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((user) => {
        console.log(user.data);
        props.setUsers({ isLoggin: true });
        window.localStorage.setItem("userId", JSON.stringify(user.data.id));
        window.localStorage.setItem(
          "userName",
          JSON.stringify(user.data.username)
        );
        history.replace('/private')
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data);
      });
  };
  return (
    <div>
      <Route path="/user/login">
        <LoginUser onSubmit={handleLoginFormSubmit} />
      </Route>
      <Route path="/user/register">
        <SignUp onSubmit={handleRegisterFormSubmit} />
      </Route>
    </div>
  );
};

import { BlogContainer } from "./blogComponent/BlogContainer";
import { UserContainer } from "./usersComponent/UserContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import  axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [users, setUsers] = useState({ isLoggin: false });


useEffect(()=>{
    const loggedInUser =localStorage.getItem('userId');
    if(loggedInUser){
        setUsers({isLoggin:true})
   }
},[])

  const handleLogout = () => {
    axios
      .get("/api/users/logout", { "Access-Control-Allow-Credentials": true })
      .then((res) => {
        window.localStorage.clear();
        window.alert(res.data);
        setUsers({ isLoggin: false });
      });
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            {!users.isLoggin && (
              <li>
                <Link to="/user/login">Login</Link>
              </li>
            )}
            {!users.isLoggin && <li>
              <Link to="/user/register">Register New User</Link>
            </li>}
        {users.isLoggin && <li>
          <button onClick={handleLogout}>logout</button>
        </li>}
            <li>
              <Link to="/blog">Blog Hub</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/user">
            <UserContainer users={users} setUsers={setUsers} />
          </Route>
          <Route path="/blog">
            <BlogContainer users={users} setUsers={setUsers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export { App };

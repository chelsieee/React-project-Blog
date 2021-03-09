import { BlogContainer } from "./blogComponent/BlogContainer";
import { UserContainer } from "./usersComponent/UserContainer";
import { NavBar } from "./NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [users, setUsers] = useState({ isLoggin: false });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userId");
    if (loggedInUser) {
      setUsers({ isLoggin: true });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar users={users} setUsers={setUsers} />
        <Switch>
          <Route path="/user">
            <UserContainer users={users} setUsers={setUsers} />
          </Route>
          <BlogContainer users={users} setUsers={setUsers} />
        </Switch>
      </Router>
    </div>
  );
};

export { App };

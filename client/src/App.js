import {BlogContainer} from './blogComponent/BlogContainer';
import {UserContainer} from './usersComponent/UserContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
      <ul>
        <li>
          <Link to ='/user'>User Hub</Link>
        </li>
        <li>
          <Link to='/blog'>Blog Hub</Link>
        </li>
      </ul>
      <Switch>
        <Route path='/user'>
       <UserContainer/>
        </Route>
        <Route path='/blog'>
        <BlogContainer/>
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export {App};

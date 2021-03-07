import { BlogContainer } from "./blogComponent/BlogContainer";
import { UserContainer } from "./usersComponent/UserContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import  axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box'
import "bootstrap/dist/css/bootstrap.min.css";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize:15.5,
  }
}));

const App = () => {
  const classes = useStyles();
  
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

const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
  
    <div className="App">
        <Router>
       <AppBar position="static">
        <Toolbar>
        <Button color ="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/blog/public">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/blog/private">Personal Blog Hub</Link></MenuItem>
      {!users.isLoggin &&<MenuItem onClick={handleClose}><Link to="/user/register">Register New User</Link></MenuItem>}
      </Menu>
          <Typography variant="h6" className={classes.title}>
           Welcome home {JSON.parse(localStorage.getItem('userName'))}
          </Typography>
         { users.isLoggin && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
         {!users.isLoggin && <Button  variant="contained"><Link to="/user/login">Login</Link></Button>}
         { users.isLoggin && <Button color="inherit"><Link to ='/blog/add'>Create Blog</Link></Button>}
        </Toolbar>
      </AppBar>
     
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

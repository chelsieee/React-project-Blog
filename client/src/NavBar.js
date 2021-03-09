import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 15.5,
  },
}));

export const NavBar = (props) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleLogout = () => {
    axios
      .get("/api/users/logout", { "Access-Control-Allow-Credentials": true })
      .then((res) => {
        window.localStorage.clear();
        props.setUsers({ isLoggin: false });
        history.replace("/user/login");
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/private">Personal Blog Hub</Link>
          </MenuItem>
          {!props.users.isLoggin && (
            <MenuItem onClick={handleClose}>
              <Link to="/user/register">Register New User</Link>
            </MenuItem>
          )}
        </Menu>
        <Typography variant="h6" className={classes.title}>
          Welcome home{" "}
          <Link to="/private">
            {JSON.parse(localStorage.getItem("userName"))}
          </Link>
        </Typography>
        {props.users.isLoggin && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
        <Link to="/user/login">
          {!props.users.isLoggin && <Button variant="contained">Login</Button>}
        </Link>
        <Link to="/user/login">
          {props.users.isLoggin && <Button color="inherit">Create Blog</Button>}
        </Link>
      </Toolbar>
    </AppBar>
  );
};

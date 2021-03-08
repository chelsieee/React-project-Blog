import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.44)), url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1450&q=80')`,
    height: "360px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 200,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  image: {
    height: 240,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export const List = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.hero}>
        <Box>Archive My Day</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogscontainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Public Blogs
        </Typography>
        <Grid container spacing={3}>
          {props.blogs.map((el, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.image}
                    image={`https://source.unsplash.com/random/${index}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {el.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {el.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    <Avatar className={classes.purple}>
                      {el.authorId.username.substring(0, 1).toUpperCase()}
                    </Avatar>
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        Author: {el.authorId.username}
                      </Typography>
                      <Typography variant="subtitle2" component="p">
                        Category: {el.categoryId.tag}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                      CreateAt: {moment(el.createdAt).format("DD-MM-YYYY h:mm:ss")}
                      </Typography>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

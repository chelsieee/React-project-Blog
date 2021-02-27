const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const cors = require("cors");

// Import all routers
const blogRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/userRouter')
const categoryRouter =require('./routes/categoryRoutes')

mongoose.connect("mongodb://localhost:27017/blogFullStack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialise app object
const app = express();

//middleware
app.use(express.json());//essential ! a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(cors());
app.use(
  session({
    secret: "random secret",
    resave: false,
    saveUninitialized: false 
  })
)

// Tell express that it needs to use the routers we have initialised
app.use ('/blogs', blogRouter)
app.use ('/users', userRouter)
app.use('/categories', categoryRouter)



// define the port and Start your server by listening for requests
const port = 8000;

app.listen(port, () =>
  console.log(`Fruit app listening at http://localhost:${port}`)
);

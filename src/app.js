const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user');


const app = express();

// server is not able to read json data we need help of middleware to read json data and convert it into JS object - express.json

app.use(express.json());

app.post("/signup", async (req, res) => {

    //creating a new instance of the User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("user added successfully");
    } catch (err) {
        res.status(401).send("Error adding user");
    }
})
// order of the routes matter a lot
//dynamic routes and query params

// app.use("/route", rh, rh1, [rh2, rh3], rh4)

// GET /users => It checks all the app.xxx(matching route) functions - this is how express works

// GET /users => middleware chain => request handler

// what is middleware and how express js basically handles requests behind the scene

//HTTP status code - by default 200

// handle Auth Middleware for all requests GET, POST, DELETE - use app.use
// handle Auth Middleware for all only GET requests - use app.get
// difference b/w app.use and app.all

connectDB().then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("server listening on 3000 port");
    })
}).catch(err => {
    console.log("Database not connected", err);
})


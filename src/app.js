const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user');
const cookieParser = require("cookie-parser");
const app = express();

// server is not able to read json data we need help of middleware to read json data and convert it into JS object - express.json

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// get user by emailId
app.get("/user", async (req, res) => {
    const emailId = req.body.emailId;
    try {
        const user = await User.findOne({ emailId });
        if (!user) {
            res.status(404).send("user not found");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// Feed API - get all the users from DB
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    const { emailId } = req.body.emailId;
    try {
        const user = await User.deleteOne(emailId);
        res.send("user deleted successfully");
    } catch (err) {
        res.status(400).send("something went wrong");
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

// difference between patch and put

connectDB().then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("server listening on 3000 port");
    })
}).catch(err => {
    console.log("Database not connected", err);
})


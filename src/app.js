const express = require("express");


const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");
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



app.get("/getUserData", userAuth, (req, res) => {
    try {
        throw new Error("dfsdf");
        // Logic of DB call and get user data
        res.send("userAuth");
    } catch (err) {
        res.status(500).send("something went wrong");
    }

})

// wildcard route - match every route
app.use("/", (err, req, res, next) => {
    if (err) {
        //Log your error
        res.status(500).send("something went wrong1");
    }
    // res.send("hello from server");
})



app.listen(3000, () => {
    console.log("server listening on 3000 port");
})
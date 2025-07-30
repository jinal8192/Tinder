const express = require("express");


const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");
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


app.use("/admin", adminAuth);

app.get("/user/data", userAuth, (req,res) => {
    // Authentication
    res.send("userAuth")
})

app.get("/user/login", (req,res) => {
    // Authentication
    res.send("user logged in")
})


app.get("/admin/getAllData", (req,res) => {
    // Authentication
    res.send("All Data Sent")
})

app.delete("/admin/deleteUser", (req,res) => {
    // Authentication
    res.send("Deleted a user")
})

// app.delete("/user", (req,res) => {
//     res.send("Deleted successfully");
// })
 
// wildcard route - match every route
// app.use("/", (req,res) => {
//     res.send("hello from server");
// })

app.listen(3000, () => {
    console.log("server listening on 3000 port");
})
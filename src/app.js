const express = require("express");

const app = express();
// order of the routes matter a lot
//dynamic routes and query params

// app.use("/route", rh, rh1, [rh2, rh3], rh4)


app.use("/user", (req,res, next) => {
    // Route handler 1
      next();
    // res.send("Route handler 1");
    console.log("handling the route back");
}, [(req,res, next) => {
    // Route handler 2
    console.log("handling route 2");
     next();
    // res.send("Route handler 2");
}],(req,res, next) => {
    // Route handler 2
    console.log("handling route 3");
    next();
    // res.send("Route handler 3");
},(req,res, next) => {
    // Route handler 2
    console.log("handling route 4");
    // next();
    res.send("Route handler 4");
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
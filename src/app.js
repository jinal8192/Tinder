const express = require("express");

const app = express();
// order of the routes matter a lot

app.get("/user", (req,res) => {
    res.send({firstname: "jinal", lastname: "jain"})
})

app.post("/user", (req,res) => {
    res.send("Data successfully saved");
})

app.delete("/user", (req,res) => {
    res.send("Deleted successfully");
})
 
// wildcard route - match every route
// app.use("/", (req,res) => {
//     res.send("hello from server");
// })

app.listen(3000, () => {
    console.log("server listening on 3000 port");
})
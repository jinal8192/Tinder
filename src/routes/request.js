const express = require("express");
const { userAuth } = require("../middlewares/auth")

const router = express.Router();

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        // const user = req.user;
        // res.send(user);
        console.log("sending a connection request");
        res.send("connection established");

    } catch (err) {
        res.status(401).send("Login failed " + err);
    }
})

module.exports = router;
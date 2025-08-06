const express = require('express');
const { userAuth } = require("../middlewares/auth")

const router = express.Router();


router.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (err) {
        res.status(401).send("Login failed " + err);
    }


})

module.exports = router;
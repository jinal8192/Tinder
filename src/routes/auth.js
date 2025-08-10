const express = require('express');
const { validateSignupData } = require('../utils/validation');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        // validation of data
        validateSignupData(req);

        // Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        //creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("user added successfully");
    } catch (err) {
        res.status(401).send("Signup failed " + err);
    }
})

router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // create a JWT token - header, payload, signature

            const token = await user.getJWT();

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
            res.send("Login Successfully");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(401).send("Login failed " + err);
    }
})

router.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successfully");
})

module.exports = router;
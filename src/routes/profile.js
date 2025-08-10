const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require('../models/user');

const router = express.Router();


router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(401).send("Login failed " + err);
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
        //Data Sanitization before data is allowed in DB
        try {
            if(!validateEditProfileData(req)) {
                throw new Error("update not allowed")
            }
            const {_id: id} = req.user;
            await User.findByIdAndUpdate(id, req.body, {
                runValidators: true
            });
            res.json({message: `${req.user.firstName}, your profile updated successfully`});
        } catch (err) {
            res.status(400).send("Error " + err);
        }
})

router.patch("/profile/password", userAuth, async (req, res) => {
        //Data Sanitization before data is allowed in DB
        try {
                const { oldPassword, newPassword } = req.body;
                const {_id: id} = req.user;
                const user = await User.findOne({ _id: id });
                const isPasswordValid = await user.validatePassword(oldPassword);
                if (isPasswordValid) {
                    
                    const passwordHash = await user.encryptPassword(newPassword);
                    await User.findByIdAndUpdate(id, {password: passwordHash});
                    res.send("Password updated successfully");
                } else {
                    throw new Error("Invalid credentials");
                }
            } catch (err) {
                res.status(401).send("Login failed " + err);
            }
})

module.exports = router;
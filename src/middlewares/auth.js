const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const adminAuth = (req,res,next) => {
//     const token = "xyz";
//     const isAdminAuthorized = token == "xyz";
//     if(!isAdminAuthorized) {
//         res.status(401).send("Not Authorized");
//     } else {
//         next();
//     }
// };

// const userAuth = (req,res,next) => {
//     const token = "xyz";
//     const isAdminAuthorized = token == "xyz";
//     if(!isAdminAuthorized) {
//         res.status(401).send("Not Authorized");
//     } else {
//         next();
//     }
// };

const userAuth = async (req, res, next) => {
    // read the token from the request cookies
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Token is not valid!!!!!!");
        }

        // validate the token
        const decodedObj = await jwt.verify(token, "Dev@Tinder#8970");
        // find the user
        const { _id } = decodedObj;
        const user = await User.findOne({ _id: _id });
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR: " + err);
    }
};

module.exports = {
    // adminAuth,
    userAuth
};
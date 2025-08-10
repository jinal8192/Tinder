const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending requests for the logged-in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");
    // .populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      success: true,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId, status: "accepted" },
        { toUserId: loggedInUserId, status: "accepted" },
      ],
    }).populate("fromUserId", "firstName lastName")
    .populate("toUserId", "firstName lastName");

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUserId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

module.exports = userRouter;

const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://jinaahjain:gKDd1z8AjBJy6Mgz@namastenodejs.kwaqxup.mongodb.net/devTinder"
    );
}

module.exports = connectDB;

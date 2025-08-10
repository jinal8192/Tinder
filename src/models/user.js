const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length > 5) {
                throw new Error("Only Five skills are allowed");
            }
        }
    }
}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder#8970", { expiresIn: "7d" });
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    return isPasswordValid;
}

userSchema.methods.encryptPassword = async function(password) {
    const user = this;
    const newPassword = await bcrypt.hash(user.password, 10);
    return newPassword;
}

module.exports = mongoose.model("User", userSchema);

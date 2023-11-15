const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A user must have a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
    },
});
const User = mongoose.model("User", userSchema);

module.exports = User;

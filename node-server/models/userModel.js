import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide your username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, "Please confirm your password"],
    //     validate: function (value) {
    //         return value === this.password;
    //     },
    // },
    photo: {
        type: String,
    },
});
const User = model("User", userSchema);

export default User;

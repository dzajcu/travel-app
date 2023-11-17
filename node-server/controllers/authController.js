import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";

export const signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET.trim(), {
        expiresIn: process.env.JWT_EXPIRES_IN.trim(),
    });
    console.log(token);
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new appError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ username }).select("+password");
    
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError("Incorrect email or password", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET.trim(), {
        expiresIn: process.env.JWT_EXPIRES_IN.trim(),
    });

    res.status(200).json({
        status: "success",
        token,
    });
});

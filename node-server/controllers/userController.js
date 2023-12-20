import User from "../models/userModel.js";
import Tour from "../models/tourModel.js";
import catchAsync from "../utils/catchAsync.js";

export const updateUserTours = catchAsync(async (userId, tourId) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { tours: tourId } },
        { new: true, runValidators: true }
    );

    return updatedUser;
});

export const getMe = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};

export const updateMe = catchAsync(async (req, res) => {
    console.log(req.user._id);
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            username: req.body.username,
            email: req.body.email,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});

export const deleteMe = catchAsync(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

export const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

export const getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    const userTours = await Tour.find({ _id: { $in: user.tours } }).select(
        "-user -startDate -endDate -description -__v -createdAt"
    );

    res.status(200).json({
        status: "success",
        data: {
            user: {
                ...user.toObject(),
                tours: userTours,
            },
        },
    });
});

export const createUser = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

export const updateUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const deleteUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

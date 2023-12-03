import Tour from "../models/tourModel.js";
import catchAsync from "../utils/catchAsync.js";
import { updateUserTours } from "./userController.js";

export const getAllTours = catchAsync(async (req, res) => {
    const tours = await Tour.find();

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours,
        },
    });
});

export const getTour = catchAsync(async (req, res) => {
    const tour = await Tour.findById(req.params.id); // Tour.findOne({ _id: req.params.id })

    if (!tour) return new AppError("No tour found with that ID", 404);

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
});

export const createTour = catchAsync(async (req, res) => {
    // Get start and end dates
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    
    const newTour = await Tour.create({
        user: req.user._id,
        place: req.body.place,
        startDate: startDate,
        endDate: endDate,
        description: req.body.description,
    });

    // Update user tours
    const updatedUser = await updateUserTours(req.body.user, newTour._id);

    // Respond with the created tour and updated user
    res.status(201).json({
        status: "success",
        data: {
            tour: newTour,
            user: updatedUser,
        },
    });
});

export const updateTour = catchAsync(async (req, res) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!tour) return new AppError("No tour found with that ID", 404);

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
});

export const deleteTour = catchAsync(async (req, res) => {
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!tour) return new AppError("No tour found with that ID", 404);

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
});

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
    const [startDateStr, endDateStr] = req.body.date.split(",");
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const imageUrls = req.files.map(file => file.location);

    const newTour = await Tour.create({
        user: req.user._id,
        place: req.body.place,
        startDate: startDate,
        endDate: endDate,
        description: req.body.description,
        images: imageUrls,
    });

    // Update user tours
    const updatedUser = await updateUserTours(req.user._id, newTour._id);

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

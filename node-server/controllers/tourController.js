import { Tour, Place } from "../models/tourModel.js";
import catchAsync from "../utils/catchAsync.js";
import { updateUserTours } from "./userController.js";
import User from "../models/userModel.js";

export const getAllTours = catchAsync(async (req, res) => {
    const tours = await Tour.find();

    const toursWithUser = [];

    for (const tour of tours) {
        const user = await User.findById(tour.user).select("_id username photo");
        const tourWithUser = { ...tour.toObject(), user };
        toursWithUser.push(tourWithUser);
    }

    res.status(200).json({
        status: "success",
        data: {
            tours: toursWithUser.reverse(),
        },
    });
});

export const getTour = catchAsync(async (req, res) => {
    const tour = await Tour.findById(req.params.id).populate("user", "username").populate("places"); // Tour.findOne({ _id: req.params.id })
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
    const albumName = req.body.albumName;
    const description = req.body.description;
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const newPlaces = await Promise.all(
        req.body.places.map(async (place, index) => {
            const placeImages = req.files
                .filter((file) =>
                    file.fieldname.startsWith(`places[${index}]images`)
                )
                .map((file) => file.location);

            const newPlace = await Place.create({
                placeName: place.placeName,
                coordinates: place.coordinates
                    .split(",")
                    .map((coord) => Number(coord)),
                images: placeImages,
            });
            return newPlace._id;
        })
    );

    const albumImage =
        req.files[0].fieldname === "albumFile" ? req.files[0].location : "";
    const newTour = await Tour.create({
        albumName,
        albumImage,
        startDate,
        endDate,
        description,
        user: req.user._id,
        places: newPlaces,
    });

    updateUserTours(req.user._id, newTour._id);

    res.status(201).json({
        status: "success",
        data: {
            tour: newTour,
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

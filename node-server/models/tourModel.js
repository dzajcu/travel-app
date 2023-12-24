import { Schema, model } from "mongoose";

const placeSchema = new Schema({
    placeName: {
        type: String,
        required: [true, "A tour must have a place"],
    },
    coordinates: {
        type: [Number],
    },
    images: [String],
    // createdAt: {
    //     type: Date,
    //     default: Date.now(),
    // },
});

const tourSchema = new Schema({
    albumName: {
        type: String,
    },
    albumImage: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [
            1000,
            "A tour description must have less or equal than 1000 characters",
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An album must be associated with a user"],
    },
    places: {
        type: [Schema.Types.ObjectId],
        ref: "Place",
        required: [true, "An album must have at least one place"],
    },
});
const Tour = model("Tour", tourSchema);
const Place = model("Place", placeSchema);

export { Tour, Place };

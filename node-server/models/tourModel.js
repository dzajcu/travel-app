import { Schema, model } from "mongoose";

const tourSchema = new Schema({
    place: {
        type: String,
        required: [true, "A tour must have a place"],
    },
    coordinates : {
        type: [Number],
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
    images: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A tour must be associated with a user"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Tour = model("Tour", tourSchema);

export default Tour;

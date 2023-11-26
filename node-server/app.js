import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import globalErrorController from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

// Set security HTTP headers
app.use(helmet());

// MIDDLEWARES
app.use(cors()); // Access-Control-Allow-Origin *
app.use(morgan("dev"));

const limiter = rateLimit({
    max: 1000,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests from this IP, please try again in 15 minutes!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(json({ limit: "10kb" }));

app.use(mongoSanitize());
app.use(xss());
// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

export default app;

import express, { json } from "express";
import morgan from "morgan";

import globalErrorController from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// 1) MIDDLEWARES
app.use(morgan("dev"));

app.use(json());
// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

export default app;

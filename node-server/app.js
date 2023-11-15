import express, { json } from "express";
import morgan from "morgan";

// const tourRouter = require("./routes/tourRoutes");
import userRouter from "./routes/userRoutes.js";

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTES
// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;

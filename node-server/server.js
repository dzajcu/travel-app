import { connect } from "mongoose";
import { config } from "dotenv";
import app from "./app.js";

config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

connect(DB)
    .then((con) => {
        console.log("DB connection successful!");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err.message);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

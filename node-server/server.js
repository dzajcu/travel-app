const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
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
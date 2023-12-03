import { Router } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import {
    createTour,
    getAllTours,
    getTour,
    updateTour,
    deleteTour,
} from "../controllers/tourController.js";
import { protect } from "../controllers/authController.js";
import { getMe } from "../controllers/userController.js";
import { config } from "dotenv";
config({ path: "./config.env" });

const router = Router();
const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "travel-map-bucket",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});

router.use(protect);

// Apply the multer middleware before the createTour route
router.post("/createTour", upload.array("images", 5), getMe, createTour);

router.route("/").get(getAllTours);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;

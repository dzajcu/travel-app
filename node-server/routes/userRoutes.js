import { Router } from "express";
import {
    getAllUsers,
    getUser,
    updateMe,
    getMe,
    updateUser,
    deleteUser,
    deleteMe,
} from "../controllers/userController.js";
import {
    protect,
    signup,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect);

router.get("/me", getMe, getUser);
router.patch("/updatePassword", updatePassword);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;

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

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.get("/me", protect, getMe, getUser);
router.patch("/updatePassword", protect, updatePassword);
router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;

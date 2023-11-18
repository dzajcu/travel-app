import { Router } from "express";
import {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
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

router.patch("/updatePassword", protect, updatePassword);

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;

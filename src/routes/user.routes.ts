import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  updatePassword,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

// Public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshToken);
router.route("/update-password").patch(verifyJWT, updatePassword);
router.route("/me").get(verifyJWT, getCurrentUser);

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;

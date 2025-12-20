import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOpt,
  verifyEmail,
} from "../Controllers/AuthController.js";
import userAuth from "../Middleware/UserAuth.js";

const authRouter = express.Router();

// ---------------- AUTH ----------------
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// ❌ userAuth removed (VERY IMPORTANT)
authRouter.post("/send-verify-otp", sendVerifyOpt);
authRouter.post("/verify-account", verifyEmail);

// ---------------- CHECK LOGIN ----------------
authRouter.get("/is-auth", userAuth, isAuthenticated);

// ---------------- RESET PASSWORD ----------------
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;

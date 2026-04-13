import express from "express";
import { login, logout, mysignUp, signup, verifyOtp } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/protect.middleware.js";

const authRouter = express.Router()

// authRouter.post('/signup', signup)
authRouter.post('/signup', mysignUp)

authRouter.post('/verifyOtp', verifyOtp)
authRouter.post('/login', login)
authRouter.post("/logout", protect, logout)

export { authRouter }
import express from "express";
import { login, logout, signup, verifyOtp } from "../controllers/auth.controller";
import { protect } from "../middlewares/protect.middleware";

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/verifyOtp', verifyOtp)
authRouter.post('/login', login)
authRouter.post("/logout", protect, logout)

export { authRouter }
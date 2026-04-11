import express from "express"
import { getProfile, updateProfile } from "../controllers/user.controller"
import { protect } from "../middlewares/protect.middleware"

const userRouter = express.Router()

userRouter.get("/profile/:username", protect, getProfile)
userRouter.put("/update-profile", protect, updateProfile)


export { userRouter }

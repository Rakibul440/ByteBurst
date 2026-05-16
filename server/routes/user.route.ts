import express from "express"
import { getEventRegistrationsOfAUser, getProfile, updateProfile } from "../controllers/user.controller.js"
import { protect } from "../middlewares/protect.middleware.js"

const userRouter = express.Router()

userRouter.get("/profile/:username", protect, getProfile)
userRouter.patch("/update-profile", protect, updateProfile)
userRouter.get("/registrations", protect, getEventRegistrationsOfAUser)

export { userRouter }

import express from "express"
import { registerForEvent } from "../controllers/registration.controller.js"
import { protect } from "../middlewares/protect.middleware.js"

const registrationRouter = express.Router()

registrationRouter.post("/eventRegister/:eventId", protect, registerForEvent)

export { registrationRouter }

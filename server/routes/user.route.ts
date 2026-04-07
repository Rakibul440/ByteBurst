import express from "express";
import { getProfile, updateProfile, getSingleProfile } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get('/profile', getProfile);
userRouter.put('/profile', updateProfile);
userRouter.get('/profile/:roll', getSingleProfile);

export { userRouter };
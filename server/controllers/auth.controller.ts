import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma";

import { generateOTP } from "../utils/otp.util";
import { sendmail } from "../services/mail.service";
import { hashCredential } from "../utils/hash.util";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";

// signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, roll, email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const passwordLength = password.length > 4;

        // check all field
        if (!name.trim() || !roll.trim() || !email.trim() || !password.trim()) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter all the fields" })

        // check password length
        if (!passwordLength) return res.status(StatusCodes.NOT_FOUND).json({ message: ".Password is too small" })

        // check email regex
        if (!emailRegex.test(email)) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter correct email" })

        // find user exist or not
        const user = await prisma.user.findUnique({
            where: { email: email, roll: roll }
        })


        if (user) return res.status(StatusCodes.CONFLICT).json({
            message: "User already exist"
        })

        // hashed password
        const hashed = await hashCredential(password)

        // generate otp
        const otpCode = generateOTP()
        const hashedOTP = await hashCredential(otpCode)

        // send otp
        await sendmail(otpCode, email)

        // create username
        const username = name.slice(0, 4) + '-' + roll.slice(-3)

        // create new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                username: username.toLowerCase(),
                email: email,
                roll: roll,
                password: hashed,
            }
        })

        if (!newUser) return res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to register" })

        // save otp in OTP db
        await prisma.oTP.create({
            data: {
                userId: newUser.id,
                code: hashedOTP,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        })

        // save token at Session
        const ipAddess = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"]
        const accessToken = generateAccessToken({
            name: newUser.name,
            email: newUser.email,
            roll: newUser.roll
        })

        const refreshToken = generateRefreshToken({
            email: newUser.email
        })


        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(StatusCodes.CREATED)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .cookie("username", newUser.username, options)
            .json({
                message: "Registered Successfully"
            })

    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

// login

// logout

// verifyOtp

const options = {
    httpOnly: true,
    secure: true,
};

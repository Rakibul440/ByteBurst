import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma.js";

import { generateOTP } from "../utils/otp.util.js";
import { sendmail } from "../services/mail.service.js";
import { compareCredential, hashCredential } from "../utils/hash.util.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util.js";

// signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, roll, email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const passwordLength = password.length > 4;

        const rollRegex = /^349\d{8}$/

        // check all field
        if (!name || !roll || !email || !password) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter all the fields" })

        // check password length
        if (!passwordLength) return res.status(StatusCodes.NOT_FOUND).json({ message: ".Password is too small" })

        // check email regex
        if (!emailRegex.test(email)) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Enter correct email" })

        // check roll regex
        if (!rollRegex.test(roll)) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Enter correct roll" })

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
        const username = "@" + name.slice(0, 4) + '-' + roll.slice(-8)

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

        return res
            .status(StatusCodes.CREATED)
            .json({
                message: "OTP sent to email"
            })

    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

// verifyOtp
export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        // check all field
        if (!email || !otp) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter OTP" })


        // find user otp exist or not
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                otps: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 1
                }
            }
        })

        const recordedOTP = user?.otps[0]

        if (!recordedOTP) return res.status(StatusCodes.NOT_FOUND).json({
            message: "OTP not found"
        })
        if (recordedOTP.expiresAt < new Date()) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "OTP expired" })

        // check otp
        const isOtpCorrect = await compareCredential(recordedOTP.code, otp)
        if (!isOtpCorrect) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Invalid OTP" })

        // update new user
        await prisma.user.update({
            where: { email: email },
            data: {
                isEmailVerified: true,
                isActive: true
            }
        })

        await prisma.oTP.deleteMany({
            where: { userId: user.id }
        })

        // save token at Session
        const forwarded = req.headers["x-forwarded-for"]
        const ipAddess = Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"]
        const accessToken = generateAccessToken({
            userId: user.id,
            name: user.name,
            email: user.email,
            roll: user.roll
        })

        const refreshToken = generateRefreshToken({
            userId: user.id,
            email: user.email
        })

        await prisma.session.create({
            data: {
                userId: user.id,
                refreshToken: refreshToken,
                ipAddress: ipAddess,
                userAgent: userAgent
            }
        })

        const updatedUser = await prisma.user.findUnique({
            where: { id: user.id }
        })

        if (!updatedUser) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Server Error"
        })


        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }


        return res
            .status(StatusCodes.CREATED)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .cookie("username", user.username, options)
            .json({
                message: "Registered Successfully",
                user: {
                    username: updatedUser.username,
                    name: updatedUser.name,
                    roll: updatedUser.roll,
                    role: updatedUser.role,
                    email: updatedUser.email,
                    dept: updatedUser.dept,
                    year: updatedUser.year,
                    sex: updatedUser.sex,
                    whatsAppNo: updatedUser.whatsAppNo,
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt,
                    isActive: updatedUser.isActive,
                    ifEmailVerified: updatedUser.isEmailVerified
                }
            })

    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

// login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const passwordLength = password.length > 4;

        // check all field
        if (!email.trim() || !password.trim()) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter all the fields" })

        // check password length
        if (!passwordLength) return res.status(StatusCodes.NOT_FOUND).json({ message: ".Password is too small" })

        // check email regex
        if (!emailRegex.test(email)) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter correct email" })

        // find user exist or not
        const user = await prisma.user.findUnique({
            where: { email: email }
        })


        if (!user) return res.status(StatusCodes.NOT_FOUND).json({
            message: "user not found"
        })

        if (!user.isEmailVerified) return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Please verify your email first"
        })


        // compare password
        const isPasswordCorrect = await compareCredential(user.password, password)

        if (!isPasswordCorrect) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid credentials"
            });
        }

        // save token at Session
        const forwarded = req.headers["x-forwarded-for"]
        const ipAddess = Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"]
        const accessToken = generateAccessToken({
            userId: user.id,
            name: user.name,
            email: user.email,
            roll: user.roll
        })

        const refreshToken = generateRefreshToken({
            userId: user.id,
            email: user.email
        })

        await prisma.session.create({
            data: {
                userId: user.id,
                refreshToken: refreshToken,
                ipAddress: ipAddess,
                userAgent: userAgent
            }
        })


        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }

        return res
            .status(StatusCodes.OK)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .cookie("username", user.username, options)
            .json({
                message: "Login Successfully",
                user: {
                    username: user.username,
                    name: user.name,
                    roll: user.roll,
                    role: user.role,
                    email: user.email,
                    dept: user.dept,
                    year: user.year,
                    sex: user.sex,
                    whatsAppNo: user.whatsAppNo,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    isActive: user.isActive,
                    isEmailVerified: user.isEmailVerified
                }
            })

    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}


// logout
export const logout = async (req: Request, res: Response) => {
    const userId = req.userId
    const token = req.cookies?.refreshToken
    try {

        if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized Request" })
        if (!token) return res.status(400).json({ message: "No session found" })

        await prisma.session.deleteMany({
            where: { userId: userId, refreshToken: token }
        })

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
        }

        return res
            .status(StatusCodes.OK)
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .clearCookie("username", options)
            .json({ message: "Logout successfully" })
    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}


// signup
export const mysignUp = async (req: Request, res: Response) => {
    try {
        const { name, roll, email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const passwordLength = password.length > 4;

        const rollRegex = /^349\d{8}$/

        // check all field
        if (!name || !roll || !email || !password) return res.status(StatusCodes.NOT_FOUND).json({ message: "Enter all the fields" })

        // check password length
        if (!passwordLength) return res.status(StatusCodes.NOT_FOUND).json({ message: ".Password is too small" })

        // check email regex
        if (!emailRegex.test(email)) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Enter correct email" })

        // check roll regex
        if (!rollRegex.test(roll)) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Enter correct roll" })

        // find user exist or not
        const user = await prisma.user.findUnique({
            where: { email: email, roll: roll }
        })


        if (user) return res.status(StatusCodes.CONFLICT).json({
            message: "User already exist"
        })

        // hashed password
        const hashed = await hashCredential(password)

        // create username
        const username = "@" + email.split('@')[0] + '-' + roll.slice(-8)

        // create new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                username: username.toLowerCase(),
                email: email,
                roll: roll,
                password: hashed,
                isEmailVerified: true,
                isActive: true
            }
        })

        if (!newUser) return res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to register" })

        // save token at Session
        const forwarded = req.headers["x-forwarded-for"]
        const ipAddess = Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"]
        const accessToken = generateAccessToken({
            userId: newUser.id,
            name: newUser.name,
            email: newUser.email,
            roll: newUser.roll
        })

        const refreshToken = generateRefreshToken({
            userId: newUser.id,
            email: newUser.email
        })

        await prisma.session.create({
            data: {
                userId: newUser.id,
                refreshToken: refreshToken,
                ipAddress: ipAddess,
                userAgent: userAgent
            }
        })

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }


        return res
            .status(StatusCodes.CREATED)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .cookie("username", newUser.username, options)
            .json({
                message: "Registered Successfully",
                user: {
                    username: newUser.username,
                    name: newUser.name,
                    roll: newUser.roll,
                    role: newUser.role,
                    email: newUser.email,
                    dept: newUser.dept,
                    year: newUser.year,
                    sex: newUser.sex,
                    whatsAppNo: newUser.whatsAppNo,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt,
                    isActive: newUser.isActive,
                    ifEmailVerified: newUser.isEmailVerified
                }
            })

    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}
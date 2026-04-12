import { prisma } from "../lib/prisma.js";
import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


// Get current user's profile
export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "FAHH! Unauthorized" });
        }

        const { username } = req.params;
        if (!username) return res.status(StatusCodes.NOT_FOUND).json({ message: "Wrong url" })
        const usernameId = Array.isArray(username) ? username[0] : username

        const user = await prisma.user.findUnique({
            where: { username: usernameId },
            select: {
                id: true,
                username: true,
                name: true,
                roll: true,
                email: true,
                dept: true,
                year: true,
                sex: true,
                whatsAppNo: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                isActive: true,
                isEmailVerified: true,
                TshirtSize: true
            }
        });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        return res.status(StatusCodes.OK).json({
            message: "Profile retrieved successfully",
            user
        });

    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Update current user's profile
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "FAHH! Unauthorized" });
        }

        const { name, dept, year, sex, whatsAppNo } = req.body;


        if (!name?.trim()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Name is required" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name,
                dept: dept?.toUpperCase() || "",
                year: year.toUpperCase() || "",
                sex: sex.toUpperCase() || "",
                whatsAppNo: whatsAppNo || "",
                updatedAt: new Date()

            },
            select: {
                id: true,
                username: true,
                name: true,
                roll: true,
                email: true,
                dept: true,
                year: true,
                sex: true,
                whatsAppNo: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                isActive: true,
                isEmailVerified: true,
                TshirtSize: true
            }
        });

        if (!updatedUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed to update information" })

        return res.status(StatusCodes.OK).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Get single user profile by roll number
export const getSingleProfile = async (req: Request, res: Response) => {
    try {
        const { roll } = req.params;

        const rollNo = Array.isArray(roll) ? roll[0] : roll;

        if (!rollNo) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Roll number is required" });
        }

        const user = await prisma.user.findUnique({
            where: { roll: rollNo },
            select: {
                id: true,
                username: true,
                name: true,
                roll: true,
                email: true,
                dept: true,
                year: true,
                sex: true,
                whatsAppNo: true,
                role: true,
                createdAt: true,
                isActive: true,
                ifEmailVerified: true
            }
        });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        return res.status(StatusCodes.OK).json({
            message: "User profile retrieved successfully",
            user
        });

    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
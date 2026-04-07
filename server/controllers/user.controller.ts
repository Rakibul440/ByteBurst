import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";


const getUserFromToken = (req: Request) => {
    const token = req.cookies.accessToken;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as any;
        return decoded;
    } catch (error) {
        return null;
    }
};


// Get current user's profile
export const getProfile = async (req: Request, res: Response) => {
    try {
        const userData = getUserFromToken(req);
        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "FAHH! Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: { email: userData.email },
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
                ifEmailVerified: true
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
        const userData = getUserFromToken(req);
        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "FAHHH ! Unauthorized" });
        }

        const { name, dept, year, sex, whatsAppNo } = req.body;

        
        if (!name?.trim()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Name is required" });
        }

        const updateData: any = {
            name: name.trim(),
            updatedAt: new Date()
        };

    
        if (dept) updateData.dept = dept;
        if (year) updateData.year = year;
        if (sex) updateData.sex = sex;
        if (whatsAppNo) updateData.whatsAppNo = whatsAppNo;

        const updatedUser = await prisma.user.update({
            where: { email: userData.email },
            data: updateData,
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
                updatedAt: true,
                isActive: true,
                ifEmailVerified: true
            }
        });

        return res.status(StatusCodes.OK).json({message: "Profile updated successfully",
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

        if (!roll?.trim()) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Roll number is required" });
        }

        const user = await prisma.user.findUnique({
            where: { roll: roll.trim() },
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
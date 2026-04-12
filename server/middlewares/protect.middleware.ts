import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

interface MyTokenPayload extends JwtPayload {
    userId: string
}


export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    const token =
        req.cookies?.accessToken ||
        (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized request" })

    try {

        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as MyTokenPayload

        if (!decodedToken) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Token" })

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId }
        })

        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid Access Token, Can't find any user" })

        req.userId = user.id;
        next()

    } catch (error: any) {
        console.log(error.name, error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res.status(500).json({ message: "Something went wrong" });
    }
}
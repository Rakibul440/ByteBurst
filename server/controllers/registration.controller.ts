import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma.js";

// Register current user for an event
export const registerForEvent = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please Login First" })

        const { eventId } = req.params
        const eventId_ = Array.isArray(eventId) ? eventId[0] : eventId

        console.log("userId:", userId)
        console.log("eventId:", eventId_)
        if (!eventId) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Event ID is required" })


        // check already registered
        const existing = await prisma.registration.findUnique({
            where: { userId_eventId: { userId: userId, eventId: eventId_ } }
        })
        console.log("asdasdasdasd", existing);

        if (existing != null) return res.status(StatusCodes.CONFLICT).json({ message: "Already registered for this event" })

        const registration = await prisma.registration.create({
            data: { userId, eventId: eventId_ },
            select: {
                id: true,
                createdAt: true,
                event: { select: { category: true } }
            }
        })

        const registeredUser = await prisma.user.findFirst({
            where: { id: userId },
            select: {
                username: true,
                name: true,
                roll: true,
                role: true,
                email: true,
                dept: true,
                year: true,
                sex: true,
                whatsAppNo: true,
                createdAt: true,
                updatedAt: true,
                isActive: true,
                isEmailVerified: true,
                registrations: {
                    select: {
                        id: true,
                        createdAt: true,
                        event: {
                            select: { category: true }
                        }
                    }
                }

            }
        })

        return res.status(StatusCodes.CREATED).json({
            message: "Registered for event successfully",
            registeredUser,
            registration
        })

    } catch (error: any) {
        console.log(error.code || error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

// Unregister current user from an event
// export const unregisterFromEvent = async (req: Request, res: Response) => {
//     try {
//         const userId = req.userId
//         if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" })

//         const { eventId } = req.body

//         if (!eventId) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Event ID is required" })

//         const existing = await prisma.registration.findUnique({
//             where: { userId_eventId: { userId, eventId } }
//         })
//         if (!existing) return res.status(StatusCodes.NOT_FOUND).json({ message: "Registration not found" })

//         await prisma.registration.delete({
//             where: { userId_eventId: { userId, eventId } }
//         })

//         return res.status(StatusCodes.OK).json({ message: "Unregistered from event successfully" })

//     } catch (error: any) {
//         console.log(error.code || error.message)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
//     }
// }

// Get all registrations of the current user
// export const getMyRegistrations = async (req: Request, res: Response) => {
//     try {
//         const userId = req.userId
//         if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" })

//         const registrations = await prisma.registration.findMany({
//             where: { userId },
//             include: { event: true, team: true },
//             orderBy: { createdAt: "desc" }
//         })

//         return res.status(StatusCodes.OK).json({
//             message: "Registrations retrieved successfully",
//             registrations
//         })

//     } catch (error: any) {
//         console.log(error.code || error.message)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
//     }
// }

// // Get all registrations for a specific event (admin)
// export const getEventRegistrations = async (req: Request, res: Response) => {
//     try {
//         const userId = req.userId
//         if (!userId) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" })

//         const { eventId } = req.params
//         if (!eventId) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Event ID is required" })

//         const event = await prisma.event.findUnique({ where: { id: eventId } })
//         if (!event) return res.status(StatusCodes.NOT_FOUND).json({ message: "Event not found" })

//         const registrations = await prisma.registration.findMany({
//             where: { eventId },
//             include: {
//                 user: {
//                     select: {
//                         id: true, username: true, name: true, roll: true,
//                         email: true, dept: true, year: true, whatsAppNo: true
//                     }
//                 },
//                 team: true
//             },
//             orderBy: { createdAt: "desc" }
//         })

//         return res.status(StatusCodes.OK).json({
//             message: "Event registrations retrieved successfully",
//             registrations
//         })

//     } catch (error: any) {
//         console.log(error.code || error.message)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
//     }
// }

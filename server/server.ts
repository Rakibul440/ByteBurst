import express, { Request, Response } from "express"
import "dotenv/config"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { authRouter } from "./routes/auth.route"
import { userRouter } from "./routes/user.route"

const app = express()
const port = process.env.PORT || 3000;

// middlewares
const trustedOrigins = process.env.TRUSTED_ORIGINS?.split(',') || []
app.use(cors({
    origin: trustedOrigins,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)


app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hey Babby, Server is running!"
    })
})


app.listen(port, () => {
    console.log(`Server is runnig! \nServer :   http://localhost:${port}`);
})
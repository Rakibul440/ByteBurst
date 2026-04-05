import jwt, { SignOptions } from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
        }
    );
};

// refresh token

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
        }
    );
};

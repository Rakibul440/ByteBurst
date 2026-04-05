import bcrypt from "bcryptjs";

export const hashCredential = async (secret: string) => {
    return await bcrypt.hash(secret, 10);
}

export const compareCredential = async (hash: string, secret: string) => {
    return await bcrypt.compare(secret, hash)
}
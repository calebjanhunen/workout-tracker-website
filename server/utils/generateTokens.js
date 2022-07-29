import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ACCESS_TOKEN_EXPIRE_LENGTH } from "../utils/constants.js";

dotenv.config();

export function generateAccessToken(_id) {
    return jwt.sign(
        { _id: _id.toString() },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
            expiresIn: ACCESS_TOKEN_EXPIRE_LENGTH,
        }
    );
}

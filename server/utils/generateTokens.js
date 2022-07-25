import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_LENGTH } from "../config/constants.js";

export function generateAccessToken(_id) {
    return jwt.sign(
        { _id: _id.toString() },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
            expiresIn: ACCESS_TOKEN_EXPIRE_LENGTH,
        }
    );
}

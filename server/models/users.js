import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
    REFRESH_TOKEN_COOKIE_EXPIRE_LENGTH,
    REFRESH_TOKEN_EXPIRE_LENGTH,
} from "../utils/constants.js";

dotenv.config();

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    refreshTokens: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.generateRefreshToken = async function (req, res) {
    const user = this;
    const { refreshToken } = req.cookies;

    //clear refresh token cookie if it exists
    if (refreshToken)
        res.clearCookie("refreshToken", {
            httpOnly: true,
            maxAge: REFRESH_TOKEN_COOKIE_EXPIRE_LENGTH,
        });

    //TODO: filter out expired refresh tokens?
    //filter old refresh token (if the cookie exists)
    const refreshTokenArr = refreshToken
        ? user.refreshTokens.filter(token => token !== refreshToken)
        : user.refreshTokens;

    //create new refresh token
    const newRefreshToken = jwt.sign(
        { _id: user._id.toString() },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: REFRESH_TOKEN_EXPIRE_LENGTH }
    );

    //create new refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_COOKIE_EXPIRE_LENGTH,
    });

    //push new refresh token onto the refreh token array in userSChema
    user.refreshTokens = [...refreshTokenArr, newRefreshToken];

    try {
        await user.save();
        return newRefreshToken;
    } catch (err) {
        return err;
    }
};

const User = mongoose.model("Users", userSchema);

export default User;

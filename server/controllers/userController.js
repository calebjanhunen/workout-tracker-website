import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_EXPIRE_LENGTH } from "../config/constants.js";
import User from "../models/users.js";

export async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username });
        if (foundUser)
            return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        await newUser.generateRefreshToken(req, res);
        console.log("hey");
        const accessToken = jwt.sign(
            { _id: newUser._id.toString() },
            `${process.env.ACCESS_TOKEN_SECRET}`,
            { expiresIn: ACCESS_TOKEN_EXPIRE_LENGTH }
        );

        res.status(201).json({ newUser, accessToken });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

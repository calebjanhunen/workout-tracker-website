import bcrypt from "bcrypt";

import { generateAccessToken } from "../utils/generateTokens.js";
import User from "../models/users.js";

export async function registerUser(req, res) {
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
        const accessToken = generateAccessToken(newUser._id);

        res.status(201).json({ newUser, accessToken });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username });
        if (!foundUser)
            return res
                .status(401)
                .json({ message: "Invalid username or password" });

        const validPassword = await bcrypt.compare(
            password,
            foundUser.password
        );
        if (!validPassword)
            return res
                .status(401)
                .json({ message: "Invalid username or password" });

        //Create JWTs
        await foundUser.generateRefreshToken(req, res);
        const accessToken = generateAccessToken(foundUser._id);

        res.json({ accessToken });
    } catch (err) {
        res.status(400).json({ message: "Could not login user" });
    }
}

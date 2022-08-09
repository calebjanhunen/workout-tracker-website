import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';
import { REFRESH_TOKEN_COOKIE_EXPIRE_LENGTH } from '../utils/constants.js';
import { generateAccessToken } from '../utils/generateTokens.js';

dotenv.config();

export async function registerUser(req, res) {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username });
        if (foundUser)
            return res.status(409).json({ message: 'User already exists' });

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
                .json({ message: 'Invalid username or password' });

        const validPassword = await bcrypt.compare(
            password,
            foundUser.password
        );
        if (!validPassword)
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });

        //Create JWTs
        await foundUser.generateRefreshToken(req, res);
        const accessToken = generateAccessToken(foundUser._id);

        res.json({ accessToken });
    } catch (err) {
        res.status(400).json({ message: 'Could not login user' });
    }
}

export async function logoutUser(req, res) {
    const { refreshToken } = req.cookies;

    //cookie not found -> user not logged in
    if (!refreshToken)
        return res.status(401).json({ message: 'Not logged in' });

    try {
        const foundUser = await User.findOne({ refreshTokens: refreshToken });

        //cookie is found, user not found -> old cookie
        if (!foundUser) {
            res.clearCookie('refreshToken', {
                secure: true,
                sameSite: 'None',
                httpOnly: true,
                maxAge: REFRESH_TOKEN_COOKIE_EXPIRE_LENGTH,
            });
            return res.sendStatus(204);
        }

        //delete cookie from db
        const newRefreshTokenArr = foundUser.refreshTokens.filter(
            token => token != refreshToken
        );
        foundUser.refreshTokens = [...newRefreshTokenArr];
        await foundUser.save();

        res.clearCookie('refreshToken', {
            secure: true,
            sameSite: 'None',
            httpOnly: true,
            maxAge: REFRESH_TOKEN_COOKIE_EXPIRE_LENGTH,
        });

        res.json('Logged out successfully');
    } catch (err) {
        res.status(400).json({ message: 'Could not logout user' });
    }
}

export async function handleRefreshToken(req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
        return res.status(401).json({ message: 'Not logged in' });

    try {
        const foundUser = await User.findOne({ refreshTokens: refreshToken });
        if (!foundUser)
            return res.status(403).json({ message: 'Invalid refresh token' });
        // console.log(foundUser);

        //verify refresh token is not expired
        jwt.verify(
            refreshToken,
            `${process.env.REFRESH_TOKEN_SECRET}`,
            (err, decoded) => {
                if (err)
                    return res
                        .status(401)
                        .json({ message: 'Refresh token expired.' });

                const accessToken = generateAccessToken(decoded._id);

                res.json({ username: foundUser.username, accessToken });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Could not refresh access token' });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ username: user.username });
    } catch (err) {
        res.status(400).json({ message: 'Could not retrieve user' });
    }
}

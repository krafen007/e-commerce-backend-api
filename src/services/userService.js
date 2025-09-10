import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import ApiErrorHandler from './../utils/ApiErrorHandler.js';

// Register Handler
export const registerHandler = async ({ firstName, lastName, email, password }) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        throw new ApiErrorHandler('User already exists!', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    const user = newUser.toObject();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
    });

    user.token = token;

    return user;
};

// Log In Handler
export const logInHandler = async ({ email, password }) => {
    const findUser = await userModel.findOne({ email }).select('+password');

    if (!findUser) {
        throw new ApiErrorHandler('Not user found with this email!', 404);
    }

    const passwordMatching = await bcrypt.compare(password, findUser.password);

    if (!passwordMatching) {
        throw new ApiErrorHandler('Invalid password, Please try again', 401);
    }

    const user = findUser.toObject();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
    });

    user.token = token;

    delete user.password;

    return user;
};

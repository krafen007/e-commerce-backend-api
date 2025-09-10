import jwt from 'jsonwebtoken';
import ApiErrorHandler from '../utils/ApiErrorHandler.js';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHead = req.headers.authorization;
    if (!authHead || !authHead.startsWith('Bearer ')) {
        throw new ApiErrorHandler('Not authorized, Token missing or malformed', 401);
    }
    const token = authHead.split(' ')[1];

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        throw new ApiErrorHandler('Not authorized: invalid or expired token', 401);
    }

    const user = await userModel.findById(decoded.userId);

    if (!user) {
        throw new ApiErrorHandler('Not authorized, invalid or expired token', 401);
    }

    req.user = user;

    next();
});
export default authMiddleware;

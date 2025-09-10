import asyncHandler from 'express-async-handler';
import ApiResponseHandler from './../utils/ApiResponseHandler.js';
import { logInHandler, registerHandler } from '../services/userService.js';

/**
 * @disc Registering
 * @route Post api/user/register
 * @access Public
 */
export const register = asyncHandler(async (req, res) => {
    const user = await registerHandler(req.body);

    res.status(201).json(new ApiResponseHandler(201, 'User created successfully', user));
});
/**
 * @disc Log in
 * @route Post api/user/login
 * @access Public
 */
export const logIn = asyncHandler(async (req, res) => {
    const user = await logInHandler(req.body);

    res.status(200).json(new ApiResponseHandler(200, 'Log in successfully', user));
});

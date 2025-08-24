import { logInHandler, registerHandler } from '../services/userService.js';

/**
 * @disc Registering
 * @route Post api/user/register
 * @access Public
 */
export const register = async (req, res, next) => {
  try {
    const user = await registerHandler(req.body);
    return res.status(201).json({
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @disc Log in
 * @route Post api/user/login
 * @access Public
 */
export const logIn = async (req, res, next) => {
  try {
    const user = await logInHandler(req.body);
    return res.status(200).json({
      message: 'Log in successfully',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

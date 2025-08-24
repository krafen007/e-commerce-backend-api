import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;
    if (!authHead || !authHead.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Not authorized, Token missing or malformed',
      });
    }
    const token = authHead.split(' ')[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: 'Not authorized, invalid or expired token',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error in authMiddleware',
      error: error.message,
    });
  }
};

export default authMiddleware;

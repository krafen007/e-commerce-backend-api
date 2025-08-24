import express from 'express';
import { logIn, register } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { logInSchema, registerSchema } from '../validations/userValidation.js';

const router = express.Router();

router.post('/register', validationMiddleware(registerSchema), register);
router.post('/login', validationMiddleware(logInSchema), logIn);
router.get('/profile', authMiddleware, (req, res) => {
  res
    .status(200)
    .send(`Hello mr ${req.user.firstName} your role is: ${req.user.role}`);
});

export default router;

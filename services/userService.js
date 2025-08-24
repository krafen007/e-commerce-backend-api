import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Register Handler
export const registerHandler = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    const error = new Error('User already exists!');
    error.statusCode = 409;
    throw error;
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
    const error = new Error('Not user found with this email!');
    error.statusCode = 404;
    throw error;
  }

  const passwordMatching = await bcrypt.compare(password, findUser.password);

  if (!passwordMatching) {
    const error = new Error('Invalid password, Please try again');
    error.statusCode = 401;
    throw error;
  }

  const user = findUser.toObject();

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });

  user.token = token;

  delete user.password;

  return user;
};

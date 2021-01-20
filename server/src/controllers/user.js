import bcrypt from 'bcryptjs';

import User from '../models/user';
import jsonRes from '../utils/jsonResponse';
import asyncHandler from '../middlewares/asyncHandler';
import checkId from '../utils/checkId';
import { generateToken } from '../utils/generateToken';

const USER = 'user';

export const getUsers = asyncHandler(async (req, res, next) => {
  const userList = await User.find().select('-password');

  return jsonRes.success(res, 200, 'Users retrieved successfully', userList);
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, USER, next);
  const user = await User.findById(id).select('-password');
  if (!user) {
    return next(jsonRes.error(404, `User with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'User retrieved successfully', user);
});

export const signupUser = asyncHandler(async (req, res, next) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return next(jsonRes.error(400, 'Email already exist'));

  const user = await User.create({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 12),
  });
  const token = generateToken(user);

  return jsonRes.success(res, 201, 'User created successfully', {
    createdAt: user._doc.createdAt,
    token,
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(jsonRes.error(400, 'Email or password is wrong'));
  }
  const token = generateToken(user);

  return jsonRes.success(res, 200, 'User login success', {
    createdAt: user._doc.createdAt,
    token,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  checkId(id, USER, next);
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(jsonRes.error(404, `User with ID ${id} not found`));
  }

  return jsonRes.success(res, 200, 'User deleted successfully', User);
});

export const getUsersCount = asyncHandler(async (req, res, next) => {
  const userCount = await User.countDocuments((count) => count);
  return jsonRes.success(
    res,
    200,
    'Users count retrieved successfully',
    userCount
  );
});

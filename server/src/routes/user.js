import express from 'express';

import {
  deleteUser,
  getSingleUser,
  getUsers,
  getUsersCount,
  loginUser,
  signupUser,
} from '../controllers/user';

const router = express.Router();

router.get('/', getUsers);
router.route('/:id').get(getSingleUser).delete(deleteUser);
router.post('/register', signupUser);
router.post('/login', loginUser);
router.get('/get/count', getUsersCount);

export default router;

import jwt from 'jsonwebtoken';

export const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
    { expiresIn: '3h' }
  );

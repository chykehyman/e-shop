import expressJWT from 'express-jwt';

const { SECRET_KEY, API_URL } = process.env;

const isRevoked = (req, payload, done) => {
  if (!payload.isAdmin) done(null, true);
  done();
};

export default () =>
  expressJWT({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    isRevoked,
  }).unless({
    path: [
      `${API_URL}/users/register`,
      `${API_URL}/users/login`,
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
    ],
  });

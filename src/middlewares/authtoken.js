const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(authorization, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authToken;
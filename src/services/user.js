const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateUser = async (data) => {
  const { email, password } = data;
  const secret = process.env.JWT_SECRET;

  if (!email || !password) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'BAD_REQUEST', message: 'Invalid fields' };
  }

  const configJwt = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({
    data: {
      userId: user.id,
    },
  }, secret, configJwt);

  return { message: token };
};

module.exports = validateUser;
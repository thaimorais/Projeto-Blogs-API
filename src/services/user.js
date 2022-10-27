const jwt = require('jsonwebtoken');
const { User } = require('../models');

const tokenJWT = (payload) => {
  const secret = process.env.JWT_SECRET;
  const configJwt = { expiresIn: '7d', algorithm: 'HS256' };

  const createToken = jwt.sign(payload, secret, configJwt);

  return createToken;
};

const validateUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'BAD_REQUEST', message: 'Invalid fields' };
  }

  const token = tokenJWT({ data: { userId: user.id } });

  return { message: token };
};

const newUser = async (data) => {
  const { displayName, email, password } = data;

  if (displayName.length < 8) {
    return { type: 'BAD_REQUEST', 
    message: '"displayName" length must be at least 8 characters long' };
  } if (!email.includes('@')) {
    return { type: 'BAD_REQUEST', message: '"email" must be a valid email' };
  } if (password.length < 6) {
    return { type: 'BAD_REQUEST', message: '"password" length must be at least 6 characters long' };
  }

  const user = await User.findOne({ where: { email } });

  if (user) return { type: 'EMAIL_UNAVAILABLE', message: 'User already registered' };

  const { dataValues } = await User.create(data);
  const token = tokenJWT({ data: { userId: dataValues.id } });

  return { type: 'SUCESS', message: token };
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'User does not exist' };
  }
  
  return { type: null, message: user };
};

module.exports = { 
  validateUser,
  newUser,
  getUsers,
  getUserById,
};
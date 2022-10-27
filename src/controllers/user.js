const { user } = require('../services');

const login = async (req, res) => {
  const { type, message } = await user.validateUser(req.body);

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(200).json({ token: message });
};

const newUser = async (req, res) => {
  const { type, message } = await user.newUser(req.body);

  if (type === 'BAD_REQUEST') {
    return res.status(400).json({ message });
  } if (type === 'EMAIL_UNAVAILABLE') {
    return res.status(409).json({ message });
  }

  return res.status(201).json({ token: message });
};

const getUsers = async (_req, res) => {
  const users = await user.getUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await user.getUserById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  login,
  newUser,
  getUsers,
  getUserById,
};
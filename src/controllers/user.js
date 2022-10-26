const { user } = require('../services');

const login = async (req, res) => {
  const { type, message } = await user(req.body);

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(200).json({ token: message });
};

module.exports = {
  login,
};
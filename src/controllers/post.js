const { postServices } = require('../services/index');

const createPost = async (req, res) => {
  const { body } = req;

  const { type, message } = await postServices.post(body);

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(201).json(message);
};

module.exports = {
  createPost,
};
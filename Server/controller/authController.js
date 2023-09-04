const welcome_get = (req, res) => {
  res.status(200).json({ message: 'Welcome to the server!' });
};

module.exports = { welcome_get };

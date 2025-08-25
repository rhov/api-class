const userService = require('../service/userService');

exports.register = (req, res) => {
  try {
    const { username, password, favorecido } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
    const user = userService.registerUser({ username, password, favorecido });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
    const user = userService.loginUser({ username, password });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};

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

const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/authMiddleware');

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
    const user = userService.loginUser({ username, password });
    // Não incluir senha no token
    const payload = { username: user.username };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};

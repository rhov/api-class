const { users } = require('../model/userModel');

function registerUser({ username, password, favorecido }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, favorecido: Array.isArray(favorecido) ? favorecido : [] };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Login ou senha inválidos');
  return user;
}

function getUsers() {
  return users;
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};

const userService = require('../../service/userService');
const transferService = require('../../service/transferService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecret';

const resolvers = {
  Query: {
    users: () => userService.getUsers(),
    transfers: () => transferService.getTransfers(),
  },
  Mutation: {
    login: (_, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { user, token };
    },
    registerUser: (_, { username, password, favorecido }) => {
      return userService.registerUser({ username, password, favorecido });
    },
    transfer: (_, { from, to, amount, data }, context) => {
      if (!context.user) throw new Error('Autenticação necessária');
      // Garante que o usuário autenticado é o remetente
      if (context.user.username !== from) throw new Error('Usuário autenticado não corresponde ao remetente');
      return transferService.transfer({ from, to, amount, data });
    },
  },
};

module.exports = resolvers;

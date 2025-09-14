// app.js para GraphQL API
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

// Exporta uma Promise que resolve o app pronto
module.exports = (async () => {
  await server.start();
  server.applyMiddleware({ app });
  return app;
})();

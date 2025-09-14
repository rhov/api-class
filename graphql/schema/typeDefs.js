const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    password: String!
    favorecido: [String!]!
    balance: Float
  }

  type Transfer {
    from: String!
    to: String!
    amount: Float!
    data: String
    date: String
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Query {
    users: [User!]!
    transfers: [Transfer!]!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    registerUser(username: String!, password: String!, favorecido: [String!], balance: Float): User!
    transfer(from: String!, to: String!, amount: Float!, data: String): Transfer!
  }
`;

const apiURLRest = 'http://localhost:3000';
const apiURLGraphql = 'http://localhost:4000/graphql';
const {users} = require ('../../model/userModel');
const userLogin = users;

module.exports = { apiURLRest,userLogin, apiURLGraphql };

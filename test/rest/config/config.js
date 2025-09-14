const apiURL = 'http://localhost:3000';
const userLogin = {"username": "rodrigo", "password": "123456"};


const apiURLGraphQL = 'http://localhost:4000/graphql';
const {users} = require('../../../model/userModel');
const ul = users;
module.exports = { apiURL,userLogin, ul, apiURLGraphQL};

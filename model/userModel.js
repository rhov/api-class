// In-memory user database
// Cada usuário: { username, password, favorecido: [pessoa1, pessoa2, ...] }
const users = [
  { "username": "aline", "password": "123456", "favorecido": ["rodrigo"] },
  { "username": "rodrigo", "password": "123456", "favorecido": ["aline"] }
];


module.exports = {
  users
}; 

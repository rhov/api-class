// In-memory user database
// Cada usuário: { username, password, favorecido: [pessoa1, pessoa2, ...] }
const users = [
  { username: "aline", password: "123456", favorecido: ["rodrigo"],balance:10000 },
  { username: "rodrigo", password: "123456", favorecido: ["aline"],balance:10000 },
    { username: "sheldon", password: "123", favorecido: ["aline","rodrigo"],balance:50 }
];


module.exports = {
  users
}; 

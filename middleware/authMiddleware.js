const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

// Função genérica para extrair e validar o token
function authenticate(token) {
  if (!token) return { error: 'Token não fornecido', status: 401 };
  try {
    const user = jwt.verify(token.replace('Bearer ', ''), SECRET);
    return { user };
  } catch {
    return { error: 'Token inválido', status: 401 };
  }
}

// Middleware para Express (REST)
function authMiddlewareREST(req, res, next) {
  const token = req.headers['authorization'];
  const result = authenticate(token);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  req.user = result.user;
  next();
}

// Middleware para GraphQL (context)
function authMiddlewareGraphQL({ req }) {
  const token = req.headers['authorization'];
  const result = authenticate(token);
  if (result.error) {
    // Para GraphQL, pode lançar erro ou retornar user como null
    throw new Error(result.error);
  }
  return { user: result.user };
}

module.exports = {
  authMiddlewareREST,
  authMiddlewareGraphQL,
  authenticate,
  SECRET,
};

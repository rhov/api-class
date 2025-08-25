# API de Transferências

Esta API permite realizar operações de login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. O objetivo é servir como base para estudos de testes e automação de APIs.

## Funcionalidades
- **Registro de usuário**: Não permite usuários duplicados.
- **Login**: Requer usuário e senha.
- **Consulta de usuários**: Lista todos os usuários cadastrados.
- **Transferências**: Só permite transferências acima de R$ 5.000,00 para usuários marcados como "favorecido".
- **Swagger**: Documentação interativa disponível em `/api-docs`.

## Estrutura de diretórios
- `controller/`: Lógica dos endpoints
- `service/`: Regras de negócio
- `model/`: Dados em memória
- `app.js`: Configuração dos endpoints e middlewares
- `server.js`: Inicialização do servidor
- `swagger.json`: Documentação Swagger

## Instalação
1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd api-class
   ```
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Executando a API
- Para iniciar o servidor:
  ```bash
  node server.js
  ```
- Para importar o app em testes:
  ```js
  const app = require('./app');
  ```

## Endpoints principais
- `POST /register` — Registro de usuário
- `POST /login` — Login
- `GET /users` — Consulta de usuários
- `POST /transfer` — Realizar transferência
- `GET /transfers` — Consulta de transferências
- `GET /api-docs` — Documentação Swagger

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar o servidor.
- Para testar transferências, crie usuários com o campo `favorecido: true` para permitir transferências acima de R$ 5.000,00.

## Testes
- Recomenda-se o uso do [Supertest](https://github.com/visionmedia/supertest) para testes automatizados.

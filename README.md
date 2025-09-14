
# API de Transferências

Esta API permite realizar operações de login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. Agora disponível via REST e GraphQL.

## Funcionalidades
- **Registro de usuário**: Não permite usuários duplicados.
- **Login**: Requer usuário e senha.
- **Consulta de usuários**: Lista todos os usuários cadastrados.
- **Transferências**: Só permite transferências acima de R$ 5.000,00 para usuários marcados como "favorecido".
- **Swagger**: Documentação interativa disponível em `/api-docs`.
- **GraphQL**: Interface disponível em `/graphql`.

## Estrutura de diretórios
- `controller/`: Lógica dos endpoints REST
- `service/`: Regras de negócio
- `model/`: Dados em memória
- `graphql/`: Estrutura da API GraphQL
  - `app.js`: Configuração do ApolloServer e Express
  - `server.js`: Inicialização do servidor GraphQL
  - `schema/`: Types e Resolvers GraphQL
  - `middleware/`: Autenticação JWT
- `app.js`: Configuração dos endpoints REST
- `server.js`: Inicialização do servidor REST
- `swagger.json`: Documentação Swagger

## Instalação
1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd api-class
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando a API REST
- Para iniciar o servidor REST:
  ```bash
  node server.js
  ```
- Para importar o app em testes:
  ```js
  const app = require('./app');
  ```

## Executando a API GraphQL
- Para iniciar o servidor GraphQL:
  ```bash
  node graphql/server.js
  ```
- Acesse a interface GraphQL Playground em:
  [http://localhost:4000/graphql](http://localhost:4000/graphql)
- Para importar o app em testes:
  ```js
  const app = require('./graphql/app');
  ```

## Endpoints principais REST
- `POST /register` — Registro de usuário
- `POST /login` — Login
- `GET /users` — Consulta de usuários
- `POST /transfer` — Realizar transferência
- `GET /transfers` — Consulta de transferências
- `GET /api-docs` — Documentação Swagger

## Operações GraphQL
### Queries
- `users`: Lista todos os usuários
- `transfers`: Lista todas as transferências

### Mutations
- `login(username, password)`: Retorna usuário e token JWT
- `registerUser(username, password, favorecido)`: Cria novo usuário
- `transfer(from, to, amount, data)`: Realiza transferência (requer autenticação JWT)

#### Exemplo de Mutation de Login
```graphql
mutation {
  login(username: "user1", password: "senha123") {
    user {
      username
      favorecido
      balance
    }
    token
  }
}
```

#### Exemplo de Mutation de Transferência (com JWT)
```graphql
mutation {
  transfer(from: "user1", to: "user2", amount: 100, data: "Pagamento") {
    from
    to
    amount
    data
    date
  }
}
```
> Para Mutations protegidas, envie o token JWT no header `Authorization: Bearer <token>`

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar o servidor.
- Para testar transferências, crie usuários com o campo `favorecido: true` para permitir transferências acima de R$ 5.000,00.

## Testes
- Recomenda-se o uso do [Supertest](https://github.com/visionmedia/supertest) para testes automatizados tanto na API REST quanto na GraphQL.

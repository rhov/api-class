

# API de Transferências

Projeto criado na aula de automação de testes de API REST e GraphQL.

Esta API permite realizar operações de login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. Agora disponível via REST e GraphQL.

## Funcionalidades

---

## 🚀 Instruções de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo (sem aspas, ponto e vírgula ou espaços extras):

```env
BASE_URL_GRAPHQL=http://localhost:4000/graphql
BASE_URL_REST=http://localhost:3000
JWT_SECRET=supersecret
```

Veja o exemplo em `.env.example`.

---

## 📦 Bibliotecas Utilizadas

**Principais:**
- **express**: Framework para APIs REST.
- **apollo-server-express**: Integração GraphQL com Express.
- **graphql**: Core da API GraphQL.
- **jsonwebtoken**: Geração e validação de tokens JWT.
- **swagger-ui-express**: Documentação interativa Swagger.
- **dotenv**: Carrega variáveis de ambiente do arquivo `.env`.

**Testes:**
- **mocha**: Framework de testes.
- **chai**: Biblioteca de asserções.
- **chai-exclude**: Permite comparar objetos ignorando propriedades.
- **supertest**: Testes de endpoints HTTP.
- **sinon**: Mocks e spies para testes.
- **mochawesome**: Relatórios de testes em HTML/JSON.

**Dev:**
- **nodemon**: Reinicia o servidor automaticamente em desenvolvimento.

---

## 🏗️ Padrões de Projeto & Frameworks


- **MVC (Model-View-Controller)**: Separação entre dados (`model/`), regras de negócio (`service/`), e rotas/controllers (`controller/`).
- **Middleware**: Autenticação JWT implementada como middleware para REST e GraphQL.
- **GraphQL**: Estrutura modular com `typeDefs` e `resolvers`.
- **Modularização**: Código organizado em módulos para facilitar manutenção e reuso.
- **Factory**: Funções factory para geração dinâmica de dados e tokens em testes.
- **Fixture**: Uso de fixtures para dados estáticos e cenários de teste previsíveis.
- **Testes Automatizados**: Estrutura de testes REST e GraphQL, uso de mocks, factories e fixtures.
- **Documentação Swagger**: Disponível em `/api-docs` para facilitar integração e testes.

---

## ✨ Exemplos de Uso

### Registro de Usuário
```json
POST /register
{
  "username": "aline",
  "password": "123456",
  "favorecido": ["rodrigo"]
}
```

### Login
```json
POST /login
{
  "username": "aline",
  "password": "123456"
}
```

### Transferência (REST)
```json
POST /transfer
{
  "from": "aline",
  "to": "rodrigo",
  "amount": 100.00
}
```

### Transferência (GraphQL)
```graphql
mutation {
  transfer(from: "aline", to: "rodrigo", amount: 100.00) {
    from
    to
    amount
    date
  }
}
```

---

## 📝 Observações

- Sempre mantenha o arquivo `.env` sem aspas, ponto e vírgula ou espaços extras.
- Para rodar os testes, utilize os scripts do `package.json`.
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

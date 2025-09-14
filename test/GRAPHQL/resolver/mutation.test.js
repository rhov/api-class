const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../../graphql/app');

describe('Mutation', () => {
    describe('Users', () => {
        it('Registra usuário', async () => {
            const resposta = await request(app)
                .post('/graphql')
                .send({
                    query: `mutation RegisterUser($username: String!, $password: String!) {
                  registerUser(username: $username, password: $password) {
                    username
                    password
                  }
                }`,
                    variables: {
                        username: "ze",
                        password: "123"
                    }
                });
            console.log(resposta.body);
            console.log(resposta.status);
        });

                it('Obter usuários', async () => {
            const resposta = await request(app)
                .post('/graphql')
                .send({
                    query:
                        `query Users{
                            users{
                                username
                            }
                
                        }`});

            console.log(JSON.stringify(resposta.body, null, 2)); //Quando há objetos dentro de objetos precisa do stringfy

            console.log(resposta.status);
        })



    });
});

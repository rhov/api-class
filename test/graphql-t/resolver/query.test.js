const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../../graphql/app');

describe('Query', () => {
    describe('Transferência', () => {
        it('Obter transferências', async () => {
            const resposta = await request(app)
                .post('/graphql')
                .send({
                    query:
                        `query Transfers{
                            transfers{
                                from,
                                to,
                                amount
                            }
                
                        }`});

                        
            console.log(JSON.stringify(resposta.body, null, 2)); //Quando há objetos dentro de objetos precisa do stringfy
            console.log(resposta.status);
        }
        )

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
    })
}

)
/*
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/graphql \
    --data '{"query":"query Users {\n  users {\n    username\n  }\n}"}'
    */
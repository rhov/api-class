//Bibliotecas
const request = require('supertest'); // Iniciando o supetest
const { expect } = require('chai');
const { apiURL } = require('../../config/config');
const { getToken } = require('../factory/superToken');
let superToken;

//pré-condição
before(async () => {superToken = await getToken()});

// Testes
describe('Transfer External', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {
         
            const resposta = await request(apiURL)
                .post('/transfer')
                .set('Authorization', `Bareer ${superToken}`)
                .send({ // o send envia como se fosse o json
                    from: "aline",
                    to: "sheldon",
                    amount: 100
                });// Vou usa o supertest apontando para o app

            expect(resposta.status).to.equals(400);
            expect(resposta.body).
                to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
            // expect -> Espero a resposta

        });
    });
});
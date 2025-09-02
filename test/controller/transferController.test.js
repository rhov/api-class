//Bibliotecas
const request = require('supertest'); // Iniciando o supetest
const sinon = require('sinon'); //Iniciando o sinon
const {expect} = require('chai');

// Aplicação
const app = require('../../app'); 

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({ // o send envia como se fosse o json
                    from: "alberto",
                    to: "aline",
                    amount: 100                    
                    });// Vou usa o supertest apontando para o app

            expect(resposta.status).to.equals(400);
            expect(resposta.body).
                to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
            // expect -> Espero a resposta

        });

        it('Usando Mocks: Quando informo remetente e destinatário inexistente recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({ // o send envia como se fosse o json
                    from: "alberto",
                    to: "aline",
                    amount: 100                    
                    });// Vou usa o supertest apontando para o app

            expect(resposta.status).to.equals(400);
            expect(resposta.body).
                to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
            // expect -> Espero a resposta

        });
    });
    describe('GET /transfers', () => {
        it('Quando busco um GET retorno 200', async () =>{
            const resposta = await request(app)
                .get('/transfers');
            expect(resposta.status).to.equals(200);
        });
    });
});
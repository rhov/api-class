//Bibliotecas
const request = require('supertest'); // Iniciando o supetest
const {expect} = require('chai');
const {apiUrl} = require('../../config/config')

// Testes
describe('Transfer External', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {
            const resposta = await request(apiUrl)
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
});
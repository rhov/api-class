//Bibliotecas
const request = require('supertest'); // Iniciando o supetest
const sinon = require('sinon'); //Iniciando o sinon
const {expect} = require('chai');

// Aplicação
const app = require('../../app'); 

// Mock
const transferService = require('../../service/transferService');

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
            // Mocar apenas a função transfer que quero mockar do Service
            const transferServiceMock = sinon.stub(transferService,'transfer'); //Interceptamos
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado')); //Dizemos a mensagem de erro

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

            //Reset o Mock 
            sinon.restore();

        });

         it.only('Usando Mocks: Quando informo dados válidos eu recebo 201 CREATED', async () => {
            // Mocar apenas a função transfer que quero mockar do Service
            const transferServiceMock = sinon.stub(transferService,'transfer'); //Interceptamos
            transferServiceMock.returns({
                    from: "alberto",
                    to: "aline",
                    amount: 100,
                    data:'transferência realizada com sucesso',
                    date: new Date() }); //Dizemos a mensagem de erro

            const resposta = await request(app)
                .post('/transfer')
                .send({ // o send envia como se fosse o json
                    from: "alberto",
                    to: "aline",
                    amount: 100                    
                    });// Vou usa o supertest apontando para o app

            /* expect -> Espero a resposta
            expect(resposta.status).to.equals(201);
            expect(resposta.body).to.have.property('from', 'alberto');
            expect(resposta.body).to.have.property('data','transferência realizada com sucesso');
            */
            
            //Validação com Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoDadosValidosEuRecebo201CREATED.json');
            delete respostaEsperada.date;
            delete resposta.body.date;

            expect(resposta.body).to.deep.equal(respostaEsperada);

            //Reset o Mock 
            sinon.restore();

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
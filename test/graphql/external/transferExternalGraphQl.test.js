const request = require('supertest');
const chai = require('chai');
const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);
const { expect } = chai;
const { apiURLGraphql } = require('../../config/config');
const { getToken } = require('../factory/requisições/login/loginUser')
const objetoCreate = require('../fixture/requisições/transfers/createTransfer.json');

describe('Transfers External GraphQL', () => {
    beforeEach(async () => {
        token = await getToken();
            createTransferMutation = JSON.parse(JSON.stringify(objetoCreate));

    })

    it.only('Realizar Transferência válida', async () => {
        const respostaEsperada = require('../fixture/respostas/realizarTransfereciaValida.json');
        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransferMutation);

        expect(respostaTransf.body.data.transfer)
            .excluding('date')
            .to.deep.equal(respostaEsperada.body.data.transfer);
    })

    it('Transferência com saldo insuficiente', async () => {
        createTransferMutation.variables.amount = 9999999;
        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransferMutation);

        expect(respostaTransf.body.errors[0].message).to.equals("Saldo insuficiente para realizar a transferência.");
    })


    it('Transferência para não favorefcido acima de 5k', async () => {
        createTransferMutation.variables.amount = 5000.01;
        createTransferMutation.variables.to = "sheldon";
        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransferMutation);
         expect(respostaTransf.body.errors[0].message).to.equals("Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos do remetente.");
    })

});





const request = require('supertest');
const { expect } = require('chai');
const { apiURLGraphql } = require('../../config/config');
const { getToken } = require('../factory/requisições/login/loginUser')
const objetoCreate = require('../fixture/requisições/transfers/createTransfer.json');

describe('Transfers External GraphQL', () => {
    beforeEach(async () => {
        token = await getToken();
            createTransferMutation = JSON.parse(JSON.stringify(objetoCreate));

    })

    it('Realizar Transferência com token obtido dinâmicamente', async () => {
        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransferMutation);
        expect(respostaTransf.status).to.equals(200);
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





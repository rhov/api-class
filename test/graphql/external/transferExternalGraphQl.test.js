const request = require('supertest');

const {expect,use} = require('chai');
const chaiExclude = require('chai-exclude').default;
use(chaiExclude);


require('dotenv').config();
const { getToken } = require('../factory/requisições/login/loginUser')
const objetoCreate = require('../fixture/requisições/transfers/createTransfer.json');


describe('Transfers External GraphQL', () => {
    beforeEach(async () => {
        token = await getToken();
            createTransferMutation = JSON.parse(JSON.stringify(objetoCreate));

    })

    it('Realizar Transferência válida', async () => {
        const respostaEsperada = require('../fixture/respostas/realizarTransfereciaValida.json');
        const respostaTransf = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransferMutation);

        expect(respostaTransf.body.data.transfer)
            .excluding("date")
            .to.deep.equal(respostaEsperada.data.transfer);
    })

    const testTransfErrors = require('../fixture/requisições/transfers/createTransferWithErrors.json');
    testTransfErrors.forEach(teste => {
    it(`Regra de negócio: ${teste.testCase}`, async () => {
        const respostaTransf = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(teste.createTransfer);

        expect(respostaTransf.body.errors[0].message).to.equals(teste.messageExpect);
    })
})
/*
    it('Transferência para não favorefcido acima de 5k', async () => {
        createTransferMutation.variables.amount = 5000.01;
        createTransferMutation.variables.to = "sheldon";
        const respostaTransf = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransferMutation);
         expect(respostaTransf.body.errors[0].message).
         to.equals("Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos do remetente.");
    })
*/
});





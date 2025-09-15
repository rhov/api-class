const request = require('supertest');

const {expect,use} = require('chai');
const chaiExclude = require('chai-exclude').default;
use(chaiExclude);


require('dotenv').config();
const { getToken } = require('../factory/requisições/login/loginUser')


describe('Transfers External GraphQL', () => {
    beforeEach(async () => {
        token = await getToken();
        createTransferMutation = require('../fixture/requisições/transfers/createTransfer.json');

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

});





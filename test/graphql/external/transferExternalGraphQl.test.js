const request = require('supertest');
const { expect } = require('chai');
const { apiURLGraphql, userLogin } = require('../../config/config');
const { getToken } = require('../factory/requisições/login/loginUser')
let token, mutation = require('../fixture/requisições/transfers/body.json');

beforeEach(async () => {
    token = await getToken();
})


describe('Transfers External GraphQL', () => {
    it('Realizar Transferência com token obtido dinâmicamente', async () => {


        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(mutation);
        expect(respostaTransf.status).to.equals(200);
    })

    it('Transferência com saldo insuficiente', async () => {


        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                        mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                            transfer(from: $from, to: $to, amount: $amount) {
                                from
                                to
                                amount
                                date
                            }
                        }
                `,
                variables: {
                    from: "rodrigo",
                    to: "aline",
                    amount: 9999999
                }

            })

        expect(respostaTransf.body.errors[0].message).to.equals("Saldo insuficiente para realizar a transferência.");
    })


    it('Transferência para não favorefcido acima de 5k', async () => {

        const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                        mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                            transfer(from: $from, to: $to, amount: $amount) {
                                from
                                to
                                amount
                                date
                            }
                        }
                `,
                variables: {
                    from: "rodrigo",
                    to: "sheldon",
                    amount: 5000.01
                }

            })

        expect(respostaTransf.body.errors[0].message).to.equals("Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos do remetente.");
    })

});





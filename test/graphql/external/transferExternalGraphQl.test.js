const request = require('supertest');
const { expect } = require('chai');
const { apiURLGraphql,userLogin } = require('../../config/config');
let token;

beforeEach (async() =>{
    const resposta = await request(apiURLGraphql)
            .post('')
            .send({
                query: `
                    mutation Login($username: String!, $password: String!) {
                        login(username: $username, password: $password) {
                            token
                        }
                    }
                `,
                variables: {
                    username: userLogin[1].username,
                    password: userLogin[1].password
                }

            })
        token = resposta.body.data.login.token;
}) 

describe('Transfers External GraphQL', () => {
    it('Realizar Transferência com token obtido dinâmicamente', async () => {

     
    const respostaTransf = await request(apiURLGraphql)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation Mutation($from: String!, $to: String!, $amount: Float!) {
                        transfer(from: $from, to: $to, amount: $amount) {
                            from
                            to
                            amount
                            
                        }
                    }
                `,
                variables: {
                    from: "rodrigo",
                    to: "aline",
                    amount: 1000
                }

            })
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





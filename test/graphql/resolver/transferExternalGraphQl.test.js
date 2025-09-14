const request = require('supertest');
const { expect } = require('chai');
// const app = require('../../../graphql/app');
const apiURL = "http://localhost:4000/graphql";
/*
const {getTokenGraphQL} = require ('../../rest/factory/superToken');
let superToken;

before(async () => { superToken = await getTokenGraphQL("apioff") 
    console.log(superToken);
});
*/

describe('Transfers External GraphQL', () => {
    it.only('Realizar Transferência com token obtido dinâmicamente', async () => {
        const resposta = await request(apiURL)
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
                    username: 'rodrigo',
                    password: '123456'
                }

            })
     
        const respostaTransf = await request(apiURL)
            .post('')
            .set('Authorization', `Bearer ${resposta.body.data.login.token}`)
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
        console.log(respostaTransf.body);
    })


})


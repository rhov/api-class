const request = require('supertest');
const { expect } = require('chai');
// const app = require('../../../graphql/app');
const apiURL = "http://localhost:4000/graphql";
const {getTokenGraphQL} = require ('../../rest/factory/superToken');

before(async () => { superToken = await getToken("apioff") });

describe('Transfers External GraphQL', () => {
    it('Obter Token', async () => {
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
        //console.log(resposta.body.data.login.token);
    })

    console.log.

})


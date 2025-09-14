const request = require('supertest');
const { userLogin } = require('../../../../config/config');
require('dotenv').config();

async function getToken() {
    const resposta = await request(process.env.BASE_URL_GRAPHQL)
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
    return resposta.body.data.login.token;
}

module.exports = { getToken };
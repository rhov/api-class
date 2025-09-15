const request = require('supertest');
const userLogin = require('../../../../helpers/login/users.json');
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
                username: userLogin.username,
                password: userLogin.password
            }

        })
    return resposta.body.data.login.token;
}

module.exports = { getToken };
const request = require('supertest');
const { apiURLGraphql,userLogin } = require('../../../../config/config');

async function getToken() {
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
        return resposta.body.data.login.token;
}

module.exports = { getToken };
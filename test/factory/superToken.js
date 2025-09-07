//Bibliotecas
const request = require('supertest');
const { apiURL } = require('../config/config')


async function getToken(username = "rodrigo", password = "123456") {
    const login = await request(apiURL)
        .post('/login')
        .send({
            username: username,
            password: password
        });

    if (login.status != 200) {
        throw new Error(`Login falhou: ${login.status} - ${login.body.error}`);
    }
    console.log(login.body.token);
    return login.body.token;
}

module.exports = {getToken};
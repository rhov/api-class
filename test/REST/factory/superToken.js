//Bibliotecas
const request = require('supertest');
const { apiURL, userLogin } = require('../config/config');
const app = require('../../../app');


async function getToken(apiStart) {

    let api;
    const apiStartLower = typeof apiStart === 'string' ? apiStart.toLowerCase() : apiStart;
    if (apiStartLower === undefined || apiStartLower === 'apion') {
        api = apiURL;
    } else if (apiStartLower === 'apioff') {
        api = app;
    } else {
        throw new Error('API não encontrada: use "apion" ou "apiOff"');
    }



    let login;
    try {
        login = await request(api)
            .post('/login')
            .send({ username: userLogin.username, password: userLogin.password });
    } catch (err) {
        throw new Error(`Não foi possível conectar ao servidor. Verifique se a API ${apiURL} está online. Params: apiStart:${apiStart}`);
    }

    if (login.status != 200) {
        throw new Error(`Login falhou: ${login.status} - ${login.body.error}`);
    }

    return login.body.token;
}

module.exports = { getToken };
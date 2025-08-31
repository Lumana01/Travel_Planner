const axios = require('axios');
import { expect } from '@playwright/test';

let apiUrl

async function authenticateUser(userName,password, {request}) {
    const apiUrl = await getApiBaseUrl
    const headers = {
        'Content-Type': 'application/json',
    };
    const requestBody = {
        email : userName,
        password: password,
    };
    const response = await request.post('${apiUrl}/users/login',{
        data: requestBody,
        headers,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}

async function getApiBaseUrl() {
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
        apiUrl = 'https://thinking-tester-contact-list.herokuapp.com';
    }
    return apiUrl;
}

async function createEntity(userData, accessToken, module, {request}) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/jason',
        'authentication': "Bearer" + accessToken,
    };
    const response = await request.post(apiUrl + module, {
        headers,
        data: JSON.stringify(userData),
    });

    const responseBody = await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201);
    if (responseBody && responseBody.id){
        return responseBody.id;
    }else{
        return null;
    }
    async function valideEntity(accessToken, module, status, { request}) {
        const apiUrl = await getApiBaseUrl();
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': "Bearer" + accessToken,
        };
        const response = await request.get(apiUrl + module, {
            headers,
        });
        const statusCode = response.status();
        expect(statusCode).toBe(parseIn(status));
        const responseBody = await response.json();
        if (responseBody = await responseBody(0),_id){
            return responseBody[0]._id;
        } else {
            return null;
        }
    }
}
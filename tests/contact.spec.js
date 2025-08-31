import { test } from '@playwright/test';
import { LoginPage } from '../pageobject/login.po';
import { ContactPage } from '../pageobject/contact.po';
import { access } from 'fs';
const testData = require('../fixtures/loginFixture.json');
const contactTestData = require('../fixtures/contactFixtures.json');
const{authenticateUser,createEntity} = require

test.beforeEach(async({page}) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser, testData.validUser.password);
    await login.verifyValidLogin();
})
test.describe('Contact testcases', () =>{
    test('Contact Add test', async ({ page, request}) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName);
        await contact.viewContact();
        await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName);
        accessToken = await authenticationUser(testData.validUser,userName, testData.validUser.password);
        const id = await getEntity(accessToken, '/contacts', '200', {request});
        await deleteEntity(accessToken,'/contacts/$(id)',{request});
        await validateEntity(accessToken,'/contacts/$(id)','484', {request});
    })
    test.only('Contact Edit test', async ({ page, request}) => {
        const Data = {
            "firstName": "Lumana",
            "lastName": "Tuladhar",
            "birthdate": "2004/04/20",
            "email": "lumanatul@gmail.com",
            "phone": "9861059434",
            "street1": "Wotu",
            "street2": "Indrachowk",
            "city": "Kathmandu",
            "stateProvince": "3",
            "postalCode": "12345",
            "country": "Nepal",
        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser,userName, testData.validUser.password,{request})
        await createEntity(Data, accessToken, '/contacts', {request});
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contact.lastName,contact);
    });
    test.only('Contact Delete test', async ({ page, request}) => {
        const Data = {
            "firstName": "Lumana",
            "lastName": "Tuladhar",
            "birthdate": "2004/04/20",
            "email": "lumanatul@gmail.com",
            "phone": "9861059434",
            "street1": "Wotu",
            "street2": "Indrachowk",
            "city": "Kathmandu",
            "stateProvince": "3",
            "postalCode": "12345",
            "country": "Nepal",
        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser,userName, testData.validUser.password,{request})
        await createEntity(Data, accessToken, '/contacts', {request});
        page.reload();
        await contact.viewContact();
        const id = await getEntity(accessToken,'/contact', '200', {request});
        await contact.contactDelete;
        await validEntity(accessToken,'/contact/$(id)', '484', {request});
    })
})

test.afterEach(async ({page})=> {
    await page.close();
})
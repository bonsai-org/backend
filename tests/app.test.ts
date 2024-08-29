import Client from './client';
import { Users } from './data';
import { MongoClient } from 'mongodb'

let testClient = new Client()

afterAll(async () => {
    console.log('boom')
    let mongoClient = new MongoClient('mongodb://localhost:27017')
    await mongoClient.connect()
    let db = mongoClient.db('bonsai-dev-database')
    await db.collection('users').drop()
    await mongoClient.close()
})


describe('Tests that a valid user is able to signup with the Bonsai Org', () => {
    test('Successfully signs up a user', async () => {
        let response = await testClient.signup(Users.GOOD_USER)
        expect(response.status).toBe(200)
    })
});

describe('Tests that a user with invalid credentials is successfully rejected from signing up with Bonsai Org', () => {
    test('Rejects a user from signing up with an invalid email', async () => {
        let response = await testClient.signup(Users.INVALID_EMAIL_USER)
        expect(response.status).toBe(400)
        expect(response.data).toBeDefined()
    })
})

/* 
Tests passing when there are no assertions is the default 
behavior of Jest. If you want to avoid Jest giving a false 
positive, by running tests without assertions, you can either 
use the expect.hasAssertions() or expect.assertions(number) methods. 
These two methods will ensure there's at least a certain number of 
assertions within the test function before assuming the test passes. 
They are designed to be called manually in every test, which is quite 
inconvenient.
*/

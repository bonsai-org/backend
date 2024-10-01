import Client from './client';
import UserRequests from './data';
import {
  deleteCollections,
  closeMongoConnection,
  connectMongoose,
  disconnectMongoose,
} from './test-env-managers';
import { HttpStatusCode, FormFields, JoiErrorTypes } from '../src/types';
import { TEST_createUser } from './test-functions';
import { User } from '../src/data/User';

const testClient = new Client();

beforeAll(async () => {
  await connectMongoose();
});

afterAll(async () => {
  await disconnectMongoose();
  await deleteCollections(['users']);
  await closeMongoConnection();
});

describe('Tests that an existing user is able to successfully login to bonsai org', () => {
  let user: User;
  beforeAll(async () => {
    await deleteCollections(['users']);
    user = await TEST_createUser(UserRequests.GOOD_USER);
  });
  test('Returns a status of 200 after a successful login', async () => {
    let response = await testClient.login(UserRequests.GOOD_USER);
    expect(response.status).toBe(HttpStatusCode.Ok);
  });
  test('Receives both an access token and refresh token via cookies', async () => {
    let response = await testClient.login(UserRequests.GOOD_USER);
    let tokens = response.headers['set-cookie'];
    if (tokens === undefined || tokens.length !== 2) {
      fail(
        'Client did not receive one or both tokens after successfully signing up',
      );
    }
    let [accessToken, refreshToken] = tokens;
    expect(accessToken.split('=')[0]).toBe('id');
    expect(refreshToken.split('=')[0]).toBe('rid');
    expect(tokens).toBeDefined();
    expect(tokens?.length).toBe(2);
  });
  test('Receives username and empty profilePhoto string as json response', async () => {
    let response = await testClient.login(UserRequests.GOOD_USER)
    let data: { username?: string, profilePhoto?: string } | null = response.data
    expect(data).not.toBeNull()
    expect(data?.profilePhoto).toBe('')
    expect(data?.username).toBe(UserRequests.GOOD_USER.username)
  })
});

describe('Tests that invalid requests made to login are properly rejected', () => {
  let user: User;
  beforeAll(async () => {
    await deleteCollections(['users']);
    user = await TEST_createUser(UserRequests.GOOD_USER);
  });
  test('An exisitng user is rejected from logging in with an incorrect password', async () => {
    let response = await testClient.login(
      UserRequests.GOOD_USER_INCORRECT_PASSWORD_USER,
    );
    expect(response.status).toBe(HttpStatusCode.Unauthorized);
  });
  test('A non existent user is not allowed to login', async () => {
    let response = await testClient.login(
      UserRequests.SAME_EMAIL_DIFF_USERNAME_USER,
    );
    expect(response.status).toBe(HttpStatusCode.Unauthorized);
  });
});

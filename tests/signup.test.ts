import Client from './client';
import UserRequests from './data';
import {
  deleteCollections,
  closeMongoConnection,
  connectMongoose,
  disconnectMongoose,
} from './test-env-managers';
import { HttpStatusCode, FormFields, JoiErrorTypes } from '../src/types';
import { TEST_createUser } from './test-functions'

const testClient = new Client();

beforeAll(async () => {
  await connectMongoose()
})

afterAll(async () => {
  await disconnectMongoose()
  await deleteCollections(['users']);
  await closeMongoConnection();
});

describe('Tests a successful signup with Bonsai-Org', () => {
  afterEach(async () => {
    await deleteCollections(['users']);
  });
  test('Receives a status code of 200 after successful signup', async () => {
    let response = await testClient.signup(UserRequests.GOOD_USER);
    expect(response.status).toBe(HttpStatusCode.Ok);
  });
  test('Receives both an access token and refresh token via cookies', async () => {
    let response = await testClient.signup(UserRequests.GOOD_USER)
    let tokens = response.headers['set-cookie']
    if (tokens === undefined || tokens.length !== 2) {
      fail('Client did not receive one or both tokens after successfully signing up')
    }
    let [accessToken, refreshToken] = tokens
    expect(accessToken.split('=')[0]).toBe('id')
    expect(refreshToken.split('=')[0]).toBe('rid')
    expect(tokens).toBeDefined()
    expect(tokens?.length).toBe(2)
  })
});

describe('Tests that the server properly rejects an existing user from signing up', () => {
  beforeAll(async () => {
    await deleteCollections(['users'])
    await TEST_createUser(UserRequests.GOOD_USER)
  })
  test('Rejects a user with existing username from signing up', async () => {
    let response = await testClient.signup(UserRequests.SAME_USERNAME_DIFF_EMAIL_USER)
    expect(response.status).toBe(HttpStatusCode.Conflict)
  })
  test('Rejects a user with existing email from signing up', async () => {
    let response = await testClient.signup(UserRequests.SAME_EMAIL_DIFF_USERNAME_USER)
    expect(response.status).toBe(HttpStatusCode.Conflict)
  })
  test('Rejects a user with existing username and email from signing up', async () => {
    let response = await testClient.signup(UserRequests.GOOD_USER)
    expect(response.status).toBe(HttpStatusCode.Conflict)
  })
})

describe('Tests that the server properly rejects illegal user input', () => {
  describe('Test that the server properly handles requests where one or more inputs are not supplied', () => {
    test('Identifies that username field is missing from request', async () => {
      let response = await testClient.signup(UserRequests.MISSING_USERNAME_FIELD);
      expect(response.status).toBe(HttpStatusCode.BadRequest);
      expect(response.data?.errors?.missingFields?.length).toBe(1);
      expect(response.data?.errors?.missingFields.includes(FormFields.USERNAME)).toBe(
        true,
      );
    });
    test('Identifies that password field is missing from request', async () => {
      let response = await testClient.signup(UserRequests.MISSING_PASSWORD_FIELD);
      expect(response.status).toBe(HttpStatusCode.BadRequest);
      expect(response.data?.errors?.missingFields?.length).toBe(1);
      expect(response.data?.errors?.missingFields.includes(FormFields.PASSWORD)).toBe(
        true,
      );
    });
    test('Identifies that confirmPassword field is missing from request', async () => {
      let response = await testClient.signup(
        UserRequests.MISSING_CONFIRM_PASSWORD_FIELD,
      );
      expect(response.status).toBe(HttpStatusCode.BadRequest);
      expect(response.data?.errors?.missingFields?.length).toBe(1);
      expect(
        response.data?.errors?.missingFields.includes(FormFields.CONFIRM_PASSWORD),
      ).toBe(true);
    });
    test('Identifies that email field is missing from request', async () => {
      let response = await testClient.signup(UserRequests.MISSING_EMAIL_FIELD);
      expect(response.status).toBe(HttpStatusCode.BadRequest);
      expect(response.data?.errors?.missingFields?.length).toBe(1);
      expect(response.data?.errors?.missingFields.includes(FormFields.EMAIL)).toBe(true);
    });
    test('Identifies that username and password field are missing from request', async () => {
      let response = await testClient.signup(
        UserRequests.MISSING_USERNAME_AND_PASSWORD_FIELD,
      );
      expect(response.status).toBe(HttpStatusCode.BadRequest);
      expect(response.data?.errors?.missingFields?.length).toBe(2);
      expect(response.data?.errors?.missingFields.includes(FormFields.USERNAME)).toBe(
        true,
      );
      expect(response.data?.errors?.missingFields.includes(FormFields.PASSWORD)).toBe(
        true,
      );
    });
  })

  describe('Test that the server properly rejects requests that fail input validation requirements', () => {
    test('Rejects a request to signup with a username that is shorter than 8 characters', async () => {
      let response = await testClient.signup(UserRequests.USERNAME_TOO_SHORT_USER)
      expect(response.status).toBe(HttpStatusCode.BadRequest)
    })
    test('Rejects a request to sign up with a username that is longer than 20 characters', async () => {
      let response = await testClient.signup(UserRequests.USERNAME_TOO_LONG_USER)
      expect(response.status).toBe(HttpStatusCode.BadRequest)
    })
    test('Rejects a request to signup with a non alpha numeric username', async () => {
      let response = await testClient.signup(UserRequests.NON_ALPHANUMERIC_USERNAME_USER)
      expect(response.status).toBe(HttpStatusCode.BadRequest)
    })
    test('Properly rejects a request to signup with a password that is shorter than 8 characters', async () => {
      let response = await testClient.signup(UserRequests.PASSWORD_TOO_SHORT_USER)
      expect(response.status).toBe(HttpStatusCode.BadRequest)
    })
    test('Properly rejects a request to signup with a password that is longer than 20 characters', async () => {
      let response = await testClient.signup(UserRequests.PASSWORD_TOO_LONG_USER)
      expect(response.status).toBe(HttpStatusCode.BadRequest)
    })
    test('Properly rejects a request to signup with an invalid email address', async () => {
      let response = await testClient.signup(UserRequests.INVALID_EMAIL_USER)
      expect(response.status).toBe(HttpStatusCode.BadRequest)
    })
  })

});

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

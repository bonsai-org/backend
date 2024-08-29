import axios, { AxiosInstance } from 'axios';

export default class Client {
  declare clientInstance: AxiosInstance;

  constructor() {
    this.clientInstance = axios.create({
      baseURL: 'http://localhost:3000/api/user',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Only fail on internal server error
      },
    });
  }

  public async signup({
    username,
    password,
    confirmPassword,
    email,
  }: {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
  }) {
    let response = await this.clientInstance({
      url: '/signup',
      method: 'post',
      data: {
        username,
        password,
        confirmPassword,
        email,
      },
    });
    return response;
  }
}

// async function main() {
//     let client = new Client()
//     await client.signup({
//         username: 'henrymjacobss',
//         password: 'password',
//         confirmPassword: 'password',
//         email: 'henrymjasobs@gmail.com'
//     })
// }

// main()

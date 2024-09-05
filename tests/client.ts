import axios, { AxiosInstance } from 'axios';
import { TestUser } from './data';

/*
 * this axios client will not throw an error depending on the status code it
 * gets back from the server.
 *
 * it is assumed that the tester will check and properly handle those status codes
 */

export default class Client {
  declare clientInstance: AxiosInstance;

  constructor() {
    this.clientInstance = axios.create({
      baseURL: 'http://localhost:3000/api/auth',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status <= 500;
      },
    });
  }

  public async login({ username, password }: TestUser) {
    let response = await this.clientInstance({
      url: '/login',
      method: 'post',
      data: {
        username,
        password,
      },
    });
    return response;
  }

  public async signup({
    username,
    password,
    confirmPassword,
    email,
  }: TestUser) {
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

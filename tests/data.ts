import { IUser } from "../src/types/schemas";

type TestUser = {
  username?: string,
  password?: string,
  confirmPassword?: string,
  email?: string,
}

type UserFields = 'username' | 'password' | 'confirmPassword' | 'email'

export default class UserRequests {

  static removeSpecificField(user: TestUser, fieldName: UserFields): TestUser {
    let copy = { ...user }
    delete copy[fieldName]
    return copy
  }

  // A user that is successfully able to signup with bonsai org
  static GOOD_USER: TestUser = {
    username: 'MarcosHettinger',
    password: 'TWVpeHfkH7GXXuC',
    confirmPassword: 'TWVpeHfkH7GXXuC',
    email: 'Lonnie50@yahoo.com',
  }

  // A user with an invalid email
  static INVALID_EMAIL_USER: TestUser = {
    ...this.GOOD_USER,
    email: 'Lonnie50@yahoo',
  }

  // A user with the same username as good user but different email 
  static SAME_USERNAME_DIFF_EMAIL_USER: TestUser = {
    ...this.GOOD_USER,
    email: 'German_Wisozk@yahoo.com',
  }

  // A user with the same email as good user but different username 
  static SAME_EMAIL_DIFF_USERNAME_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'NealStiedemann',
  }

  // A user who only has a 6 character username instead of 8
  static USERNAME_TOO_SHORT_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'Marcos',
  }

  // A user whose username is 21 characters (max is 20)
  static USERNAME_TOO_LONG_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'GilesToyFisherAmbrose',
  }

  // A user whose password is 24 characters (max is 20)
  static PASSWORD_TOO_LONG_USER = {
    ...this.GOOD_USER,
    password: 'passwordpasswordpassword',
    confirmPassword: 'passwordpasswordpassword'
  }

  // A user who has a different password and confirm password field 
  static DIFF_PASSWORD_CONFIRM_PASSWORD_USER: TestUser = {
    ...this.GOOD_USER,
    password: 'password',
    confirmPassword: 'differentPassword'
  }

  static MISSING_USERNAME_FIELD = this.removeSpecificField(this.GOOD_USER, 'username')
  static MISSING_PASSWORD_FIELD = this.removeSpecificField(this.GOOD_USER, 'password')
  static MISSING_CONFIRM_PASSWORD_FIELD = this.removeSpecificField(this.GOOD_USER, 'confirmPassword')
  static MISSING_EMAIL_FIELD = this.removeSpecificField(this.GOOD_USER, 'email')
}
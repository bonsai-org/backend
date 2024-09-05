import { IUser } from '../src/types/schemas';

export type TestUser = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
};

type UserFields = 'username' | 'password' | 'confirmPassword' | 'email';

export default class UserRequests {
  static removeSpecificFields(
    user: TestUser,
    fieldNames: UserFields[],
  ): TestUser {
    let copy = { ...user };
    for (let field of fieldNames) {
      delete copy[field];
    }
    return copy;
  }

  // A user that is successfully able to signup with bonsai org
  static GOOD_USER: TestUser = {
    username: 'MarcosHettinger',
    password: 'TWVpeHfkH7GXXuC',
    confirmPassword: 'TWVpeHfkH7GXXuC',
    email: 'Lonnie50@yahoo.com',
  };

  static NON_ALPHANUMERIC_USERNAME_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'NonAlphaNum!-=.',
  };

  // A user with an invalid email
  static INVALID_EMAIL_USER: TestUser = {
    ...this.GOOD_USER,
    email: 'Lonnie50@yahoo',
  };

  // A user with the same username as good user but different email
  static SAME_USERNAME_DIFF_EMAIL_USER: TestUser = {
    ...this.GOOD_USER,
    email: 'German_Wisozk@yahoo.com',
  };

  // A user with the same email as good user but different username
  static SAME_EMAIL_DIFF_USERNAME_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'NealStiedemann',
  };

  static GOOD_USER_INCORRECT_PASSWORD_USER: TestUser = {
    ...this.GOOD_USER,
    password: 'incorrect-password',
  };

  // A user who only has a 6 character username instead of 8
  static USERNAME_TOO_SHORT_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'Marcos',
  };

  // A user whose username is 21 characters (max is 20)
  static USERNAME_TOO_LONG_USER: TestUser = {
    ...this.GOOD_USER,
    username: 'GilesToyFisherAmbrose',
  };

  // A user whose password is 24 characters (max is 20)
  static PASSWORD_TOO_LONG_USER: TestUser = {
    ...this.GOOD_USER,
    password: 'passwordpasswordpassword',
    confirmPassword: 'passwordpasswordpassword',
  };

  // A user whose password is too short
  static PASSWORD_TOO_SHORT_USER: TestUser = {
    ...this.GOOD_USER,
    password: 'short',
    confirmPassword: 'short',
  };

  // A user who has a different password and confirm password field
  static DIFF_PASSWORD_CONFIRM_PASSWORD_USER: TestUser = {
    ...this.GOOD_USER,
    password: 'password',
    confirmPassword: 'differentPassword',
  };

  // A user who has at least one or more fields missing that is necessary to signup
  static MISSING_USERNAME_FIELD = this.removeSpecificFields(this.GOOD_USER, [
    'username',
  ]);
  static MISSING_PASSWORD_FIELD = this.removeSpecificFields(this.GOOD_USER, [
    'password',
  ]);
  static MISSING_CONFIRM_PASSWORD_FIELD = this.removeSpecificFields(
    this.GOOD_USER,
    ['confirmPassword'],
  );
  static MISSING_EMAIL_FIELD = this.removeSpecificFields(this.GOOD_USER, [
    'email',
  ]);
  static MISSING_USERNAME_AND_PASSWORD_FIELD = this.removeSpecificFields(
    this.GOOD_USER,
    ['username', 'password'],
  );
}

type User = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

type UserRequests = {
  GOOD_USER: User;
  INVALID_EMAIL_USER: User;
};

/*
 * A user with a valid email, password, confirm password, and username
 * fields
 */

const GOOD_USER: User = {
  username: 'MarcosHettinger',
  password: 'TWVpeHfkH7GXXuC',
  confirmPassword: 'TWVpeHfkH7GXXuC',
  email: 'Lonnie50@yahoo.com',
};

/*
 * A user with an invalid email with valid username, password, and
 * confirm password fields
 */

const INVALID_EMAIL_USER: User = {
  username: 'MarcosHettinger',
  password: 'TWVpeHfkH7GXXuC',
  confirmPassword: 'TWVpeHfkH7GXXuC',
  email: 'Lonnie50@yahoo',
};

/*
 * A user with an invalid email
 *
 */

/*
 *
 *
 */

export const Users: UserRequests = {
  GOOD_USER,
  INVALID_EMAIL_USER,
};

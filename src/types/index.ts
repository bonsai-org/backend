import { User } from "../data/User";

type NodeEnvironments = 'prod' | 'dev' | 'stage';

export type LogLevels = 'Info' | 'Warn' | 'Error' | 'Fatal';

export enum MongooseEvents {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  OPEN = 'open',
  DISCONNECTING = 'disconnecting',
  DISCONNECTED = 'disconnected',
  CLOSE = 'close',
  RECONNECTED = 'reconnected',
  ERROR = 'error',
}

export type EnvironmentVariables = {
  MONGO_DB_STRING: string;
  PORT: number;
  NODE_ENV: 'prod' | 'dev' | 'stage' | 'local';
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_SECRET: string;
};

export type NullErrorHandler = {};

// This enum is ripped from axios.
// Thanks Axios!
// https://github.com/axios/axios

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

export enum JoiErrorTypes {
  StringBase = 'string.base',
  StringAlphanum = 'string.alphanum',
  StringEmpty = 'string.empty',
  StringMin = 'string.min',
  StringMax = 'string.max',
  StringPatternBase = 'string.pattern.base',
  StringEmail = 'string.email',
  AnyRequired = 'any.required',
  AnyInvalid = 'any.invalid',
  AnyOnly = 'any.only',
  AnyEmpty = 'any.empty',
  NumberBase = 'number.base',
  NumberMin = 'number.min',
  NumberMax = 'number.max',
  NumberInteger = 'number.integer',
  NumberPositive = 'number.positive',
  NumberNegative = 'number.negative',
  NumberPrecision = 'number.precision',
  ArrayBase = 'array.base',
  ArrayMin = 'array.min',
  ArrayMax = 'array.max',
  ArrayLength = 'array.length',
  ArrayIncludes = 'array.includes',
  ArrayExcludes = 'array.excludes',
  ObjectBase = 'object.base',
  ObjectUnknown = 'object.unknown',
  ObjectMissing = 'object.missing',
  ObjectAnd = 'object.and',
  ObjectNand = 'object.nand',
  ObjectOr = 'object.or',
  ObjectXor = 'object.xor',
  ObjectWith = 'object.with',
  ObjectWithout = 'object.without',
}

export type RefreshTokenData = {
  username: string;
  refreshTokenVersion?: number;
};

export type AccessTokenData = {
  username: string;
};

export type NewlyGeneratedTokens = {
  refreshToken: string;
  accessToken: string;
};

export type AuthorizedTokenData = {
  username: string;
  user?: User;
};

export type validationErrorResponse = {
  [index: string]: string;
};

export enum FormFields {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export type UserQuery = {
  user: User | null;
  error: unknown;
};

export type SignUpRequest = {
  username: string;
  password: string;
  email: string;
  confirmPassword?: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

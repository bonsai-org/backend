type NodeEnvironments = 'prod' | 'dev' | 'stage'

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

export enum LogLevels {
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error',
  FATAL = 'Fatal'
}

export type EnvironmentVariables = {
  MONGO_DB_STRING: string;
  PORT: number;
  NODE_ENV: NodeEnvironments
};

export type NullErrorHandler = {};

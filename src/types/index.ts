type NodeEnvironments = 'prod' | 'dev' | 'stage'

export type LogLevels = 'Info' | 'Warn' | 'Error' | 'Fatal'

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
  NODE_ENV: NodeEnvironments
};

export type NullErrorHandler = {};

export interface EnvironmentVariables {
    MONGO_DB_STRING: string;
    PORT: number;
    NODE_ENV: 'dev' | 'stage' | 'prod' | 'local';
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    FRONTEND_DEV_SEVER?: string
}

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
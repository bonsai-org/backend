export interface EnvironmentVariables {
    MONGO_DB_STRING: string;
    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_PASSWORD?: string
    S3_BUCKET: string,
    PORT: number;
    NODE_ENV: 'dev' | 'stage' | 'prod' | 'local';
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    FRONTEND_DEV_SEVER?: string
    ACCESS_KEY_ID: string,
    SECRET_ACCESS_KEY: string
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
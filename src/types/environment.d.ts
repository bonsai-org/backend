declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_STRING: string;
      PORT: number;
      NODE_ENV: 'dev' | 'stage' | 'prod' | 'local';
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}

export {};

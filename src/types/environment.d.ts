declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_STRING: string;
      PORT: number;
      NODE_ENV: 'dev' | 'stage' | 'prod' | 'local';
    }
  }
}

export {};

export namespace Types {
    export type EnvironmentVariables = {
        NODE_ENV: string
        MONGO_DB_STRING: string
        REDIS_HOST: string
        REDIS_PORT: number
        REDIS_PASSWORD?: string
        S3_BUCKET: string
        ACCESS_KEY_ID: string
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
}





// namespace MyTypes {
//     export type User = {
//       id: number;
//       name: string;
//       email: string;
//     };
  
//     export type Product = {
//       id: number;
//       name: string;
//       price: number;
//     };
  
//     export interface Order {
//       id: number;
//       user: User;
//       products: Product[];
//       total: number;
//     };
//   }
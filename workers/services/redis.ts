import { RedisOptions } from 'ioredis';

export const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

console.log(process.env.REDIS_HOST)
console.log(process.env.REDIS_PORT)

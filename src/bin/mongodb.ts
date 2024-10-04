import { MongooseEvents } from '../types';
import { SystemError } from '../errors/system-errors/system-error';
import mongoose from 'mongoose';
import shutdownApplication from './shutdown';

export default async function connectMongo(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_DB_STRING);
  } catch (error) {
    throw new SystemError({
      name: 'DATABASE_CONNECTION_FAILURE',
      message: 'Database failed to connect on startup',
      stack: error,
    });
  }
}

mongoose.connection.on(MongooseEvents.CONNECTED, () => {
  console.log('[CONNECTED] MongoDB');
});

mongoose.connection.on(MongooseEvents.DISCONNECTED, () => {
  console.log('Mongoose disconnected');
  shutdownApplication();
});

mongoose.connection.on(MongooseEvents.ERROR, (err) => {
  console.error(err);
});

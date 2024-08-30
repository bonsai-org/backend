import server from './server';
import process from 'process';
import mongoose from 'mongoose';

export default function shutdownApplication(): void {
  mongoose.connection.close();
  server.close();
  console.log('All application connections closed');
  process.exit(0);
}

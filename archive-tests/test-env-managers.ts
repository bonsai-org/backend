import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

let MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/';
let DATABASE_NAME = 'bonsai-dev-database';
let MONGOOSE_CONNECTION_STRING = MONGODB_CONNECTION_STRING + DATABASE_NAME;
let mongoClient = new MongoClient(MONGODB_CONNECTION_STRING);

export async function deleteCollections(
  collectionNames: string[],
): Promise<void> {
  await mongoClient.connect();
  let db = mongoClient.db(DATABASE_NAME);
  await Promise.all(
    collectionNames.map((collection) => {
      return db.dropCollection(collection);
    }),
  );
}

export async function closeMongoConnection() {
  await mongoClient.close();
}

export async function connectMongoose() {
  await mongoose.connect(MONGOOSE_CONNECTION_STRING);
}

export async function disconnectMongoose() {
  await mongoose.disconnect();
}

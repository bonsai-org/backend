import mongoose from "mongoose";
import { Errors } from "../errors";
import { MongooseEvents } from "./types";

export default async function connectMongo(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_DB_STRING)
    } catch (error) {
        throw new Errors.SystemError.DatabaseError({
            name: 'FAILED_TO_INITIALLY_CONNECT',
            message: 'Mongo failed to connect on startup',
            stack: error
        })
    }
}

mongoose.connection.on(MongooseEvents.CONNECTED, () => {
    console.log(`[CONNECTED] to mongo instance`)
})

mongoose.connection.on(MongooseEvents.DISCONNECTING, () => {
    console.log(`[DISCONNECTING] mongo`)
})

mongoose.connection.on(MongooseEvents.DISCONNECTED, () => {
    console.log(`[DISCONNECTED] mongo`)
})

mongoose.connection.on(MongooseEvents.ERROR, (error) => {
    throw new Errors.SystemError.DatabaseError({
        name: 'MONGO_RUNTIME_ERROR',
        message: 'Mongo emitted an error event',
        stack: error
    })
})
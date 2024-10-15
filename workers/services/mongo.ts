import mongoose from "mongoose"
import { Errors } from "../errors"
import { Types } from '../types'

export async function ConnectMongo(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_DB_STRING)
    } catch (error) {
        throw new Errors.SystemError({
            name: 'MONGO_FAILED_TO_CONNECT',
            message: 'Mongo failed to connect on startup',
            stack: error
        })
    }
}

mongoose.connection.on(Types.MongooseEvents.CONNECTED, () => {
    console.log(`[CONNECTED] to mongo instance`)
})

mongoose.connection.on(Types.MongooseEvents.DISCONNECTING, () => {
    console.log(`[DISCONNECTING] mongo`)
})

mongoose.connection.on(Types.MongooseEvents.DISCONNECTED, () => {
    console.log(`[DISCONNECTED] mongo`)
})

mongoose.connection.on(Types.MongooseEvents.ERROR, (error) => {
    throw new Errors.SystemError({
        name: 'MONGO_ERROR',
        message: 'Mongo emitted an error event',
        stack: error
    })
})
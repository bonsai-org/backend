/// <reference types="../environment.d.ts" />
/// <reference types="../express.d.ts" />
import validateEnvironment from "./environment";
import connectMongo from './mongo'
import '../app' // delete me 

async function main() {
    validateEnvironment()
    connectMongo()
}

main()
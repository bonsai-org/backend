/// <reference types="../environment.d.ts" />
/// <reference types="../express.d.ts" />
import validateEnvironment from "./environment";
import connectMongo from './mongo'
import { bindApp } from "./server";

async function main() {
    validateEnvironment()
    await connectMongo()
    bindApp()
}

main()
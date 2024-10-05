import { EnvironmentVariables } from "./types";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvironmentVariables { }
    }
}

export { };

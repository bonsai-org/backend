import { Types } from "./index.ts";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Types.EnvironmentVariables { }
    }
}

export { };

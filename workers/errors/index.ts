class BaseError<T extends string> extends Error {
    name: T;
    message: string;
    stack: any;

    constructor({
        name,
        message,
        stack,
    }: {
        name: T;
        message: string;
        stack: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.stack = stack;
    }
}

type LogLevels = 'FATAL' | 'WARN' | 'INFO' | 'DEBUG'

type EnvironmentErrorNames = 'FAILED_TO_VALIDATE_AT_STARTUP'

type SystemErrorNames = 'MONGO_FAILED_TO_CONNECT' | 'MONGO_ERROR'

type UncaughtErrorNames = 'IDK!'

type JobErrorNames = 'JOB_FAILED'


class EnvironmentError extends BaseError<EnvironmentErrorNames> {

    declare level: LogLevels

    constructor({
        name,
        message,
        stack,
    }: {
        name: EnvironmentErrorNames
        message: string;
        stack?: any;
    }) {
        super({
            name,
            message,
            stack,
        });
        this.level = 'FATAL'
    }
}

class SystemError extends BaseError<SystemErrorNames> {

    declare level: LogLevels

    constructor({
        name,
        message,
        stack,
    }: {
        name: SystemErrorNames;
        message: string;
        stack?: any;
    }) {
        super({
            name,
            message,
            stack,
        });
        this.level = 'FATAL'
    }
}

class UncaughtExeception extends BaseError<UncaughtErrorNames> {
    declare level: LogLevels


    constructor({
        name,
        message,
        stack,
    }: {
        name: UncaughtErrorNames
        message: string;
        stack?: any;
    }) {
        super({
            name,
            message,
            stack,
        });
        this.level = 'FATAL'
    }
}

class JobError extends BaseError<JobErrorNames> {
    declare level: LogLevels

    constructor({
        name,
        message,
        stack,
    }: {
        name: JobErrorNames
        message: string;
        stack?: any;
        level: LogLevels
    }) {
        super({
            name,
            message,
            stack,
        });
    }
}

export const Errors = {
    EnvironmentError,
    UncaughtExeception,
    JobError,
    SystemError
}
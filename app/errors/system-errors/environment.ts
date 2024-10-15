import { SystemError } from './system-error';

export type EnvironmentErrorNames = 'ENVIRONMENT_VARIABLE_VALIDATION_ERROR';

export class EnvironmentError extends SystemError<EnvironmentErrorNames> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: EnvironmentErrorNames;
        message: string;
        stack: any;
    }) {
        super({
            name,
            message,
            stack,
        });
    }
}


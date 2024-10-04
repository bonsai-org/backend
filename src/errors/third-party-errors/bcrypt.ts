import { ThirdPartyError } from './third-party-error';

type ErrorName = 'HASHING_ERROR';

export class BcryptError extends ThirdPartyError<ErrorName> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: ErrorName;
        message: string;
        stack?: any;
    }) {
        super({
            name,
            message,
            stack,
        });
    }
}

import { ThirdPartyError } from './third-party-error';

export type BcryptErrorNames = 'HASHING_ERROR';

export class BcryptError extends ThirdPartyError<BcryptErrorNames> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: BcryptErrorNames;
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

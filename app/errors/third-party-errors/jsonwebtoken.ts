import { ThirdPartyError } from './third-party-error';

export type JWTErrorNames = 'SIGNING_ERROR' | 'VERIFY_ERROR';

export class JWTError extends ThirdPartyError<JWTErrorNames> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: JWTErrorNames;
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

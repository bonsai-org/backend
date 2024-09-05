/// <reference types="./types/express.d.ts" />
/// <reference types="./types/environment.d.ts" />
import Express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user';
import router from './routes/bonsai';
import { MongoError } from './errors/mongo-error';
import { InternalApiError } from './errors/internalApiError';
import { HttpStatusCode } from './types';
import { sendAuthTokens } from './middleware/jwts';
import { AuthError } from './errors/authError';

const app = Express();

app.use(cookieParser());

app.use(Express.json());
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
  app.use(Express.urlencoded({ extended: true }));
}

app.use('/api/user', userRouter);
app.use('/api/bonsai', router);

app.get('*', (req, res) => {
  return res.sendStatus(HttpStatusCode.NotFound);
});

// Needs some kind of persistant logging!
// As well as some standardized way of dealing with errors :-)

app.use(
  (
    err: unknown,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
  ) => {
    if (err instanceof MongoError || err instanceof InternalApiError) {
      console.log(err.level);
      console.log(err.message);
      console.log(err.name);
      err.stack ? console.log(err.level) : null;
    } else if (err instanceof AuthError) {
      return res.sendStatus(HttpStatusCode.Unauthorized);
    } else {
      console.log(err);
    }
    return res.sendStatus(HttpStatusCode.InternalServerError);
  },
);

export default app;

/// <reference types="./types/express.d.ts" />
/// <reference types="./types/environment.d.ts" />
import Express from 'express';
import morgan from 'morgan';
import userRouter from './routes/user';
import router from './routes/bonsai';

const app = Express();

app.use(Express.json());
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
  app.use(Express.urlencoded({ extended: true }));
}

app.use('/api/user', userRouter);
app.use('/api/bonsai', router);

app.get('*', (req, res) => {
  res.json({
    message: 'Catchall: No endpoint exists for this path.',
    statusCode: 404,
  });
});

export default app;

import EnvironmentVariables from './bin/environment-variables';
import Express from 'express';
import morgan from 'morgan';
import userRouter from './routes/user';
import router from './routes/bonsai';

const app = Express();

app.use(Express.json());
if (EnvironmentVariables.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
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

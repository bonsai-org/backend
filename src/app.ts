import EnvironmentVariables from './bin/environment-variables'
import Express from 'express';
import morgan from 'morgan';
const app = Express();

if (EnvironmentVariables.NODE_ENV === 'dev') {
  app.use(morgan('dev'))
}

app.get('*', (req, res) => {
  res.send('You have arrived at the node server');
});

export default app;

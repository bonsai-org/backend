import Express from 'express';
const app = Express();
const PORT = process.env.PORT || 3000;

app.get('*', (req, res) => {
  res.send('You have arrived at the node server');
});

export default app
import express, { Application, Router } from 'express';
import router from './app/router';

const app: Application = express();

// middleware
app.use(express.json());

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.send('Express Postgres Server is Running');
});

export default app;

import express, { Application } from 'express';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// middleware
app.use(express.json());

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.send('Express Postgres Server is Running');
});

//global error handler

app.use(globalErrorHandler);

export default app;

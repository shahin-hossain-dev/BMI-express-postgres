import express, { Application } from 'express';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';

const app: Application = express();

// middleware
app.use(express.json());

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.send('Express Postgres Server is Running');
});

//global error handler

app.use(globalErrorHandler);

app.use(notFoundRoute); //for not found api

export default app;

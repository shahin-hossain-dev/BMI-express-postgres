import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false,
    error: err,
  });
};

export default globalErrorHandler;

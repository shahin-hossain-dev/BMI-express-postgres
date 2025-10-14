import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (func: RequestHandler) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // try {
    //   return await func(req, res, next);
    // } catch (error) {
    //   next(error);
    // }
    Promise.resolve(func(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;

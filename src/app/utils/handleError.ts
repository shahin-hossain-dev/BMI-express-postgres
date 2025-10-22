import { ZodError } from 'zod';
import { Prisma } from '../../generated/prisma';

export class AppError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof ZodError) {
    const msg = error?.issues.map((err) => err.message).join(', ');
    throw new AppError(`Validation Field: ${msg}`, 422);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new AppError(
        `Duplicate Field: ${(error.meta?.target as string[]).join(', ')}`,
        409,
      );
    }
  }

  if (error instanceof Error) {
    throw new AppError(error.message, 500);
  }

  throw new AppError('Unknown Error', 500);
};

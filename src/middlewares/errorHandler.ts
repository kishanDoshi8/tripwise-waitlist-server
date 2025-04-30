import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { formatZodError } from '../utils/formatZodError';

export interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError | ZodError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof ZodError) {
        res.status(400).json({
            message: "Validation error",
            errors: formatZodError(err),
        });
        return;
    }

    res.status(err.status ?? 500).json({
        message: err.message ?? 'Internal Server Error',
    });
};

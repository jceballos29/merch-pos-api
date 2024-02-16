import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { logger } from '../utils';

export const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				const messages = error.issues.map((issue) => issue.message);
				logger.error(`[ValidationError] ${messages.join(', ')}`);

				res.status(400).json({
					success: false,
					message: messages,
					error: 'ValidationError',
				});
			} else {
				next(error);
			}
		}
	};

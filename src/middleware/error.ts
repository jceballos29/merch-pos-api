import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';

export interface IError extends Error {
	status?: number;
}

export const error = (
	err: IError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const status = err.status || 500;
	const message = err.message || 'Something went wrong';
	logger.error(`[Error] ${err}`);
	res.status(status).send({
		success: false,
		message,
		error: 'ServerError',
	});
};

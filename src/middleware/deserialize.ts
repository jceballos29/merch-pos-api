import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils';
import usersService from '../app/services/users.service';

export const deserialize = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token: string = req.headers.authorization?.split(' ')[1] || '';
		const decoded = verifyToken(token);
		if (decoded) {
			const user = await usersService.findOne({ _id: decoded.id });
			if (user) {
				res.locals.user = user;
			}
		}
		next();
	} catch (error) {
		next(error);
	}
};

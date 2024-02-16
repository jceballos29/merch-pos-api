import { user } from './user';
import { Request, Response, NextFunction } from 'express';

export const role =
	(roles: string[]) =>
	(_req: Request, res: Response, next: NextFunction) => {
		const user = res.locals.user;

		if (!roles.includes(user.role)) {
			res.status(403).json({
				success: false,
				message: 'Forbidden',
				error: 'Forbidden',
			});
			return;
		}

		next();
	};

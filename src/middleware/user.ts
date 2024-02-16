import { Request, Response, NextFunction } from 'express';

export const user = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = res.locals.user;
	if (!user) {
		res.status(401).json({
			success: false,
			message: 'Unauthorized',
			error: 'Unauthorized',
		});
		return;
	}
	next();
};

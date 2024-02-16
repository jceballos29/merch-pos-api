import { NextFunction, Request, Response } from 'express';
import { LoginInput } from '../../utils/schemas/auth.schema';
import service from '../services/auth.service';
import { generateToken } from '../../utils';
import env from '../../config/env';

const loginHandler = async (
	req: Request<{}, {}, LoginInput['body']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await service.validatePassword({
			email: req.body.email,
			password: req.body.password,
		});

		if (!user) {
			res.status(401).json({
				success: false,
				message: 'Invalid email or password',
				error: 'Unauthorized',
			});
			return;
		}

		const token = generateToken({ id: user._id });

		res
			.status(200)
			.cookie('token', token, {
				httpOnly: true,
				secure: env.NODE_ENV === 'production',
				sameSite: env.NODE_ENV === 'production' ? 'none' : 'strict',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
			})
			.json({
				success: true,
				message: 'User logged in successfully',
				data: user,
			});
	} catch (error) {
		next(error);
	}
};

const logoutHandler = async (
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	res
		.status(200)
		.clearCookie('token')
		.json({ success: true, message: 'User logged out successfully' });
};

const me = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = res.locals.user;
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		next(error);
	}
};

export default {
	loginHandler,
	logoutHandler,
	me,
};
